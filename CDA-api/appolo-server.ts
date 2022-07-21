import { Express } from 'express';
import { ApolloServer, AuthenticationError } from 'apollo-server-express'
import { typeDefs } from './src/graphql/typedefs'
import resolvers from './src/graphql/resolvers/index';
import { verifyToken } from './utils/token';

type TContext = {
  user: {id: string, email: string, username:string, preferred_language: string, role: string} | null
}

const server = new ApolloServer({ typeDefs, resolvers, csrfPrevention: true, context: ({ req }) => {
  const ctx : TContext = {user: null};
  const token = req.headers.authorization || '';
  if (token) {
      // fetch data from token if token is valid
      const isValid = verifyToken(token);
      
      if (isValid) {
        const {id, username, email, preferred_language, role} = isValid.data
        // if ok send data to context
        ctx.user = {id, username, email, preferred_language, role};
      }
  } 
  return ctx;
}});

export async function appoloLaunch(app: Express) {
  await server.start()
  server.applyMiddleware({ app, path:'/graphql'})
}
