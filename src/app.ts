import app from "./index";
import { ApolloServer, gql } from "apollo-server-express";
import { env } from "process";

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello xD",
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });

app.listen({ port: env.PORT || 4000 }, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${app.options("port")}`);
});
