import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useTheme} from '../Theme/ThemeContext';
import {useBibleVersion} from './BibleVersionContext';
import RNPickerSelect from 'react-native-picker-select';

function SettingsScreen() {
  const {theme, updateTheme} = useTheme();

  const {bibleVersion, updateBibleVersion} = useBibleVersion(); // Use the hook

  // Function to update the theme colors
  const handleThemeUpdate = (backgroundColor, textColor) => {
    const newTheme = {backgroundColor, textColor};
    updateTheme(newTheme);
  };

  // Function to handle Bible version change
  const handleVersionChange = value => {
    updateBibleVersion(value); // Update the Bible version
  };
  return (
    <View style={styles.container}>
      <Text style={[styles.header, {color: theme.textColor}]}>Settings</Text>

      {/* Theme Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, {color: theme.textColor}]}>
          Appearance:
        </Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            onPress={() => handleThemeUpdate('white', 'black')}
            style={[styles.button, styles.lightButton]}>
            <Text style={styles.buttonText}>Light</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleThemeUpdate('black', 'white')}
            style={[styles.button, styles.darkButton]}>
            <Text style={styles.buttonText}>Dark</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bible Version Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, {color: theme.textColor}]}>
          Select Bible Version:
        </Text>
        <RNPickerSelect
          onValueChange={handleVersionChange}
          items={[
            {label: 'Korean Version 1', value: 'KoreanVerses1'},
            {label: 'Korean Version 2', value: 'KoreanVerses2'},
            {label: 'English Version', value: 'EnglishVerses1'},
          ]}
          style={pickerSelectStyles}
          value={bibleVersion}
          useNativeAndroidPickerStyle={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    padding: 10,
    borderRadius: 20,
    width: 120,
    alignItems: 'center',
  },
  lightButton: {
    backgroundColor: '#f8f8f8',
  },
  darkButton: {
    backgroundColor: '#333',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
  },
});

export default SettingsScreen;
