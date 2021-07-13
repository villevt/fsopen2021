import { gql } from "@apollo/client";
import { REPOSITORY_FIELDS, PAGE_INFO, REVIEW_FIELDS } from "./fragments";


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
  ${REVIEW_FIELDS}
  query($id:ID!, $first: Int, $after: String) {
    repository(id: $id) {
      ...RepositoryFields,
      url
      reviews (first: $first, after: $after) {
        edges {
          node {
            ...ReviewFields
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
  ${REVIEW_FIELDS}
  ${PAGE_INFO}
  query ($includeReviews: Boolean = false) {
    authorizedUser {
      id
      username
      reviews @include (if: $includeReviews) {
        edges {
          node {
            ...ReviewFields,
            repository {
              name
            }
          }
        },
        pageInfo {
          ...PageInfo
        }
      }
    }
  }
`;