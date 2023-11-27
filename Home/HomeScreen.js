import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
// Import the context that holds the user's selected Bible version
import {useBibleVersion} from '../Setting/BibleVersionContext';

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});

function HomeScreen() {
  const [dailyVerse, setDailyVerse] = useState('');
  const {bibleVersion} = useBibleVersion();

  useEffect(() => {
    // Include the selected Bible version in the request
    fetch(`http://localhost:5000/daily-verse?version=${bibleVersion}`)
      .then(response => response.json())
      .then(data => {
        setDailyVerse(
          `${data.book} ${data.chapter}:${data.verse_number} - ${data.text}`,
        );
      })
      .catch(error => {
        console.error('Error fetching daily verse:', error);
      });
  }, [bibleVersion]); // Depend on the bibleVersion

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.screenTitle}>Daily Verse</Text>
      <Text>{dailyVerse}</Text>
    </View>
  );
}

export default HomeScreen;
