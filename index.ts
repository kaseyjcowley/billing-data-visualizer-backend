import { ApolloServer } from "apollo-server";
import fs from "fs";

import { startEvents } from "./data/accountEventEmitter";

const typeDefs = fs.readFileSync("./typeDefs.graphql").toString("utf-8");
import resolvers from "./resolvers";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }: { url: string }) => {
  console.log(`🚀 Server is ready at ${url} 🚀`);
  startEvents();
});
