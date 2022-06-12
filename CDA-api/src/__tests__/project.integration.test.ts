import mongoose from 'mongoose';
import { environment } from '../../api-config'
import { ApolloServer } from 'apollo-server-express/dist/ApolloServer';
import { typeDefs } from '../graphql/typedefs';
import resolvers from '../graphql/resolvers/index';

const env = 'test'

describe('Test Connection', () => {
    const testServer = new ApolloServer({ typeDefs, resolvers})
    let id: string | number;
    
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

    it('should connect ... And getProjects[]...', async () => {
        const queryProjects = `
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
        const response = await testServer.executeOperation({query: queryProjects})

        expect(response.data).toEqual({
            "getProjects": []
        })

    })

    it.skip('should create a new project', async () => {
        const addProjectMutation = `
        mutation AddProject($name: String!, $dueDate: String!) {
            addProject(name: $name, dueDate: $dueDate) {
              _id
              name
              description
              status
              dueDate
              createdAt
            }
          }
        `
        const variables = {
          name: 'projectTest',
          dueDate: "1653659092"
        }

        let time

        const request =  () => {
          const res = testServer.executeOperation({query: addProjectMutation, variables})
          time = new Date().getTime().toString();
          return res
        }

        const response = await request()

        if (response.data) {
          console.log(response.data)
            id = response.data.addProject._id
        }

        expect(response.data).toEqual({
          "addProject": {
            "_id": id,
            "name": "projectTest",
            "description": null,
            "status": "not started",
            "dueDate": "1653659092",
            "createdAt": time,
          }})
    })

    it('should return projectTest', async () => {
          const queryProjects = `
          query Query {
              getProjects {
              _id
              name
              description
              status
              dueDate
              }
          }
      `
      const response = await testServer.executeOperation({query: queryProjects})

      expect(response.data).toEqual({
          "getProjects": [
            {
              "_id": id,
              "name": "projectTest",
              "description": null,
              "status": "not started",
              "dueDate": "1653659092",
            }
          ]
      })
    })

})