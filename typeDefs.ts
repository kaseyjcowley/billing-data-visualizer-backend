const { gql } = require("apollo-server");

module.exports = gql`
  type Account {
    id: ID!
  }

  type Query {
    accounts: [Account!]
  }
`;
