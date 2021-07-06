import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import AppBarTab from './AppBarTab';
import theme from '../theme';

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
  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scroll}>
        <AppBarTab text={"Repositories"} to="/" />
        <AppBarTab text={"Sign in"} to="/sign-in" />
      </ScrollView>
    </View>
  );
};

export default AppBar;