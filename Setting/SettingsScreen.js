import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Button} from 'react-native';
import {useTheme} from '../Theme/ThemeContext';
import {useBibleVersion} from './BibleVersionContext';
import RNPickerSelect from 'react-native-picker-select';

function SettingsScreen({navigation}) {
  const {theme} = useTheme();
  const styles = getStyles(theme);
  const {bibleVersion, updateBibleVersion} = useBibleVersion(); // Use the hook

  // Function to handle Bible version change
  const handleVersionChange = value => {
    updateBibleVersion(value); // Update the Bible version
  };

  const CustomButton = ({title, onPress, style, textStyle}) => {
    return (
      <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      {/* Theme Section */}
      {/* <Button
        style={styles.customizeButton}
        title="Customize Theme Color"
        onPress={() => navigation.navigate('ColorPicker')}
      /> */}
      <CustomButton
        style={{backgroundColor: theme.buttonColor}}
        textStyle={{color: theme.textColor}}
        title="Customize Theme Color"
        onPress={() => navigation.navigate('Customize Theme Color')}
      />

      {/* Bible Version Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, {color: theme.textColor}]}>
          Select Bible Version
        </Text>
        <RNPickerSelect
          onValueChange={handleVersionChange}
          items={[
            {label: 'Korean Version 1', value: 'KoreanVerses1'},
            {label: 'Korean Version 2', value: 'KoreanVerses2'},
            {label: 'English Version', value: 'EnglishVerses1'},
          ]}
          style={pickerSelectStyles(theme)}
          value={bibleVersion}
          useNativeAndroidPickerStyle={false}
        />
      </View>
    </View>
  );
}

const getStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
    },
    section: {
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 18,
      marginBottom: 10,
      textAlign: 'center',
    },
    button: {
      padding: 10,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 10,
    },
    buttonText: {
      fontSize: 16,
      color: theme.textColor,
    },
  });

const pickerSelectStyles = theme =>
  StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: theme.textColor,
      paddingRight: 30,
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'gray',
      borderRadius: 8,
      color: theme.textColor,
      paddingRight: 30,
    },
  });

export default SettingsScreen;
