import { gql } from "@apollo/client";

const ADD_CLIENT = gql`
  #AddClientInput - is our backend schema input name
  mutation addClientMutation($client: AddClientInput!) {
    addClient(client: $client) {
      id
      name
      email
      phone
    }
  }
`;

const UPDATE_CLIENT = gql`
  mutation updateClientMutation($id: ID!, $edits: UpdateClientInput!) {
    updateClient(id: $id, edits: $edits) {
      id
      name
      email
      phone
    }
  }
`;

const DELETE_CLIENT = gql`
  mutation deleteClientMutation($id: ID!) {
    deleteClient(id: $id) {
      id
      name
      email
      phone
    }
  }
`;

export { ADD_CLIENT, UPDATE_CLIENT, DELETE_CLIENT };
