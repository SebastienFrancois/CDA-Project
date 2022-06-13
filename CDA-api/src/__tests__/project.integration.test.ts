import mongoose from 'mongoose';
import { environment } from '../../api-config'
import { ApolloServer } from 'apollo-server-express/dist/ApolloServer';
import { typeDefs } from '../graphql/typedefs';
import resolvers from '../graphql/resolvers/index';

const env = 'test'

describe('PROJECTS', () => {
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

    it('should create a new project', async () => {
        const addProjectMutation = `
        mutation AddProject($name: String!, $dueDate: String!) {
            addProject(name: $name, dueDate: $dueDate) {
              _id
              name
              description
              status
              dueDate
            }
          }
        `
        const variables = {
          name: 'projectTest',
          dueDate: "1653659092"
        }

        const response = await testServer.executeOperation({query: addProjectMutation, variables})

        if (response.data) {
            id = response.data.addProject._id
        }

        expect(response.data).toEqual({
          "addProject": {
            "_id": id,
            "name": "projectTest",
            "description": null,
            "status": "not started",
            "dueDate": "1653659092",
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

    it('should update projectTest', async () => {
        const updateProjectMutation = `
        mutation UpdateProject($updateProjectId: ID!, $name: String) {
          updateProject(id: $updateProjectId, name: $name) {
            _id
            name
            description
            status
            dueDate
          }
        }
        `
        const variables = { "updateProjectId": id, "name": "projectTestUpdated" }

        const response = await testServer.executeOperation({query: updateProjectMutation, variables})

        expect(response.data).toEqual({
          "updateProject": {
            "_id": id,
            "name": "projectTestUpdated",
            "description": null,
            "status": "not started",
            "dueDate": "1653659092"          
          }
        })

    })

    it("should delete projectTest", async () => {
        const deleteProjectMutation = `
        mutation DeleteProject($deleteProjectId: ID!) {
          deleteProject(id: $deleteProjectId)
        }`
        const variables = { "deleteProjectId": id }

        const response = await testServer.executeOperation({query: deleteProjectMutation, variables})

        expect(response.data).toEqual({
          "deleteProject": JSON.stringify({message:`Instance "${id}" has been deleted successfully !`})
        })
    })

})