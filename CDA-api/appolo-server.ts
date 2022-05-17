import { gql, ApolloServer } from 'apollo-server-express'
import { Express } from 'express';

const books = [
    {
      title: 'The Awakening',
      author: 'Kate Chopin',
    },
    {
      title: 'City of Glass',
      author: 'Paul Auster',
    },
  ];
  
  const typeDefs = gql`
    type Book {
        title: String
        author: String
      }
  
    type Query {
      books: [Book]
    }
  `
  
  const resolvers = {
    Query: {
      books: () => books,
    },
  }
  
  const server = new ApolloServer({ typeDefs, resolvers })
  
 export async function startServer(app: Express) {
    await server.start()
    server.applyMiddleware({ app, path:'/graphql'})
  }
