import React from "react";
import { StyleSheet } from "react-native";
import { Link } from "react-router-native";
import theme from "../theme";

import Text from "./Text";

const styles = StyleSheet.create({
  tab: {
    padding: 10
  }
});

const AppBarTab = ({text, to}) => (
  <Link style={styles.tab} to={to} underlayColor={theme.colors.secondary}>
    <Text color="white" fontWeight="bold" fontSize="subheading">
      {text}
    </Text>
  </Link>
);

export default AppBarTab;