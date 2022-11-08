import { gql } from 'apollo-server-express';

const typeDefs = gql`
   type User {
        _id: ID,
        email: String!,
        username: String!,
        picture: String,
        preferred_language: String,
        role: String,
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
        assignTo: [User]
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
        sentBy: User
        task: Task
    }
    type Notification {
        _id: ID,
        message: String!,
        createdAt: String,
        typeOfNotif: String,
    }
    type RetrievePasswordResponse{
        success : Boolean!,
    }
    type Query {
        getUsers: [User],
        getTasks(project_id: ID!): [Task],
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
        addComment(message: String!, task: String!, sentBy: String!): Comment,
        addLabel(name: String, color: String): Label,
        addNotification(message: String!, createdAt: String, typeOfNotif: String): Notification,
        addProject(name: String!, description: String, status: String,dueDate: String!, projectManager: String, developpers: [String] ): Project,
        addTask(name: String!, description: String, status: String, dueDate: String!, labels: [String], project: String!, assignTo: [String]): Task,
        addUser(email: String!, username: String!, password: String!, picture: String, preferred_language: String, role: String!): UserResponse,
        deleteComment(id: ID!): String!,
        deleteLabel(id: ID!): String!,
        deleteNotification(id: ID!): String!,
        deleteProject(id: ID!): String!,
        deleteTask(id: ID!): String!,
        deleteUser(id: ID!): String!,
        login(email: String!, password: String!): String,
        retrievePassword(email: String!): RetrievePasswordResponse,
        updateComment(id: ID!, message: String!): Comment,
        updateLabel(id: ID!, name: String, color: String): Label,
        updateNotification(id: ID!, message: String!, createdAt: String, typeOfNotif: String): Notification,
        updateProject(id: ID!, name: String, description: String, status: String, dueDate: String,  projectManager: String, developpers: [String]): Project,
        updateTask(id: ID!, name: String, description: String, status: String, dueDate: String, labels: [String], project: String, assignTo:[String]): Task,
        updateUserInfosAsAdmin(id: ID!, email: String, username: String, password: String, picture: String, preferred_language: String, role: String) : User,
        updateUserInfosAsUser(id: ID!, email: String, username: String, password: String, picture: String, preferred_language: String) : User,
    }
`
export { typeDefs };
