import { gql } from 'graphql-tag';

export const REGISTER = gql`
  mutation REGISTER(
    $username: String!
    $firstName: String!
    $lastName: String!
    $password: String!
  ) {
    createUser(
      username: $username
      firstName: $firstName
      lastName: $lastName
      password: $password
      userRoleId: 3
    ) {
      id
    }
  }
`;

export const DELETE_USER = gql`
  mutation DELETE_USER(
    $id: [Int!]!
  ) {
    deleteUser(id: $id)
  }
`;
