import { gql } from "@apollo/client";

const ADD_PROJECT = gql`
  mutation addProjectMutation($project: AddProjectInput!) {
    addProject(project: $project) {
      id
      name
      description
      status
      client {
        id
        name
        email
        phone
      }
    }
  }
`;
const UPDATE_PROJECT = gql`
  mutation updateProjectMutation($id: ID!, $edits: UpdateProjectInput!) {
    updateProject(id: $id, edits: $edits) {
      id
      name
      description
      status
    }
  }
`;

const DELETE_PROJECT = gql`
  mutation deleteProjectMutation($id: ID!) {
    deleteProject(id: $id) {
      id
      name
      description
      status
    }
  }
`;

export { ADD_PROJECT, DELETE_PROJECT, UPDATE_PROJECT };
