import { Account } from "./types";
import { account } from "./dataGenerators";

function getInitialAccounts(count = 1000): Account[] {
  return Array.from({ length: count }).map(account);
}

export default getInitialAccounts;
