import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';
import Slider from '@react-native-community/slider';

const ColorOption = ({
  label,
  color,
  onChange,
  isSlider,
  sliderValue,
  onApply,
}) => {
  return (
    <View style={styles.optionContainer}>
      <Text style={styles.label}>{label}</Text>
      {isSlider ? (
        <Slider
          style={styles.slider}
          minimumValue={12}
          maximumValue={24}
          step={1}
          value={sliderValue}
          onValueChange={onChange}
        />
      ) : (
        <ColorPicker
          onColorChangeComplete={onChange}
          style={styles.colorPicker}
          color={color}
        />
      )}
      <Button title="Apply" onPress={onApply} />
    </View>
  );
};

const styles = StyleSheet.create({
  optionContainer: {
    alignItems: 'center',
    height: 400,
    // marginBottom: 5,
  },
  label: {
    marginBottom: 5,
  },
  colorPicker: {
    width: 180,
    height: 180,
    marginBottom: 0, // Reduce or remove the bottom margin
  },
  // slider: {
  //   width: 200,
  //   height: 40,
  // },
});

export default ColorOption;
