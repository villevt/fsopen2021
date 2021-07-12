import React, { useState } from 'react';
import { FlatList, View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

import useRepositories from '../../hooks/useRepositories';
import RepositoryItem from "../RepositoryItem";

const styles = StyleSheet.create({
  picker: {
    marginLeft: 4
  },
  separator: {
    height: 10
  }
});

const RepositoryOrderer = ({orderBy, orderByChanged}) => (
  <Picker
    style={styles.picker}
    selectedValue={orderBy}
    onValueChange={orderByChanged}
  >
    <Picker.Item label="Latest repositories" value="CREATED_AT" />
    <Picker.Item label="Highest rated repositories" value="RATING_AVERAGE DESC" />
    <Picker.Item label="Lowest rated repositories" value="RATING_AVERAGE ASC" />
  </Picker>
);

export const RepositoryListContainer = ({ orderBy, orderByChanged, repositories }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const separator = () => <View style={styles.separator}/>;

  return (
    <FlatList testID="repositoryList"
      data={repositoryNodes}
      ItemSeparatorComponent={separator}
      ListHeaderComponent={<RepositoryOrderer orderBy={orderBy} orderByChanged={orderByChanged}/>}
      renderItem={({item}) => {
        return(
          <RepositoryItem item={item} />
        );
      }}
    />
  );
};

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState("CREATED_AT");
  const { repositories, refetch } = useRepositories();

  const orderByChanged = (itemValue) => {
    console.log(itemValue); 
    setOrderBy(itemValue);
    refetch({
      orderBy: (itemValue === "CREATED_AT" ? "CREATED_AT" : "RATING_AVERAGE"),
      orderDirection: (itemValue.substr(itemValue.length - 3, itemValue.length) === "ASC" ? "ASC" : "DESC")
    });
  };

  return <RepositoryListContainer repositories={repositories} orderBy={orderBy} orderByChanged={orderByChanged}/>;
};

export default RepositoryList;