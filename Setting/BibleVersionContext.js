// BibleVersionContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const BibleVersionContext = createContext();

export const useBibleVersion = () => useContext(BibleVersionContext);

export const BibleVersionProvider = ({ children }) => {
  const [bibleVersion, setBibleVersion] = useState('KoreanVerses1');
  const [versionChanged, setVersionChanged] = useState(false);

  const updateBibleVersion = (version) => {
    setBibleVersion(version);
    setVersionChanged(true); // Indicate that version has changed
  };

  // Reset versionChanged flag after it's been set
  useEffect(() => {
    if (versionChanged) {
      setVersionChanged(false);
    }
  }, [versionChanged]);

  return (
    <BibleVersionContext.Provider value={{ bibleVersion, updateBibleVersion, versionChanged }}>
      {children}
    </BibleVersionContext.Provider>
  );
};
