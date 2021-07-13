import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useDebounce } from "use-debounce";

import useRepositories from '../../hooks/useRepositories';
import RepositoryItem from "../RepositoryItem";
import TextInput from '../TextInput';

const styles = StyleSheet.create({
  filter: {
    borderRadius: 4,
    paddingTop: 8,
    paddingBottom: 8,
    margin: 8
  },
  picker: {
    marginLeft: 4
  },
  separator: {
    height: 10
  }
});

const RepositoryFilterer = ({filter, filterChanged}) => (
  <TextInput onChangeText={filterChanged} value={filter} placeholder="Filter repositories" style={styles.filter}/>
)

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

const ListHeader = ({orderBy, orderByChanged, filter, filterChanged}) => (
  <View>
    <RepositoryFilterer filter={filter} filterChanged={filterChanged} />
    <RepositoryOrderer orderBy={orderBy} orderByChanged={orderByChanged}/>
  </View>
);

export const RepositoryListContainer = ({ orderBy, orderByChanged, filter, filterChanged, repositories, onEndReach }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const separator = () => <View style={styles.separator}/>;

  return (
    <FlatList testID="repositoryList"
      data={repositoryNodes}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      ItemSeparatorComponent={separator}
      ListHeaderComponent={<ListHeader orderBy={orderBy} orderByChanged={orderByChanged} filter={filter} filterChanged={filterChanged}/>}
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
  const [filter, setFilter] = useState("")
  const [debouncedFilter] = useDebounce(filter, 500);
  const { repositories, refetch, fetchMore } = useRepositories({first: 8});

  const orderByChanged = (itemValue) => {
    setOrderBy(itemValue);
    refetch({
      orderBy: (itemValue === "CREATED_AT" ? "CREATED_AT" : "RATING_AVERAGE"),
      orderDirection: (itemValue.substr(itemValue.length - 3, itemValue.length) === "ASC" ? "ASC" : "DESC")
    });
  };

  useEffect(() => {
    refetch({searchKeyword: debouncedFilter})
  }, [debouncedFilter])

  const filterChanged = text => {
    setFilter(text);
  };

  const onEndReach = () => {
    fetchMore();
  };

  return <RepositoryListContainer 
    repositories={repositories} 
    onEndReach={onEndReach}
    orderBy={orderBy} 
    orderByChanged={orderByChanged} 
    filter={filter}
    filterChanged={filterChanged}
  />;
};

export default RepositoryList;