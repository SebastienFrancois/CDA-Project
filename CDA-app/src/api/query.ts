import { gql } from '@apollo/client';

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
