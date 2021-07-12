import React from "react";
import { View, Image, StyleSheet, Pressable, FlatList } from "react-native";
import { useHistory, useParams } from "react-router-native";
import { useQuery } from "@apollo/client";
import * as WebBrowser from "expo-web-browser";
import { format } from "date-fns";

import Text from "./Text";
import TextStat from "./TextStat";
import theme from "../theme";
import { GET_REPOSITORY } from "../graphql/queries";

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 2,
    marginTop: 8,
    textAlign: "center"
  },
  buttonText: {
    textAlign: "center",
    paddingTop: 8,
    paddingBottom: 8
  },
  item: {
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.primary,
    borderLeftWidth: 4,
    marginLeft: 8,
    marginRight: 8,
    marginTop: 8,
    padding: 8
  },
  itemUpper: {
    alignItems: "center",
    flexDirection: "row",
    paddingBottom: 16
  },
  itemUpperRight: {
    alignItems: "flex-start",
    paddingLeft: 8,
    width: "90%"
  },
  itemUpperRightText: {
    marginBottom: 2,
    marginTop: 2,
  },
  itemLower: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  language: {
    backgroundColor: theme.colors.primary,
    padding: 2
  },
  reviewItem: {
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.primary,
    borderLeftWidth: 4,
    flexDirection: "row",
    marginLeft: 8,
    marginRight: 8,
    marginTop: 8,
    padding: 8
  },
  reviewRating: {
    borderColor: theme.colors.primary,
    borderWidth: 2,
    borderRadius: 20,
    height: 40,
    marginRight: 8,
    textAlign: "center",
    textAlignVertical: "center",
    width: 40,
  },
  reviewInfo: {
    width: "90%"
  }
});

const ReviewItem = ({item}) => {
  return (
    <View style={styles.reviewItem}>
      <View >
        <Text fontSize="subheading" fontWeight="bold" color="primary" style={styles.reviewRating} >
          {item.rating}
        </Text>
      </View>
      <View style={styles.reviewInfo}>
        <Text fontSize="subheading" fontWeight="bold">
          {item.user.username}
        </Text>
        <Text color="textSecondary">
          {format(new Date(item.createdAt), "dd.MM.yyyy")}
        </Text>
        <Text>
          {item.text}
        </Text>
      </View>
    </View>
  );
};

const RepositoryInfo = ({item, singleView}) => {
  const history = useHistory();

  const openSingleView = () => {
    history.push(`/repositories/${item.id}`);
  };

  const openGitHub = () => {
    WebBrowser.openBrowserAsync(item.url);
  };

  return(
    <Pressable onPress={!singleView ? openSingleView : undefined} testID="repositoryItem" style={styles.item}>
      <View style={styles.itemUpper}>
        <View>
          <Image source={{uri: item.ownerAvatarUrl}} style={theme.avatars.small}/>
        </View>
        <View style={styles.itemUpperRight}>
          <Text fontWeight="bold" fontSize="subheading" style={styles.itemUpperRightText}>
            {item.fullName}
          </Text>
          <Text color="textSecondary" style={styles.itemUpperRightText}>
            {item.description}
          </Text>
          <Text color="white" style={[styles.language, styles.itemUpperRightText]} >
            {item.language}
          </Text>
        </View>
      </View>
      <View style={styles.itemLower}>
        <TextStat number={item.stargazersCount} text="Stars"/>
        <TextStat number={item.forksCount} text="Forks" />
        <TextStat number={item.reviewCount} text="Reviews" />
        <TextStat number={item.ratingAverage} text="Rating" />
      </View>
      {singleView && 
        <Pressable style={styles.button} onPress={openGitHub}>
          <Text fontSize="subheading" fontWeight="bold" color="white" style={styles.buttonText}>
            Open in GitHub
          </Text>
        </Pressable> 
      }
    </Pressable>
  );
};

const RepositoryItem = ({item = {}}) => {
  const { id } = useParams();
  const { data } = useQuery(GET_REPOSITORY, {fetchPolicy: "cache-and-network", variables: {id}, skip: !id});
  const reviews = data
    ? data.repository.reviews.edges.map(edge => edge.node)
    : [];

  if (data) {
    item = data.repository;
  }

  const singleView = !!id;

  return(
    <FlatList
      data={reviews}
      renderItem={({item}) => <ReviewItem item={item} />}
      ListHeaderComponent={<RepositoryInfo item={item} singleView={singleView} />}
    />
  );
};

export default RepositoryItem;