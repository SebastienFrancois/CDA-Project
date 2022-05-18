import { gql, ApolloServer } from 'apollo-server-express'
import { Express } from 'express';
import {typeDefs, resolvers } from './src/graphql/params'
  
  const server = new ApolloServer({ typeDefs, resolvers })
  
 export async function startServer(app: Express) {
    await server.start()
    server.applyMiddleware({ app, path:'/graphql'})
  }
