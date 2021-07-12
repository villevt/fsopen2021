import { gql } from "@apollo/client";
import { REPOSITORY_FIELDS } from "./fragments";

export const GET_REPOSITORIES = gql`
  ${REPOSITORY_FIELDS}
  query ($orderBy:AllRepositoriesOrderBy,$orderDirection:OrderDirection){
    repositories
      (
        orderBy:$orderBy,
        orderDirection:$orderDirection
      )
    {
      edges{
        node{
          ...RepositoryFields
        }
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  ${REPOSITORY_FIELDS}
  query($id:ID!) {
    repository(id: $id) {
      ...RepositoryFields,
      url
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;

export const AUTHORIZED_USER = gql`
  query {
    authorizedUser {
      id
      username
    }
  }
`;