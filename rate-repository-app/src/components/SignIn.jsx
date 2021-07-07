import React from 'react';
import { Formik } from "formik";

import SignInForm from './SignInForm';

const initialValues = {
  username: "",
  password: ""
};

const SignIn = () => {
  const onSubmit = values => {
    console.log(values);
  };

  return (
    <Formik onSubmit={onSubmit} initialValues={initialValues}>
      {({handleSubmit}) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;