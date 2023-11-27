import React, {createContext, useContext, useState} from 'react';

// Define the initial theme
const initialTheme = {
  backgroundColor: 'white',
  textColor: 'black',
};

// Create a context for the theme
const ThemeContext = createContext();

// Create a provider component
export const ThemeProvider = ({children}) => {
  const [theme, setTheme] = useState(initialTheme);

  // Function to update the theme
  const updateTheme = newTheme => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{theme, updateTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

// Create a hook to use the theme throughout the app
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
