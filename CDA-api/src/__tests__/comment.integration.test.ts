import mongoose from 'mongoose';
import { environment } from '../../api-config'
import { ApolloServer } from 'apollo-server-express/dist/ApolloServer';
import { typeDefs } from '../graphql/typedefs';
import resolvers from '../graphql/resolvers/index';

const env = 'test'

describe('COMMENTS', () => {
    const testServer = new ApolloServer({ typeDefs, resolvers})
    let id: string | number;//mongoose.ObjectId ??
    
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


      //first create a project and a label
    let projectId = ""
    let labelId = ""
    let taskId= ""

    it('should create a new project', async () => {
      const addProjectMutation = `
      mutation AddProject($name: String!, $description: String!, $dueDate: String!) {
          addProject(name: $name, description: $description, dueDate: $dueDate) {
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
        dueDate: "1653659092",
        description: "This is a test project",
      }

        const response = await testServer.executeOperation({query: addProjectMutation, variables})
        if (response.data) {
            projectId = response.data.addProject._id
        }

        expect(response.data).toEqual({
          "addProject": {
            "_id": projectId,
            "name": "projectTest",
            "description": "This is a test project",
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

    it('should create a new task', async () => {
      const addTaskMutation = `
      mutation AddTask($name: String!, $dueDate: String!, $project: String!, $description: String, $status: String, $labels: [String]) {
        addTask(name: $name, dueDate: $dueDate, project: $project, description: $description, status: $status, labels: $labels) {
          _id
          name
          description
          status
          dueDate
          labels {
            name
            color
          }
        }
      }`
      const variables = {
        name: 'TaskTest',
        dueDate: "1653659092",
        project: projectId,
        description: 'Task Test Description',
        status: "not started",
        labels: [labelId]
      }

      const response = await testServer.executeOperation({query: addTaskMutation, variables})

      if (response.data) {
          taskId = response.data.addTask._id
      }

      expect(response.data).toEqual({
        "addTask": {
          "_id": taskId,
          "name": "TaskTest",
          "description": 'Task Test Description',
          "status": "not started",
          "dueDate": "1653659092",
          "labels": [{
              "name": "labelTest",
              "color": "#ff0011"
            }],
        }})
  })


    it('should connect ... And getComments[]...', async () => {
        const queryComments = `
            query Query {
                getComments {
                _id
                message
                }
            }
        `
        const response = await testServer.executeOperation({query: queryComments})

        expect(response.data).toEqual({
            "getComments": []
        })

    })

    it('should create a new Comment', async () => {
        const addCommentMutation = `
        mutation addComment($message: String!, $task: String!) {
            addComment(message: $message, task: $task) {
              _id
              message
            }
          }
        `
        const variables = { 
          message: 'CommentTest',
          task: taskId
        }

        const response = await testServer.executeOperation({query: addCommentMutation, variables})
        
        if (response.data) {
            id = response.data.addComment._id
        }

        expect(response.data).toEqual({
          "addComment": {
            "_id": id,
            "message": "CommentTest",
          }})
    })

    it('should return CommentTest', async () => {
          const queryComments = `
          query Query {
              getComments {
              _id
              message
              }
          }
      `
      const response = await testServer.executeOperation({query: queryComments})

      expect(response.data).toEqual({
          "getComments": [
            {
                "_id": id,
                "message": "CommentTest",
            }
          ]
      })
    })

    it('should update CommentTest', async () => {
        const updateCommentMutation = `
        mutation UpdateComment($updateCommentId: ID!, $message: String!) {
            updateComment(id: $updateCommentId, message: $message) {
            _id
            message
          }
        }
        `
        const variables = { "updateCommentId": id, "message": "CommentTestUpdated" }

        const response = await testServer.executeOperation({query: updateCommentMutation, variables})
        
        expect(response.data).toEqual({
          "updateComment": {
            "_id": id,
            "message": "CommentTestUpdated",         
          }
        })

    })

    it("should delete CommentTest", async () => {
        const deleteCommentMutation = `
        mutation DeleteComment($deleteCommentId: ID!) {
          deleteComment(id: $deleteCommentId)
        }`
        const variables = { "deleteCommentId": id }

        const response = await testServer.executeOperation({query: deleteCommentMutation, variables})

        expect(response.data).toEqual({
          "deleteComment": JSON.stringify({message:`Instance "${id}" has been deleted successfully !`})
        })
    })
    it("should delete taskTest", async () => {
      const deleteTaskMutation = `
      mutation DeleteTask($deleteTaskId: ID!) {
        deleteTask(id: $deleteTaskId)
      }`
      const variables = { "deleteTaskId": taskId }

      const response = await testServer.executeOperation({query: deleteTaskMutation, variables})
      expect(response.data).toEqual({
        "deleteTask": JSON.stringify({message:`Instance "${taskId}" has been deleted successfully !`})
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