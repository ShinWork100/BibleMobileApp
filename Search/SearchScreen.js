import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
} from 'react-native';
import {useBibleVersion} from '../Setting/BibleVersionContext';

const SearchScreen = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const {bibleVersion, versionChanged} = useBibleVersion(); // Access the current Bible version

  const handleSearch = () => {
    // Include the current Bible version in the search request
    fetch(
      `http://127.0.0.1:5000/search?query=${searchQuery}&version=${bibleVersion}`,
    )
      .then(response => response.json())
      .then(data => setSearchResults(data))
      .catch(error => console.error('Error searching:', error));
  };

  const handleResultSelect = (book, chapter, verseNumber) => {
    navigation.navigate('Bible', {
      book,
      chapter,
      verseNumber,
      navigatedFromSearch: true,
    });
  };

  useEffect(() => {
    if (versionChanged) {
      setSearchResults([]); // Clear search results when the version changes
    }
  }, [versionChanged]);

  return (
    <View style={styles.container}>
      <View style={styles.searchSection}>
        <TextInput
          style={styles.searchInput}
          onChangeText={setSearchQuery}
          value={searchQuery}
          placeholder="Search..."
        />
        <Button title="Search" onPress={handleSearch} />
      </View>
      <FlatList
        data={searchResults}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              handleResultSelect(item.book, item.chapter, item.verse_number)
            }>
            <Text style={styles.searchItem}>
              {item.book} {item.chapter}:{item.verse_number} - {item.text}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10, // Add space between input and button
  },
  searchItem: {
    padding: 10,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
  // Uncomment and adjust styles for Icon if needed
  // searchIcon: {
  //   padding: 10,
  // },
});

export default SearchScreen;
