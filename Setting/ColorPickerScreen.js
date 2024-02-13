import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import ColorOption from './ColorOption';
import {useTheme} from '../Theme/ThemeContext';
import SliderOption from './SliderOption';

const options = [
  {type: 'backgroundColor', title: 'Background Color', isSlider: false},
  {type: 'textColor', title: 'Font Color', isSlider: false},
  {type: 'fontSize', title: 'Font Size', isSlider: true},
];

const ColorPickerScreen = ({navigation}) => {
  const {theme, updateTheme} = useTheme();
  const [selectedOption, setSelectedOption] = useState(null);
  const [tempTheme, setTempTheme] = useState(theme); // Temporary state for theme changes
  const styles = getStyles(theme);

  const handleTempThemeChange = (type, value) => {
    setTempTheme({...tempTheme, [type]: value});
  };

  const applyThemeChanges = () => {
    updateTheme(tempTheme);
    setSelectedOption(null); // Optionally reset the selected option
  };

  const handleThemeChange = (type, value) => {
    updateTheme({[type]: value});
  };

  const toggleOption = option => {
    setSelectedOption(selectedOption === option ? null : option);
  };
  const CustomButton = ({title, onPress, style, textStyle}) => {
    return (
      <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: tempTheme.backgroundColor || theme.backgroundColor},
      ]}>
      <View style={styles.optionsList}>
        {options.map(option => (
          <CustomButton
            key={option.type}
            title={option.title}
            onPress={() => toggleOption(option.type)}
            style={{backgroundColor: theme.buttonColor}}
            textStyle={{color: theme.textColor}}
          />
        ))}
      </View>
      {selectedOption &&
        options.map(option => {
          if (selectedOption === option.type) {
            if (option.isSlider) {
              // Handle slider option
              return (
                <SliderOption
                  key={option.type}
                  label={option.title}
                  sliderValue={tempTheme[option.type]}
                  onChange={value => handleTempThemeChange(option.type, value)}
                  onApply={applyThemeChanges}
                />
              );
            } else {
              // Handle color picker option
              return (
                <ColorOption
                  key={option.type}
                  label={option.title}
                  color={tempTheme[option.type]}
                  onChange={value => handleTempThemeChange(option.type, value)}
                  onApply={applyThemeChanges}
                />
              );
            }
          }
        })}
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;

const getStyles = (theme, selectedOption) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: selectedOption ? 'flex-start' : 'center',
      paddingTop: selectedOption ? 20 : 0,
      padding: 10,
    },
    optionsList: {
      flexDirection: 'column',
      justifyContent: 'space-around',
      width: windowWidth - 20,
      marginBottom: 20,
    },
    button: {
      padding: 5,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 5,
    },
    buttonText: {
      fontSize: 16,
      color: theme.textColor,
    },
    colorPickerContainer: {
      height: 240, // Adjust the height as necessary
      width: windowWidth - 40, // Subtract some value to account for padding/margin
      padding: 0, // Adjust padding as needed
      margin: 0, // Adjust margin as needed
      alignItems: 'center',
      justifyContent: 'center',
    },
    colorPicker: {
      // height: 180, // Reduced from 200
      width: 180, // Reduced from 200
    },
    text: {
      fontSize: theme.fontSize, // Use fontSize from theme
      color: theme.textColor,
      // ... other styles
    },
    textContainer: {
      flex: 1, // Take up less space
      alignItems: 'center', // Center the texts horizontally
      justifyContent: 'center', // Center the texts vertically
      // marginTop: 20, // Create space above this container
    },
  });

export default ColorPickerScreen;
