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
        mutation addComment($message: String!) {
            addComment(message: $message) {
              _id
              message
            }
          }
        `
        const variables = {
          message: 'CommentTest'
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

})