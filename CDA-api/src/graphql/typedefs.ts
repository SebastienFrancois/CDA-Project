import { gql } from 'apollo-server-express';

const typeDefs = gql`
    type Project {
        _id: ID
        name: String!
        description: String
        status: String
        dueDate: String!
        createdAt: String
        updatedAt: String
        
    }
    type Label {
        _id: ID
        name: String
        color: String
    }
    type Task {
        _id: ID
        name: String!
        description: String
        status: String
        dueDate: String!
        createdAt: String
        updatedAt: String
        Labels: [Label]
    }
    type Comment {
        _id: ID
        message: String
        sentAt: String
    }
    type Notification {
        _id: ID,
        message: String!,
        createdAt: String,
        typeOfNotif: String,
    }
    type Query {
        getProjects: [Project],
        getProject(id: ID!): Project,
        getLabels: [Label],
        getLabel(id: ID!): Label,
        getTasks: [Task],
        getTask(id: ID!): Task,
        getComments: [Comment],
        getComment(id: ID!): Comment,
        getNotifications: [Notification],
        getNotification(id: ID!): Notification,
    }
    type Mutation {
        addProject(name: String!, description: String, status: String,dueDate: String!): Project
        deleteProject(id: ID!): String!
        updateProject(id: ID!, name: String, description: String, status: String, dueDate: String): Project
        addLabel(name: String, color: String): Label
        deleteLabel(id: ID!): String!
        updateLabel(id: ID!, name: String, color: String): Label
        addTask(name: String!, description: String, status: String,dueDate: String!, labels: [String]): Task
        deleteTask(id: ID!): String!
        updateTask(id: ID!, name: String, description: String, status: String, dueDate: String): Task
        addComment(message: String!): Comment
        deleteComment(id: ID!): String!
        updateComment(id: ID!, message: String!): Comment
        addNotification(message: String!, createdAt: String, typeOfNotif: String): Notification
        deleteNotification(id: ID!): String!
        updateNotification(id: ID!, message: String!, createdAt: String, typeOfNotif: String): Notification
    }
`
export { typeDefs };
