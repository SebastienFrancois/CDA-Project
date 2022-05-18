import { gql } from 'apollo-server-express';
import { IProject, ProjectModel } from '../schemas/project.schemas';

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
        addProject(name: String!, description: String, status: String,dueDate: String!): Project
        deleteProject(id: ID!): Boolean!
        updateProject(id: ID!, name: String!, description: String, status: String,dueDate: String!): Project!
    }
`
const resolvers = {
    Query: {
        getProjects: async () => await ProjectModel.find({}),
    },
    Mutation: {
        addProject: async ( _ :ParentNode, args: IProject ) => {
            const newProject = await ProjectModel.create({
            name: args.name,
            description: args.description,
            status: args.status,
            dueDate: args.dueDate
        })
        newProject.save()
        return newProject
    }
    }
}


export {typeDefs, resolvers };
