import { Account, BillingInterval } from "./types";
import faker from "faker";

const currencies = ["USD", "GBP", "EUR", "CAD", "AUD", "NZD"];

function getInitialAccounts(count = 1000): Account[] {
  const accounts = [];

  for (let i = 0; i < count; i++) {
    const currency = faker.random.arrayElement(currencies);
    accounts.push({
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
      billingInterval: faker.random.arrayElement(
        Object.values(BillingInterval)
      ),
    });
  }

  return accounts;
}

export default getInitialAccounts;
