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
    mutation AddProject($name: String!, $dueDate: String!) {
      addProject(name: $name, dueDate: $dueDate) {
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
    mutation UpdateProject($updateProjectId: ID!, $name: String) {
      updateProject(id: $updateProjectId, name: $name) {
        _id
        name
        description
        status
        dueDate
      }
    }
  `,
};
