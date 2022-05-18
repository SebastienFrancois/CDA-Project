import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "../graphql/typedefs";

it.skip('should return a list of projects', async  () => {
    const testServer = new ApolloServer({
        typeDefs,
        resolvers
      });
    const result = await testServer.executeOperation({
        query: "query  getProject(id: $getProjectId) {_id name description status dueDate createdAt updatedAt }}",
        variables: {getProjectId: "6284b401b35b2fe64838c09e"}
    })
    expect(result.data).toBeDefined();

})
describe.skip('Integration PROJECT instance', () => {

})