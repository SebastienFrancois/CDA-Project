import { Express } from 'express';
import { ApolloServer } from 'apollo-server-express'
import {typeDefs, resolvers } from './src/graphql/params'
  
  const server = new ApolloServer({ typeDefs, resolvers })
  
 export async function appoloLaunch(app: Express) {
    await server.start()
    server.applyMiddleware({ app, path:'/graphql'})
  }
