import React from "react";
import { Pressable, StyleSheet } from "react-native"; 

import Text from "./Text";

const styles = StyleSheet.create({
  tab: {
    padding: 10
  }
});

const AppBarTab = ({text}) => (
  <Pressable style={styles.tab}>
    <Text color="white" fontWeight="bold" fontSize="subheading">
      {text}
    </Text>
  </Pressable>
);

export default AppBarTab;