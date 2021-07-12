import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";

import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import theme from "../theme";
import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";
import { useHistory } from "react-router-native";

const initialValues = {
  ownerName: "",
  repositoryName: "",
  rating: "",
  text: ""
};

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required("Repository owner name is required"),
  repositoryName: yup
    .string()
    .required("Repository name is required"),
  rating: yup
    .number()
    .typeError("Rating should be a number")
    .integer("Rating should be a whole number")
    .required("Rating is required")
    .min(0, message="Rating can't be smaller than 0")
    .max(100, message="Rating can't be more than 100"),
  text: yup
    .string()
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

const CreateReviewForm = ({onSubmit}) => (
  <View style={styles.form}>
    <FormikTextInput name="ownerName" placeholder="Repository owner name" style={styles.input} />
    <FormikTextInput name="repositoryName" placeholder="Repository name" style={styles.input} />
    <FormikTextInput name="rating" placeholder="Rating between 0 and 100" style={styles.input} />
    <FormikTextInput name="text" placeholder="Review" style={styles.input} multiline />
    <Pressable testID="submitButton" onPress={onSubmit} style={[styles.input, styles.button]}>
      <Text fontSize="subheading" fontWeight="bold" color="white" style={styles.buttonText}>
        Create a review
      </Text>
    </Pressable>
  </View>
);

const CreateReview = () => {
  const [addReview] = useMutation(CREATE_REVIEW, {onCompleted: data => {
    history.push(`repositories/${data.createReview.repositoryId}`);
  }})
  const history = useHistory()

  const onSubmit = values => {
    addReview({variables: {...values, rating: parseInt(values.rating)}});
  }

  return (
    <Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={validationSchema}>
      {({handleSubmit}) => <CreateReviewForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

export default CreateReview;