import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Switch, Route, useParams } from 'react-router-native';
import { useLazyQuery } from '@apollo/client';

import theme from '../theme';
import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import RepositoryItem from './RepositoryItem';
import SignIn from './SignIn';
import { GET_REPOSITORY } from '../graphql/queries';
import CreateReview from './CreateReview';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.secondary,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path="/repositories/:id" exact>
          <RepositoryItem />
        </Route>
        <Route path="/" exact>
          <RepositoryList />
        </Route>
        <Route path="/sign-in" exact>
          <SignIn />
        </Route>
        <Route path="/create-review" exact>
          <CreateReview />
        </Route>
      </Switch>
    </View>
  );
};

export default Main;