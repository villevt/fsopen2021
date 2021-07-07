import React from 'react';
import { FlatList, View, StyleSheet} from "react-native";

import useRepositories from '../hooks/useRepositories';
import RepositoryItem from "./RepositoryItem";
import Text from './Text';

const styles = StyleSheet.create({
  separator: {
    height: 10
  }
});

const RepositoryList = () => {
  const {repositories} = useRepositories();

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  const separator = () => <View style={styles.separator}/>;

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={separator}
      renderItem={({item}) => {
        return(
          <RepositoryItem item={item} />
        );
      }}
    />
  );
};

export default RepositoryList;