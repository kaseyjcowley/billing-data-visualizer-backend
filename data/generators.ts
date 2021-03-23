import axios from "axios";
import faker from "faker";
import { Account, BillingInterval } from "../types";
import { currencyByCountry, CurrencyCode } from "./currencyByCountry";

type Response = {
  nearest?: { latt: string; longt: string };
};

type LatLng = {
  latitude: number;
  longitude: number;
};

const fetchLatAndLong = async (country: string): Promise<LatLng> => {
  return await axios
    .get<Response>(`https://api.3geonames.org/?randomland=${country}&json=1`)
    .then(({ data }) => {
      if (!data) {
        console.warn(`Country not recognized by geo API: ${country}`);
      }
      return {
        latitude: Number(data?.nearest?.latt ?? faker.address.latitude()),
        longitude: Number(data?.nearest?.longt ?? faker.address.longitude()),
      };
    });
};

const account = async (): Promise<Account> => {
  const country = faker.random.arrayElement(Object.keys(currencyByCountry));
  const currency = currencyByCountry[country];
  const { latitude, longitude } = await fetchLatAndLong(country);

  return {
    id: faker.random.uuid(),
    address: {
      country,
      latitude,
      longitude,
    },
    currency,
    totalRevenuePerCurrency: [
      {
        currency,
        total: Number(faker.finance.amount(24.99, 100000, 2)),
      },
    ],
    billingInterval: faker.random.arrayElement(Object.values(BillingInterval)),
  };
};

const changedAccount = () => {
  return {
    id: faker.random.uuid(),
    total: faker.finance.amount(24.99, 10000, 2),
    currency: faker.random.arrayElement(Object.values(CurrencyCode)),
  };
};

export { account, changedAccount };
