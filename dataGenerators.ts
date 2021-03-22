import faker from "faker";
import { BillingInterval } from "./types";

const currencies = ["USD", "GBP", "EUR", "CAD", "AUD", "NZD"];

const account = () => {
  const currency = faker.random.arrayElement(currencies);

  return {
    id: faker.random.uuid(),
    address: {
      country: faker.address.countryCode(),
      latitude: Number(faker.address.latitude()),
      longitude: Number(faker.address.longitude()),
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
    currency: faker.random.arrayElement(currencies),
  };
};

export { account, changedAccount };
