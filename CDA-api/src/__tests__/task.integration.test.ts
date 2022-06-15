import mongoose from 'mongoose';
import { environment } from '../../api-config'
import { ApolloServer } from 'apollo-server-express/dist/ApolloServer';
import { typeDefs } from '../graphql/typedefs';
import resolvers from '../graphql/resolvers/index';

const env = 'test'

describe('TASKS', () => {
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
    })

    afterAll(async () => {
        await testServer.stop()
    })

    //first create a project and a label
    let projectId = ""
    let labelId = ""

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
            projectId = response.data.addProject._id
        }

        expect(response.data).toEqual({
          "addProject": {
            "_id": projectId,
            "name": "projectTest",
            "description": null,
            "status": "not started",
            "dueDate": "1653659092",
          }})
    })

    it('should create a new label', async () => {
        const addLabelMutation = `
        mutation addLabel($name: String!, $color: String!) {
            addLabel(name: $name, color: $color) {
              _id
              name
              color
            }
          }
        `
        const variables = {
          name: 'labelTest',
          color: "#ff0011"
        }

        const response = await testServer.executeOperation({query: addLabelMutation, variables})

        if (response.data) {
            labelId = response.data.addLabel._id
        }

        expect(response.data).toEqual({
          "addLabel": {
            "_id": labelId,
            "name": "labelTest",
            "color": "#ff0011"
          }})
    })

    //test task


    it('should connect ... And getTasks[]...', async () => {
        const queryTasks = `
            query Query {
                getTasks {
                    _id
                    name
                    description
                    status
                    dueDate
                    labels {
                      _id
                      name
                      color
                    }
                    project {
                      _id
                      name
                      description
                      status
                      dueDate
                    }
                  }
            }
        `
        const response = await testServer.executeOperation({query: queryTasks})

        expect(response.data).toEqual({
            "getTasks": []
        })
    })
    
    it('should create a new task', async () => {
        const addTaskMutation = `
        mutation AddTask($name: String!, $dueDate: String!, $project: String!, $status: String, $labels: [String]) {
            addTask(name: $name, dueDate: $dueDate, project: $project, status: $status, labels: $labels) {
                _id
                name
                description
                status
                dueDate
                labels {
                  _id
                  name
                  color
                }
                project {
                  _id
                  name
                  description
                  status
                  dueDate
                }
            }
          }
        `
        const variables = {
          name: 'TaskTest',
          dueDate: "1653659092",
          project: projectId,
          status: "not started",
          labels: [labelId]
        }

        const response = await testServer.executeOperation({query: addTaskMutation, variables})

        if (response.data) {
            id = response.data.addTask._id
        }

        expect(response.data).toEqual({
          "addTask": {
            "_id": id,
            "name": "TaskTest",
            "description": null,
            "status": "not started",
            "dueDate": "1653659092",
            "labels": [{
                "_id": labelId,
                "name": "labelTest",
                "color": "#ff0011"
              }],
            "project": {
                "_id": projectId,
                "name": "projectTest",
                "description": null,
                "status": "not started",
                "dueDate": "1653659092",
              }
          }})
    })


    it('should return TaskTest', async () => {
          const queryTasks = `
          query Query {
            getTasks {
                _id
                name
                description
                status
                dueDate
                labels {
                  _id
                  name
                  color
                }
                project {
                  _id
                  name
                  description
                  status
                  dueDate
                }
              }
          }
      `
      const response = await testServer.executeOperation({query: queryTasks})

      expect(response.data).toEqual({
          "getTasks": [
            {
                "_id": id,
                "name": "TaskTest",
                "description": null,
                "status": "not started",
                "dueDate": "1653659092",
                "labels": [{
                    "_id": labelId,
                    "name": "labelTest",
                    "color": "#ff0011"
                    }],
                "project": {
                    "_id": projectId,
                    "name": "projectTest",
                    "description": null,
                    "status": "not started",
                    "dueDate": "1653659092",
                    }
            }
          ]
      })
    })

    it('should update taskTest', async () => {
        const updateTaskMutation = `
        mutation UpdateTask($updateTaskId: ID!, $name: String) {
          updateTask(id: $updateTaskId, name: $name) {
            _id
            name
            description
            status
            dueDate
          }
        }
        `
        const variables = { "updateTaskId": id, "name": "taskTestUpdated" }

        const response = await testServer.executeOperation({query: updateTaskMutation, variables})

        expect(response.data).toEqual({
          "updateTask": {
            "_id": id,
            "name": "taskTestUpdated",
            "description": null,
            "status": "not started",
            "dueDate": "1653659092"          
          }
        })

    })

    it("should delete taskTest", async () => {
        const deleteTaskMutation = `
        mutation DeleteTask($deleteTaskId: ID!) {
          deleteTask(id: $deleteTaskId)
        }`
        const variables = { "deleteTaskId": id }

        const response = await testServer.executeOperation({query: deleteTaskMutation, variables})

        expect(response.data).toEqual({
          "deleteTask": JSON.stringify({message:`Instance "${id}" has been deleted successfully !`})
        })
    })
    
    it("should delete labelTest", async () => {
        const deleteLabelMutation = `
        mutation DeleteLabel($deleteLabelId: ID!) {
          deleteLabel(id: $deleteLabelId)
        }`
        const variables = { "deleteLabelId": labelId }

        const response = await testServer.executeOperation({query: deleteLabelMutation, variables})

        expect(response.data).toEqual({
          "deleteLabel": JSON.stringify({message:`Instance "${labelId}" has been deleted successfully !`})
        })
    })
    
    it("should delete projectTest", async () => {
        const deleteProjectMutation = `
        mutation DeleteProject($deleteProjectId: ID!) {
          deleteProject(id: $deleteProjectId)
        }`
        const variables = { "deleteProjectId": projectId }

        const response = await testServer.executeOperation({query: deleteProjectMutation, variables})

        expect(response.data).toEqual({
          "deleteProject": JSON.stringify({message:`Instance "${projectId}" has been deleted successfully !`})
        })
    })

})