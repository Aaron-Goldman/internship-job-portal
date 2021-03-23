import { gql } from 'graphql-tag';

export const QUERY_USERS = gql`
  query QUERY_USERS {
    users {
      username
      id
      password
    }
  }
`;
export const QUERY_JOBS = gql`
  query QUERY_JOBS {
    jobs {
      id
      name
      description
      company {
        name
      }
    }
  }
`;
