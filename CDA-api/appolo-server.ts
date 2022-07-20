import { Express } from 'express';
import { ApolloServer, AuthenticationError } from 'apollo-server-express'
import { typeDefs } from './src/graphql/typedefs'
import resolvers from './src/graphql/resolvers/index';
import { verifyToken } from './utils/token';

type Context = {
  user?: String
}
  
const server = new ApolloServer({
  typeDefs, 
  resolvers,
  context: ({req}) => {
    let ctx: Context = {};
    const token = req.headers.authorization || '';
    if (token) {
      const isValid = verifyToken(token);
      if (!isValid) return new AuthenticationError("Token invalid");
      ctx.user = isValid.data.email;
    }
    return ctx;
  }
})

export async function appoloLaunch(app: Express) {
  await server.start()
  server.applyMiddleware({ app, path:'/graphql'})
}
