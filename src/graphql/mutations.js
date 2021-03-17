import { gql } from 'graphql-tag';

const REGISTER = gql`
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

export default REGISTER;
