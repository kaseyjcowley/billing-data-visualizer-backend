import { Resolvers } from "./types";
import getInitialAccounts from "./data";
import { pubsub } from "./pubsub";

const resolvers: Resolvers = {
  Query: {
    accounts: () => {
      return getInitialAccounts();
    },
  },
  AccountEvent: {
    __resolveType(obj) {
      if ("totalRevenuePerCurrency" in obj) {
        return "Account";
      }
      return "Change";
    },
  },
  Subscription: {
    accountEvent: {
      subscribe() {
        return pubsub.asyncIterator(["ACCOUNT_EVENT"]);
      },
    },
  },
};

export default resolvers;
