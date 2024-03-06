import React from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';

export default function Input({...props}: TextInputProps) {
  return <TextInput {...props} style={[styles.container, props.style]} />;
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 8,
    fontSize: 16,
  },
});
