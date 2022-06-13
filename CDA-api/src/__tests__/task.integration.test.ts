import mongoose from 'mongoose';
import { environment } from '../../api-config'
import { ApolloServer } from 'apollo-server-express/dist/ApolloServer';
import { typeDefs } from '../graphql/typedefs';
import resolvers from '../graphql/resolvers/index';

const env = 'test'

describe.skip('TASKS', () => {
    const testServer = new ApolloServer({ typeDefs, resolvers})
    let id: string | number;

    beforeAll(async () => {
        await testServer.start()
        try {
            await mongoose.connect(environment[env].dbString, {
                autoIndex: true,
            })
            console.log('Connected to database')                    
        } catch (error) {
            console.log(error)
        }

        // const addProjectMutation = `
        //     mutation AddProject($name: String!, $dueDate: String!) {
        //         addProject(name: $name, dueDate: $dueDate) {
        //         _id
        //         name
        //         description
        //         status
        //         dueDate
        //         }
        //     }
        // `
        // const variables = {
        //     name: 'projectTest',
        //     dueDate: "1653659092"
        //   }
        // const response = await testServer.executeOperation({query: addProjectMutation, variables})
        
        // if (response.data) {
        //     id = response.data.addProject._id
        // }
    })

    afterAll(async () => {
        // const deleteProjectMutation = `
        // mutation DeleteProject($deleteProjectId: ID!) {
        //   deleteProject(id: $deleteProjectId)
        // }`
        // const variables = { "deleteProjectId": id }

        // await testServer.executeOperation({query: deleteProjectMutation, variables})

        await testServer.stop()
    })

    it('should connect ... And getTasks[]...', async () => {
        const queryTasks = `
            query Query { 
                getTasks: {
                    _id
                    name
                    status
                    dueDate
                    project
                }
            }
        `

        const response = await testServer.executeOperation({query: queryTasks})

        expect(response.data).toEqual({
            "getTasks": []
        })
    })             

})