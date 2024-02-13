import React, {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BibleVersionContext = createContext();

export const BibleVersionProvider = ({children}) => {
  const [bibleVersion, setBibleVersion] = useState('KoreanVerses1'); // Replace 'defaultVersion' with your default version

  useEffect(() => {
    // Load the Bible version from storage when the app starts
    const loadBibleVersion = async () => {
      const storedVersion = await AsyncStorage.getItem('bibleVersion');
      if (storedVersion) {
        setBibleVersion(storedVersion);
      }
    };

    loadBibleVersion();
  }, []);

  // Function to update the Bible version
  const updateBibleVersion = async newVersion => {
    setBibleVersion(newVersion);
    // Save the updated version to storage
    await AsyncStorage.setItem('bibleVersion', newVersion);
  };

  return (
    <BibleVersionContext.Provider value={{bibleVersion, updateBibleVersion}}>
      {children}
    </BibleVersionContext.Provider>
  );
};

export const useBibleVersion = () => {
  const context = useContext(BibleVersionContext);
  if (!context) {
    throw new Error(
      'useBibleVersion must be used within a BibleVersionProvider',
    );
  }
  return context;
};
// // BibleVersionContext.js
// import React, { createContext, useContext, useState, useEffect } from 'react';

// const BibleVersionContext = createContext();

// export const useBibleVersion = () => useContext(BibleVersionContext);

// export const BibleVersionProvider = ({ children }) => {
//   const [bibleVersion, setBibleVersion] = useState('KoreanVerses1');
//   const [versionChanged, setVersionChanged] = useState(false);

//   const updateBibleVersion = (version) => {
//     setBibleVersion(version);
//     setVersionChanged(true); // Indicate that version has changed
//   };

//   // Reset versionChanged flag after it's been set
//   useEffect(() => {
//     if (versionChanged) {
//       setVersionChanged(false);
//     }
//   }, [versionChanged]);

//   return (
//     <BibleVersionContext.Provider value={{ bibleVersion, updateBibleVersion, versionChanged }}>
//       {children}
//     </BibleVersionContext.Provider>
//   );
// };
