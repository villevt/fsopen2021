import React from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import AppBarTab from './AppBarTab';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: Constants.statusBarHeight,
  }
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab text={"Repositories"} to="/" />
      <AppBarTab text={"Sign in"} to="/sign-in" />
    </View>
  );
};

export default AppBar;