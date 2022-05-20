import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "../graphql/typedefs";
import resolvers from "../graphql/resolvers/index";

it('should return one project', async () => {
    const testServer = new ApolloServer({
        typeDefs,
        resolvers,
    });
    const result = await testServer.executeOperation({
        query: 'query GetProject($getProjectId: ID!) { getProject(id: $getProjectId) { _id name }}',
        variables: { "getProjectId": "6284ba5ab61dd793c48603ad" }
    });
    // console.log(result);
  
    expect(result.data).toBe(
        {
            _id: "6284ba5ab61dd793c48603ad",
            name: "An Othe one"
        }
    );
})

describe.skip('Integration PROJECT instance', () => {

})