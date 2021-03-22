import { Resolvers } from "./types";
import getInitialAccounts from "./data";

const resolvers: Resolvers = {
  Query: {
    accounts: () => {
      return getInitialAccounts();
    },
  },
};

module.exports = resolvers;
