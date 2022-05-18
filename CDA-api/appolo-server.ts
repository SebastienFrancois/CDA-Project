import { Express } from 'express';
import { ApolloServer } from 'apollo-server-express'
import { typeDefs } from './src/graphql/typedefs'
import resolvers from './src/graphql/resolvers/index';
  
const server = new ApolloServer({ typeDefs, resolvers })

export async function appoloLaunch(app: Express) {
  await server.start()
  server.applyMiddleware({ app, path:'/graphql'})
}
