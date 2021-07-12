import React, { useState } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";

import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import theme from "../theme";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";
import { useHistory } from "react-router-native";
import useSignIn from "../hooks/useSignIn";

const initialValues = {
  username: "",
  password: "",
  passwordConfirm: ""
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(1, "Username should be at least 1 character long")
    .max(30, "Username cannot be longer than 30 characters"),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Password should be at least 5 characters long")
    .max(50, "Password should not be longer than 50 characters"),
  passwordConfirm: yup
    .string()
    .required("Password confirmation is required")
    .oneOf([yup.ref("password")], "Password confirmation needs to match password")
});

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

const SignUpForm = ({onSubmit}) => (
  <View style={styles.form}>
    <FormikTextInput name="username" placeholder="Username" style={styles.input} />
    <FormikTextInput name="password" placeholder="Password" style={styles.input} secureTextEntry/>
    <FormikTextInput name="passwordConfirm" placeholder="Password confirmation" style={styles.input} secureTextEntry/>
    <Pressable testID="submitButton" onPress={onSubmit} style={[styles.input, styles.button]}>
      <Text fontSize="subheading" fontWeight="bold" color="white" style={styles.buttonText}>
        Create a review
      </Text>
    </Pressable>
  </View>
);

const SignUp = () => {
  const history = useHistory();
  const [signIn] = useSignIn();
  const [password, setPassword] = useState("");

  const [signUp] = useMutation(CREATE_USER, {onCompleted: async data => {
    await signIn({username: data.createUser.username, password});
    history.push("/");
  }});

  const onSubmit = values => {
    setPassword(values.password);
    signUp({variables: {username: values.username, password: values.password}});
  };

  return (
    <Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={validationSchema}>
      {({handleSubmit}) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignUp;