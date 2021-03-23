import { spawn } from "child_process";
import faker from "faker";
import { Account, BillingInterval } from "../types";
import {
  countryCodeAndNames,
  currencyByCountry,
  CurrencyCode,
} from "./currencyByCountry";

type LatLng = [latitude: number, longitude: number];

const fetchCoordinates = (
  country: string,
  total: number
): Promise<LatLng[]> => {
  return new Promise((resolve) => {
    const fullCountryName = countryCodeAndNames[country];

    console.log(`generating lat/lngs for ${fullCountryName}`);
    const python = spawn("python3", [
      __dirname + "/latLngGenerator.py",
      fullCountryName,
      total.toString(),
    ]);

    let coordinates: LatLng[] = [];

    // @ts-ignore
    python.stdout.on("data", (data: string) => {
      const parsed = JSON.parse(data.toString().trim());
      console.log(`Got ${parsed}`);
      coordinates = parsed;
    });

    // @ts-ignore
    python.stdout.on("close", () => {
      resolve(coordinates);
    });
  });
};

const genAccountsFor = async (
  country: string,
  total: number
): Promise<Account[]> => {
  let accounts: Account[] = [];
  const latsAndLongs = await fetchCoordinates(country, total);

  for (let i = 0; i < total; i++) {
    const currency = currencyByCountry[country];

    accounts.push({
      id: faker.random.uuid(),
      address: {
        country,
        latitude: latsAndLongs[i][0],
        longitude: latsAndLongs[i][1],
      },
      currency,
      totalRevenuePerCurrency: [
        {
          currency,
          total: Number(faker.finance.amount(24.99, 100000, 2)),
        },
      ],
      billingInterval: faker.random.arrayElement(
        Object.values(BillingInterval)
      ),
    });
  }

  return accounts;
};

const changedAccount = () => {
  return {
    id: faker.random.uuid(),
    total: faker.finance.amount(24.99, 10000, 2),
    currency: faker.random.arrayElement(Object.values(CurrencyCode)),
  };
};

export { genAccountsFor, changedAccount };
