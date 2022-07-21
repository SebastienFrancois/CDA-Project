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
        team: Team
    }
    type Team {
        projectManager: User
        developpers: [User]
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
        getUsers: [User],
        getTasks: [Task],
        getLabels: [Label],
        getUser(id: ID): User,
        getProjects: [Project],
        getTask(id: ID!): Task,
        getComments: [Comment],
        getLabel(id: ID!): Label,
        getProject(id: ID!): Project,
        getComment(id: ID!): Comment,
        getNotifications: [Notification],
        getNotification(id: ID!): Notification,
    }
    type Mutation {
        addUser(email: String!, username: String!, password: String!, picture: String, preferred_language: String): UserResponse,
        addProject(name: String!, description: String, status: String,dueDate: String!): Project,
        deleteProject(id: ID!): String!,
        updateProject(id: ID!, name: String, description: String, status: String, dueDate: String): Project,
        addLabel(name: String, color: String): Label,
        deleteLabel(id: ID!): String!,
        updateLabel(id: ID!, name: String, color: String): Label,
        addTask(name: String!, description: String, status: String, dueDate: String!, labels: [String], project: String!): Task,
        deleteTask(id: ID!): String!,
        updateTask(id: ID!, name: String, description: String, status: String, dueDate: String, labels: [String], project: String): Task,
        addComment(message: String!, task: String!): Comment,
        deleteComment(id: ID!): String!,
        updateComment(id: ID!, message: String!): Comment,
        addNotification(message: String!, createdAt: String, typeOfNotif: String): Notification,
        deleteNotification(id: ID!): String!,
        updateNotification(id: ID!, message: String!, createdAt: String, typeOfNotif: String): Notification,
        login(email: String!, password: String!): String,
    }
`
export { typeDefs };
