import { gql } from 'graphql-tag';

const QUERY_USERS = gql`
  query QUERY_USERS {
    users {
      username
      id
      password
    }
  }
`;

export default QUERY_USERS;
