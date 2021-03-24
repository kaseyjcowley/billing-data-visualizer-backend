import fs from "fs";
import * as faker from "faker";

import { Account } from "../types";
import { genAccountsFor } from "./generators";
import { countries } from "./currencyByCountry";

const TOTAL_ACCOUNTS = 500;

const createWeightedArrayOfCountry = (
  country: string,
  percentageOfTotal: number
) =>
  Array.from(
    { length: Math.floor(TOTAL_ACCOUNTS * percentageOfTotal) },
    () => country
  );

const generateAccountCountries = () =>
  [
    // This is somewhat reflective of what our percentage of total revenue is per country. See "Sales by Country" in Looker.
    ...createWeightedArrayOfCountry("US", 0.55),
    ...createWeightedArrayOfCountry("GB", 0.075),
    ...createWeightedArrayOfCountry("AU", 0.05),
    ...createWeightedArrayOfCountry("CA", 0.045),
    ...createWeightedArrayOfCountry("FR", 0.03),
    ...createWeightedArrayOfCountry("DE", 0.03),
    ...Array.from({ length: TOTAL_ACCOUNTS * 0.22 }, () =>
      faker.random.arrayElement(countries)
    ),
  ].reduce(
    (accumulator, country) => ({
      ...accumulator,
      [country]: (accumulator[country] ?? 0) + 1,
    }),
    {} as { [key: string]: number }
  );

const main = async () => {
  const accounts: Account[] = [];
  const accountCountries = generateAccountCountries();

  for (const [country, totalToGenerate] of Object.entries(accountCountries)) {
    const newAccounts = await genAccountsFor(country, totalToGenerate);
    accounts.push(...newAccounts);
    console.log(`generated ${newAccounts.length} accounts for ${country}`);
  }

  fs.writeFileSync(`./data/db.json`, JSON.stringify(accounts));
};

main();
