import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.secondary,
    borderWidth: 1,
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.subheading,
    paddingLeft: 2,
    paddingRight: 2
  },
  errorBorder: {
    borderColor: theme.colors.error
  }
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style, error && styles.errorBorder];

  return <NativeTextInput style={[styles.textInput, textInputStyle]} {...props} />;
};

export default TextInput;