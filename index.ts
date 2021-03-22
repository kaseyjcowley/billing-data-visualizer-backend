const { ApolloServer } = require("apollo-server");
const fs = require('fs');

const typeDefs = fs.readFileSync('./typeDefs.graphql').toString('utf-8');
const resolvers = require("./resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }: { url: string }) => {
  console.log(`🚀 Server is ready at ${url} 🚀`);
});
