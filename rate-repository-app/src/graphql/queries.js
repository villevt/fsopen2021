import { gql } from "@apollo/client";
import { REPOSITORY_FIELDS, PAGE_INFO } from "./fragments";


export const GET_REPOSITORIES = gql`
  ${REPOSITORY_FIELDS}
  ${PAGE_INFO}
  query (
    $orderBy:AllRepositoriesOrderBy,
    $orderDirection:OrderDirection,
    $searchKeyword:String,
    $first:Int,
    $after:String
  ){
    repositories
      (
        orderBy:$orderBy,
        orderDirection:$orderDirection,
        searchKeyword:$searchKeyword,
        first:$first,
        after:$after
      )
    {
      edges{
        node{
          ...RepositoryFields
        }
      },
      pageInfo{
        ...PageInfo
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  ${REPOSITORY_FIELDS}
  ${PAGE_INFO}
  query($id:ID!, $first: Int, $after: String) {
    repository(id: $id) {
      ...RepositoryFields,
      url
      reviews (first: $first, after: $after) {
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
        },
        pageInfo{
          ...PageInfo
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