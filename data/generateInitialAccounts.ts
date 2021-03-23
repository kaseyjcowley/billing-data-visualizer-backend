import fs from "fs";
import { Account } from "../types";
import { account } from "./generators";

const TOTAL_ACCOUNTS = 500;

const main = async () => {
  const accounts: Account[] = [];

  for (let i = 0; i < TOTAL_ACCOUNTS; i++) {
    accounts.push(await account());
    console.log(`generated ${i + 1} accounts`);
  }

  fs.writeFileSync(`./data/db.json`, JSON.stringify(accounts));
};

main();
