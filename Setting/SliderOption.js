import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, TextInput} from 'react-native';
import Slider from '@react-native-community/slider';

const SliderOption = ({label, sliderValue, onChange, onApply}) => {
  const [inputValue, setInputValue] = useState(sliderValue.toString());

  const handleInputChange = text => {
    setInputValue(text);
    const newValue = parseFloat(text);
    if (!isNaN(newValue) && newValue >= 2 && newValue <= 48) {
      onChange(newValue);
    }
  };

  return (
    <View style={styles.optionContainer}>
      <Text style={styles.label}>
        {label}: {sliderValue.toFixed(0)}
      </Text>
      <Slider
        style={styles.slider}
        minimumValue={2}
        maximumValue={48}
        step={1}
        value={sliderValue}
        onValueChange={value => {
          onChange(value);
          setInputValue(value.toString());
        }}
      />
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={inputValue}
        onChangeText={handleInputChange}
      />
      <Button title="Apply" onPress={onApply} />
    </View>
  );
};

const styles = StyleSheet.create({
  optionContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    marginBottom: 10,
  },
  slider: {
    width: 200,
    height: 40,
    marginBottom: 10,
  },
  input: {
    width: 50,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default SliderOption;
