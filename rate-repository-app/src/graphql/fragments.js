import { gql } from "@apollo/client";

export const REPOSITORY_FIELDS = gql`
  fragment RepositoryFields on Repository {
    id,
    ownerAvatarUrl,
    fullName,
    description,
    language,
    stargazersCount,
    forksCount,
    reviewCount,
    ratingAverage
  }
`;

export const REVIEW_FIELDS = gql`
  fragment ReviewFields on Review {
    id,
    text,
    rating,
    createdAt
  }
`

export const PAGE_INFO = gql`
  fragment PageInfo on PageInfo {
    endCursor,
    startCursor,
    hasNextPage
  }
`