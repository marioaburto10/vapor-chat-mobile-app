import React from 'react';
import { TextInput, StyleSheet, TextInputProps, View } from 'react-native';

interface VaporInputProps extends TextInputProps {
  placeholder: string;
}

const VaporInput: React.FC<VaporInputProps> = ({ placeholder, ...props }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#666666"
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#ffffff',
    minHeight: 56,
  },
});

export default VaporInput;

