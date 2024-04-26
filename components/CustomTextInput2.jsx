import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';

export default function CustomTextInput2({ value, placeholder, onChangeText, error, multiline }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      {/* <Text style={[styles.label, (isFocused || value) && styles.labelActive]}>{placeholder}</Text> */}
      <TextInput
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={[styles.input, multiline && styles.multilineInput, error && styles.inputError]}
        multiline={multiline}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  multilineInput: {
    height: 120, // Adjust the height as needed
    textAlignVertical: 'top', // Align text to the top
    paddingTop: 10, // Add padding at the top for better alignment
  },
  inputError: {
    borderColor: 'red',
  },
  label: {
    position: 'absolute',
    left: 10,
    top: 12,
    fontSize: 16,
    color: '#777',
  },
  labelActive: {
    // top: -8,
    fontSize: 12,
    color: 'blue',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});
