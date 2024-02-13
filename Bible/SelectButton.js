// SelectButton.js
import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const SelectButton = ({title, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4e9af1', // Example color
    paddingVertical: 8, // Reduced padding
    paddingHorizontal: 12, // Reduced padding
    borderRadius: 5,
    // margin: 10, // Adjust as needed
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});

export default SelectButton;
