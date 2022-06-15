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
};
