import React from "react";
import { Text } from "react-native";

const RepositoryItem = ({item}) => (
  <Text>
    Full name: {item.fullName+"\n"}
    Description: {item.description+"\n"}
    Language: {item.language+"\n"}
    Stars: {item.stargazersCount+"\n"}
    Forks: {item.forksCount+"\n"}
    Reviews: {item.reviewCount+"\n"}
    Rating: {item.ratingAverage}
  </Text>
);

export default RepositoryItem;