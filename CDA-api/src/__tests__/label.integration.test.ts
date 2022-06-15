import mongoose from 'mongoose';
import { environment } from '../../api-config'
import { ApolloServer } from 'apollo-server-express/dist/ApolloServer';
import { typeDefs } from '../graphql/typedefs';
import resolvers from '../graphql/resolvers/index';

const env = 'test'

describe('LABELS', () => {
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

    it('should connect ... And getLabels[]...', async () => {
        const queryLabels = `
            query Query {
                getLabels {
                _id
                name
                color
                }
            }
        `
        const response = await testServer.executeOperation({query: queryLabels})

        expect(response.data).toEqual({
            "getLabels": []
        })

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
            id = response.data.addLabel._id
        }

        expect(response.data).toEqual({
          "addLabel": {
            "_id": id,
            "name": "labelTest",
            "color": "#ff0011"
          }})
    })

    it('should return labelTest', async () => {
          const queryLabels = `
          query Query {
              getLabels {
              _id
              name
              color
              }
          }
      `
      const response = await testServer.executeOperation({query: queryLabels})

      expect(response.data).toEqual({
          "getLabels": [
            {
                "_id": id,
                "name": "labelTest",
                "color": "#ff0011"
            }
          ]
      })
    })

    it('should update labelTest', async () => {
        const updateLabelMutation = `
        mutation UpdateLabels($updateLabelId: ID!, $name: String) {
          updateLabel(id: $updateLabelId, name: $name) {
            _id
            name
            color
          }
        }
        `
        const variables = { "updateLabelId": id, "name": "labelTestUpdated" }

        const response = await testServer.executeOperation({query: updateLabelMutation, variables})

        expect(response.data).toEqual({
          "updateLabel": {
            "_id": id,
            "name": "labelTestUpdated",
            "color": "#ff0011"         
          }
        })

    })

    it("should delete labelTest", async () => {
        const deleteLabelMutation = `
        mutation DeleteLabel($deleteLabelId: ID!) {
          deleteLabel(id: $deleteLabelId)
        }`
        const variables = { "deleteLabelId": id }

        const response = await testServer.executeOperation({query: deleteLabelMutation, variables})

        expect(response.data).toEqual({
          "deleteLabel": JSON.stringify({message:`Instance "${id}" has been deleted successfully !`})
        })
    })

})