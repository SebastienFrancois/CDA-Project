import mongoose from 'mongoose';
import { environment } from '../../api-config'
import { ApolloServer } from 'apollo-server-express/dist/ApolloServer';
import { typeDefs } from '../graphql/typedefs';
import resolvers from '../graphql/resolvers/index';

const env = 'test'

describe('Test Connection', () => {
    const testServer = new ApolloServer({ typeDefs, resolvers})
    
    beforeAll(async () => {
        await testServer.start()
        try {
            await mongoose.connect(environment[env].dbString, {
              autoIndex: true,
            })
            console.log('Connected to database')
          } catch (err) {
            console.log(err)
          }
    });
    
    afterAll(async () => {
        await testServer.stop()
    })

    it('Connection ...', async () => {
        const ExampleQuery = `
            query Query {
                getProjects {
                _id
                name
                description
                status
                dueDate
                createdAt
                updatedAt
                }
            }
        `
        const response = await testServer.executeOperation({query: ExampleQuery})

        expect(response.data).toEqual({
            "getProjects": []
        })

    })

})