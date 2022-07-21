import { Express } from 'express';
import { ApolloServer, AuthenticationError } from 'apollo-server-express'
import { typeDefs } from './src/graphql/typedefs'
import resolvers from './src/graphql/resolvers/index';
import { verifyToken } from './utils/token';
import { retrieveUser } from './utils/userInfos';
import { string } from 'joi';
import user from './src/graphql/resolvers/user';

type TContext = {
  user: {id: string, email: string, username:string, preferred_language: string} | null
}

const server = new ApolloServer({ typeDefs, resolvers, csrfPrevention: true,context: ({ req }) => {
  const ctx : TContext = {user: null};
  const token = req.headers.authorization || '';
  if (token) {
      const isValid = verifyToken(token);
      // verify if user exist
      if(isValid){
        const {id, username, email, preferred_language} = isValid.data
        ctx.user = {id, username, email, preferred_language};
      }
  } 
  return ctx;
}});

export async function appoloLaunch(app: Express) {
  await server.start()
  server.applyMiddleware({ app, path:'/graphql'})
}
