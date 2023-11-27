import React, {useState, useEffect} from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {koreanBibleBooks, koreanLongBibleBooks} from './koreanBible';

const SelectionModal = ({
  visible,
  books,
  chapters,
  onSelection,
  onRequestClose,
  bibleConfig,
}) => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);

  const handleBookSelect = book => {
    // Check if the same book is selected
    if (book === selectedBook) {
      // If same book is selected, toggle off the chapter list
      setSelectedBook(null);
      setSelectedChapter(null);
    } else {
      // If different book is selected, update the chapters
      setSelectedBook(book);
      setSelectedChapter(null);

      const longName =
        bibleConfig.language === 'korean'
          ? koreanLongBibleBooks[book]?.name
          : bibleConfig.books[book]?.name;
      onSelection(longName, null); // Update the selection for the new book
    }
  };

  const handleChapterSelect = chapter => {
    setSelectedChapter(chapter);
    if (bibleConfig.language === 'korean') {
      onSelection(koreanLongBibleBooks[selectedBook]?.name, chapter);
    } else {
      onSelection(bibleConfig.books[selectedBook]?.name, chapter);
    }
  };

  useEffect(() => {
    if (selectedBook && selectedChapter) {
      onRequestClose();
    }
  }, [selectedBook, selectedChapter, onRequestClose]);

  const handleClose = () => {
    setSelectedBook(null);
    setSelectedChapter(null);
    onRequestClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}>
      <TouchableWithoutFeedback onPress={onRequestClose}>
        <View style={styles.centeredView}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={onRequestClose}>
              <Icon name="close" size={22} color="#000" />
            </TouchableOpacity>
            <FlatList
              data={books}
              keyExtractor={(item, index) => `book-${index}`}
              renderItem={({item}) => (
                <View>
                  <TouchableOpacity
                    style={styles.book}
                    onPress={() => handleBookSelect(item)}
                    activeOpacity={0.7}>
                    <Text style={styles.itemText}>{item}</Text>
                    {selectedBook === item && (
                      <Icon name="caretdown" size={18} color="#000" />
                    )}
                  </TouchableOpacity>
                  {selectedBook === item && (
                    <FlatList
                      data={chapters}
                      keyExtractor={(item, index) => `chapter-${index}`}
                      renderItem={({item}) => (
                        <TouchableOpacity
                          style={styles.chapter}
                          onPress={() => handleChapterSelect(item)}
                          activeOpacity={0.7}>
                          <Text style={styles.itemText}>{item}</Text>
                        </TouchableOpacity>
                      )}
                      numColumns={5} // Set the number of columns to 5
                      contentContainerStyle={styles.chapterList}
                    />
                  )}
                </View>
              )}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    maxHeight: '90%',
    backgroundColor: 'white',
    borderRadius: 2,
    shadowColor: '#000',
    // ...other styling for modalContent
  },
  modalView: {
    padding: 10,
    alignItems: 'stretch',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
    // You can adjust padding for better touch area
  },
  book: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  chapterList: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  chapter: {
    width: '18%', // Adjust this width based on your UI requirement
    padding: 5,
    margin: '1%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  // ... add any other styles you might have ...
});

export default SelectionModal;
