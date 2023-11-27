import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const SelectButton = ({onPress, title}) => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: 'skyblue',
    borderRadius: 5,
    alignSelf: 'flex-end',
    marginRight: 10,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default SelectButton;
