import { gql } from 'apollo-server-express';
import { ProjectModel } from '../schemas/project.schemas';
import { Project as project} from '../schemas/project.schemas';

const typeDefs = gql`
    type Project {
        _id: ID
        name: String!
        description: String
        status: String,
        dueDate: String!
        createdAt: String
        updatedAt: String
    }
    type Query {
        getProjects: [Project]
    }
    type Mutation {
        addProject: Project
        deleteProject: Project
        updateProject: Project
    }
`
const resolvers = {
    Query: {
        getProjects: async () => await ProjectModel.find({}),
    }
}

export {typeDefs, resolvers };