import mongoose from 'mongoose';
import { environment } from '../../api-config'
import { ApolloServer } from 'apollo-server-express/dist/ApolloServer';
import { typeDefs } from '../graphql/typedefs';
import resolvers from '../graphql/resolvers/index';

const env = 'test'

describe('USER', () => {
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

    it('should connect ... And getUsers[]...', async () => {
        const queryUsers = `
            query Query {
                getUsers {
                  _id
                  email
                  username
                  password
                  picture
                  preferred_language
            }
        `
        const response = await testServer.executeOperation({query: queryUsers})

        expect(response.data).toEqual({
            "getUsers": []
        })

    })

    it('should create a new user', async () => {
        const addUserMutation = `
        mutation AddUser(email: String!, username: String!, password: String!, picture: String, preferred_language: String) {
            addUser(email: String!, username: String!, password: String!, picture: String, preferred_language: String) {
              _id
              email
              username
              password
              picture
              preferred_language
            }
          }
        `
        const variables = {
          email: 'userTest@avengers.com',
          username: 'CeciEst monNom',
          password: 'montDePasse',
          preferred_language: "francais",
        }

        const response = await testServer.executeOperation({query: addUserMutation, variables})

        if (response.data) {
            id = response.data.addUser._id
        }

        expect(response.data).toEqual({
          "addUser": {
            "_id": id,
            "email": "userTest@avengers.com",
            "username": "CeciEst monNom",
            "password": "montDePasse",
            "preferred_language": "francais",
          }})
    })

    it('should return userTest', async () => {
          const queryUser = `
          query Query {
              getUsers {
              _id
              email
              username
              password
              picture
              preferred_language
              }
          }
      `
      const response = await testServer.executeOperation({query: queryUser})

      expect(response.data).toEqual({
          "getUser": [
            {
              "_id": id,
              "email": "userTest@avengers.com",
              "username": "CeciEst monNom",
              "password": "montDePasse",
              "preferred_language": "francais",
            }
          ]
      })
    })

    // it('should update userTest', async () => {
        //const updateUserMutation = `
        //mutation UpdateUser($updateUserId: ID!, $name: String, $description: String, $dueDate: String) {
          //updateUser(id: $updateUserId, name: $name, description: $description, dueDate: $dueDate) {
            //_id
            //email
            //username
            //preferred_language
          //}
        //}
        //`
        //const variables = { "updateUserId": id, "email": "emailTest@test.fr","username": "SecondName", "preferred_language": "englsih" }

        //const response = await testServer.executeOperation({query: updateUserMutation, variables})

        //expect(response.data).toEqual({
          //"updateProject": {
            //"_id": id,
            //"email": "emailTest@test.fr",
            //"username": "SecondName",
            //"preferred_language": "englsih",         
          //}
        //})

    //})

    // it("should delete userTest", async () => {
        // const deleteUserMutation = `
        //mutation DeleteUser($deleteUserId: ID!) {
          //deleteUser(id: $deleteUserId)
        //}`
        //const variables = { "deleteUserId": id }

        //const response = await testServer.executeOperation({query: deleteUserMutation, variables})

        //expect(response.data).toEqual({
          //"deleteUser": JSON.stringify({message:`Instance "${id}" has been deleted successfully !`})
        //})
    //})

})