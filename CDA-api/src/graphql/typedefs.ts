import { gql } from 'apollo-server-express';

const typeDefs = gql`
    type User {
        _id: ID,
        email: String!,
        username: String!,
        password: String!,
        picture: String,
        preferred_language: String
    }
    type UserResponse {
        token: String, 
        email: String
    }
    type Project {
        _id: ID
        name: String!
        description: String
        status: String
        dueDate: String!
        createdAt: String
        updatedAt: String
        tasks: [Task]
    }
    type Task {
        _id: ID
        name: String!
        description: String
        status: String
        dueDate: String!
        createdAt: String
        updatedAt: String
        labels: [Label]
        project: Project
    }
    type Label {
        _id: ID
        name: String
        color: String
    }
    type Comment {
        _id: ID
        message: String
        sentAt: String
        task: Task
    }
    type Notification {
        _id: ID,
        message: String!,
        createdAt: String,
        typeOfNotif: String,
    }
    type Query {
        getComment(id: ID!): Comment,
        getComments: [Comment],
        getLabel(id: ID!): Label,
        getLabels: [Label],
        getNotification(id: ID!): Notification,
        getNotifications: [Notification],
        getProject(id: ID!): Project,
        getProjects: [Project],
        getTask(id: ID!): Task,
        getTasks: [Task],
        getUser(id: ID!): User,
        getUsers: [User],
    }
    type Mutation {
        addComment(message: String!, task: String!): Comment
        addLabel(name: String, color: String): Label
        addNotification(message: String!, createdAt: String, typeOfNotif: String): Notification
        addProject(name: String!, description: String, status: String,dueDate: String!): Project
        addTask(name: String!, description: String, status: String, dueDate: String!, labels: [String], project: String!): Task
        addUser(email: String!, username: String!, password: String!, picture: String, preferred_language: String): UserResponse
        deleteComment(id: ID!): String!
        deleteLabel(id: ID!): String!
        deleteNotification(id: ID!): String!
        deleteProject(id: ID!): String!
        deleteTask(id: ID!): String!
        deleteUser(id: ID!): String!
        updateComment(id: ID!, message: String!): Comment
        updateLabel(id: ID!, name: String, color: String): Label
        updateNotification(id: ID!, message: String!, createdAt: String, typeOfNotif: String): Notification
        updateProject(id: ID!, name: String, description: String, status: String, dueDate: String): Project
        updateTask(id: ID!, name: String, description: String, status: String, dueDate: String, labels: [String], project: String): Task
        updateUser(id: ID!, email: String!, username: String!, password: String!, picture: String, preferred_language: String): User
        login(email: String!, password: String!): String
    }
`
export { typeDefs };
