import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import AppBarTab from './AppBarTab';
import theme from '../theme';
import { useApolloClient, useQuery } from '@apollo/client';
import { AUTHORIZED_USER } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
    paddingTop: Constants.statusBarHeight,
  },
  scroll: {
    flexDirection: "row",
  }
});

const AppBar = () => {
  const {data} = useQuery(AUTHORIZED_USER, {fetchPolicy: "network-only"});
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scroll}>
        <AppBarTab text="Repositories" to="/" />
        {(data && data.authorizedUser) && <AppBarTab text="Create a review" to="/create-review" />}
        {data && data.authorizedUser
          ? <AppBarTab text="Sign out" onPress={signOut} />
          : <AppBarTab text="Sign in" to="/sign-in" />
        }
        {(!data || !data.authorizedUser) && <AppBarTab text="Sign up" to="/sign-up" />}
      </ScrollView>
    </View>
  );
};

export default AppBar;