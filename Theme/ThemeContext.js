import React, {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialTheme = {
  backgroundColor: 'white',
  textColor: 'black',
  fontSize: 14,
};

const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    // Load the theme from storage when the app starts
    const loadTheme = async () => {
      const storedTheme = await AsyncStorage.getItem('theme');
      if (storedTheme) {
        setTheme(JSON.parse(storedTheme));
      }
    };

    loadTheme();
  }, []);

  // Function to update the theme
  const updateTheme = async newTheme => {
    const updatedTheme = {...theme, ...newTheme};
    setTheme(updatedTheme);
    await AsyncStorage.setItem('theme', JSON.stringify(updatedTheme));
  };

  return (
    <ThemeContext.Provider value={{theme, updateTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
