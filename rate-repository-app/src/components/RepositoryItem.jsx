import React from "react";
import { View, Image, StyleSheet } from "react-native";

import Text from "./Text";
import TextStat from "./TextStat";
import theme from "../theme";

const styles = StyleSheet.create({
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

const RepositoryItem = ({item}) => (
  <View style={styles.item}>
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
  </View>
);

export default RepositoryItem;