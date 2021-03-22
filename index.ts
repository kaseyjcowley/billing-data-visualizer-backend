const { ApolloServer } = require("apollo-server");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }: { url: string }) => {
  console.log(`🚀 Server is ready at ${url} 🚀`);
});
