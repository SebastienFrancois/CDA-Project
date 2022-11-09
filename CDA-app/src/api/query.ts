import { gql } from '@apollo/client';

export const USERS = {
  login: gql`
    mutation Mutation($email: String!, $password: String!) {
      login(email: $email, password: $password)
    }
  `,
  register: gql`
    mutation Mutation($email: String!, $password: String!, $username: String!) {
      addUser(email: $email, password: $password, username: $username) {
        token
        email
      }
    }
  `,
  get: gql`
    query users {
      getUsers {
        _id
        email
        username
        picture
        preferred_language
        role
      }
    }
  `,
};

export const PROJECTS = {
  get: gql`
    query projects {
      getProjects {
        _id
        name
        description
        status
        dueDate
        createdAt
        updatedAt
        projectManager {
          _id
          email
          username
          picture
          preferred_language
        }
        developpers {
          _id
          email
          username
          picture
          preferred_language
        }
      }
    }
  `,
  getOne: gql`
    query GetProject($getProjectId: ID!) {
      getProject(id: $getProjectId) {
        _id
        name
        description
        status
        dueDate
        tasks {
          _id
          name
          description
          dueDate
          createdAt
          updatedAt
          status
          labels {
            _id
            name
            color
          }
          assignTo {
            _id
            username
            email
          }
        }
        createdAt
        updatedAt
        projectManager {
          _id
          email
          username
          picture
          preferred_language
        }
        developpers {
          _id
          email
          username
          picture
          preferred_language
        }
      }
    }
  `,
  add: gql`
    mutation AddProject(
      $name: String!
      $description: String!
      $dueDate: String!
      $projectManager: String
      $developpers: [String]
    ) {
      addProject(
        name: $name
        description: $description
        dueDate: $dueDate
        projectManager: $projectManager
        developpers: $developpers
      ) {
        _id
        name
        description
        status
        dueDate
        projectManager {
          _id
        }
        developpers {
          _id
        }
      }
    }
  `,
  delete: gql`
    mutation DeleteProject($deleteProjectId: ID!) {
      deleteProject(id: $deleteProjectId)
    }
  `,
  update: gql`
    mutation UpdateProject(
      $updateProjectId: ID!
      $name: String
      $description: String
      $status: String
      $dueDate: String
      $projectManager: String
      $developpers: [String]
    ) {
      updateProject(
        id: $updateProjectId
        name: $name
        description: $description
        status: $status
        dueDate: $dueDate
        projectManager: $projectManager
        developpers: $developpers
      ) {
        _id
        name
        description
        status
        dueDate
        projectManager {
          _id
        }
        developpers {
          _id
        }
      }
    }
  `,
};

export const TASKS = {
  get: gql`
    query Query {
      getTasks {
        _id
        name
        description
        status
        dueDate
        labels {
          _id
          name
          color
        }
        assignTo {
          _id
          username
          email
        }
      }
    }
  `,
  getOne: gql`
    query Query($getTaskId: ID!) {
      getTask(id: $getTaskId) {
        _id
        assignTo {
          _id
          username
          email
        }
        createdAt
        description
        dueDate
        labels {
          _id
          name
          color
        }
        name
        status
        updatedAt
      }
    }
  `,
  update: gql`
    mutation Mutation(
      $updateTaskId: ID!
      $status: String
      $name: String
      $description: String
      $dueDate: String
      $labels: [String]
      $assignTo: [String]
    ) {
      updateTask(
        id: $updateTaskId
        status: $status
        name: $name
        description: $description
        dueDate: $dueDate
        labels: $labels
        assignTo: $assignTo
      ) {
        _id
        name
        description
        status
        dueDate
        createdAt
        updatedAt
        labels {
          _id
          name
          color
        }
        assignTo {
          _id
        }
      }
    }
  `,
  add: gql`
    mutation Mutation(
      $status: String
      $name: String
      $description: String
      $dueDate: String
      $labels: [String]
      $assignTo: [String]
    ) {
      addTask(
        status: $status
        name: $name
        description: $description
        dueDate: $dueDate
        labels: $labels
        assignTo: $assignTo
      ) {
        _id
        name
        description
        status
        dueDate
        createdAt
        updatedAt
        labels {
          _id
          name
          color
        }
        assignTo {
          _id
        }
      }
    }
  `,
};

export const LABELS = {
  getOne: gql`
    query Query($getLabelId: ID!) {
      getLabel(id: $getLabelId) {
        _id
        name
        color
      }
    }
  `,
  get: gql`
    query Query {
      getLabels {
        _id
        name
        color
      }
    }
  `,
  add: gql`
    mutation AddLabel($name: String, $color: String) {
      addLabel(name: $name, color: $color) {
        _id
        name
        color
      }
    }
  `,
  delete: gql`
    mutation DeleteLabel($deleteLabelId: ID!) {
      deleteLabel(id: $deleteLabelId)
    }
  `,
  update: gql`
    mutation UpdateLabel($updateLabelId: ID!, $name: String, $color: String) {
      updateLabel(id: $updateLabelId, name: $name, color: $color) {
        _id
        name
        color
      }
    }
  `,
};
