import React from "react";
import { View, Image, StyleSheet, Pressable } from "react-native";
import { useHistory, useParams } from "react-router-native";
import { useQuery } from "@apollo/client";
import * as WebBrowser from "expo-web-browser";

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
  }
});

const RepositoryItem = ({item = {}}) => {
  const history = useHistory();
  const { id } = useParams();
  const {data} = useQuery(GET_REPOSITORY, {variables: {id}, skip: !id});

  if (data) {
    item = data.repository;
  }

  const openSingleView = () => {
    history.push(`/repositories/${item.id}`);
  }

  const openGitHub = () => {
    WebBrowser.openBrowserAsync(item.url);
  }

  return(
    <Pressable onPress={!id && openSingleView} testID="repositoryItem" style={styles.item}>
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
      {id && 
        <Pressable style={styles.button} onPress={openGitHub}>
          <Text fontSize="subheading" fontWeight="bold" color="white" style={styles.buttonText}>
            Open in GitHub
          </Text>
        </Pressable>
      }
    </Pressable>
  );
};

export default RepositoryItem;