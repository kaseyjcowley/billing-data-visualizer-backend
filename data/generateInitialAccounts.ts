import fs from "fs";
import * as faker from "faker";

import { Account } from "../types";
import { genAccountsFor } from "./generators";
import { countries } from "./currencyByCountry";

const TOTAL_ACCOUNTS = 500;

const main = async () => {
  const accounts: Account[] = [];
  const accountCountries = Array.from({ length: TOTAL_ACCOUNTS }, () =>
    faker.random.arrayElement(countries)
  ).reduce(
    (accumulator, country) => ({
      ...accumulator,
      [country]: (accumulator[country] ?? 0) + 1,
    }),
    {} as { [key: string]: number }
  );

  for (const [country, totalToGenerate] of Object.entries(accountCountries)) {
    const newAccounts = await genAccountsFor(country, totalToGenerate);
    accounts.push(...newAccounts);
    console.log(`generated ${newAccounts.length} accounts for ${country}`);
  }

  fs.writeFileSync(`./data/db.json`, JSON.stringify(accounts));
};

main();
