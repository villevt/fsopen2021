import React from "react";
import { View, Pressable, StyleSheet } from "react-native";

import FormikTextInput from "../FormikTextInput";
import Text from "../Text";
import theme from "../../theme";

const styles = StyleSheet.create({
  form: {
    backgroundColor: theme.colors.white,
    margin: 4,
    padding: 8
  },
  input: {
    marginTop: 4,
    marginBottom: 4
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 2,
    textAlign: "center"
  },
  buttonText: {
    textAlign: "center",
    paddingTop: 8,
    paddingBottom: 8
  }
});

const SignInForm = ({onSubmit}) => (
  <View style={styles.form}>
    <FormikTextInput testID="usernameField" name="username" placeholder="Username" style={styles.input} />
    <FormikTextInput testID="passwordField" name="password" placeholder="Password" style={styles.input} secureTextEntry/>
    <Pressable testID="submitButton" onPress={onSubmit} style={[styles.input, styles.button]}>
      <Text fontSize="subheading" fontWeight="bold" color="white" style={styles.buttonText}>
        Sign in
      </Text>
    </Pressable>
  </View>
);

export default SignInForm;