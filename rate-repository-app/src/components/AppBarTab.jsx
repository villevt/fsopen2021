import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Link } from "react-router-native";
import theme from "../theme";

import Text from "./Text";

const styles = StyleSheet.create({
  tab: {
    padding: 10
  }
});

const AppBarTab = ({text, to, onPress}) => {
  if (to) {
    return(
      <Link style={styles.tab} to={to} underlayColor={theme.colors.secondary}>
        <Text color="white" fontWeight="bold" fontSize="subheading">
          {text}
        </Text>
      </Link>
    );
  } else if (onPress) {
    return(
      <Pressable style={styles.tab} onPress={onPress} underlayColor={theme.colors.secondary}>
        <Text color="white" fontWeight="bold" fontSize="subheading">
          {text}
        </Text>
      </Pressable>
    );
  } else {
    return(
      <Text/>
    );
  }
};

export default AppBarTab;