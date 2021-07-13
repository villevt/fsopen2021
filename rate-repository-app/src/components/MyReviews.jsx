import { useQuery } from "@apollo/client";
import React from "react";
import { FlatList } from "react-native";
import { AUTHORIZED_USER } from "../graphql/queries";

import { ReviewItem } from "./RepositoryItem";

const MyReviews = () => {
  const first = 8;
  const {data, loading, fetchMore} = useQuery(AUTHORIZED_USER, {
    variables: {
      includeReviews: true,
      first
    }
  });

  const reviews = data?.authorizedUser.reviews.edges.map(edge => edge.node);

  const handleFetchMore = () => {
    if (!loading && data?.authorizedUser.reviews.pageInfo.hasNextPage) {
      fetchMore({
        variables: {
          first,
          after: data.authorizedUser.reviews.pageInfo.endCursor
        }
      })
    }
  }

  return (
    <FlatList 
      data={reviews}
      onEndReached={handleFetchMore}
      onEndReachedThreshold={0.1}
      renderItem={({item}) => <ReviewItem item={item} />}
    />
  )
};

export default MyReviews;