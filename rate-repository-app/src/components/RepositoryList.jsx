import React, { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet} from "react-native";

import useRepositories from '../hooks/useRepositories';
import { RepositoryItem } from "./RepositoryItem";

const styles = StyleSheet.create({
  separator: {
    height: 10
  }
});

const RepositoryList = () => {
  const repositories = useRepositories;

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={<View style={styles.separator}/>}
      renderItem={({item}) => {
        return(
          <RepositoryItem item={item} />
        );
      }}
    />
  );
};

export default RepositoryList;