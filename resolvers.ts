import fs from "fs";
import { Resolvers } from "./types";
import { pubsub } from "./pubsub";

const resolvers: Resolvers = {
  Query: {
    accounts: () => {
      return JSON.parse(
        fs.readFileSync(__dirname + "/data/db.json").toString("utf-8")
      );
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
