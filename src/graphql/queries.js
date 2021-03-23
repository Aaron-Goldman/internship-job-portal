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
export const QUERY_JOB_DETAILS = gql`
  query QUERY_JOB_DETAILS($id: Int!) {
    job(id: $id) {
      name
      description
      isAvailable
      company {
        name
      }
      jobSkills {
        skill {
          id
          name
        }
      }
      jobRequirements {
        id
        name
      }
      jobBenefits {
        id
        name
      }
    }
  }
`;
