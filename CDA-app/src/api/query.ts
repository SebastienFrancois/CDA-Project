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
        }
        createdAt
        updatedAt
        projectManager {
          _id
          email
          username
          password
          picture
          preferred_language
        }
        developpers {
          _id
          email
          username
          password
          picture
          preferred_language
        }
      }
    }
  `,
  add: gql`
    mutation AddProject($name: String!, $description: String!, $dueDate: String!) {
      addProject(name: $name, description: $description, dueDate: $dueDate) {
        _id
        name
        description
        status
        dueDate
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
    ) {
      updateProject(
        id: $updateProjectId
        name: $name
        description: $description
        status: $status
        dueDate: $dueDate
      ) {
        _id
        name
        description
        status
        dueDate
      }
    }
  `,
};

export const TASKS = {
  update: gql`
    mutation Mutation(
      $updateTaskId: ID!
      $status: String
      $name: String
      $description: String
      $dueDate: String
      $labels: [String]
    ) {
      updateTask(
        id: $updateTaskId
        status: $status
        name: $name
        description: $description
        dueDate: $dueDate
        labels: $labels
      ) {
        _id
        name
        status
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
