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
          status
          labels {
            _id
            name
            color
          }
        }
        createdAt
        updatedAt
        team {
          developpers {
            _id
          }
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
