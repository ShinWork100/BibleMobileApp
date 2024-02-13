import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import SelectButton from './SelectButton';
import SelectionModal from './SelectionModal';
import {koreanBibleBooks} from './koreanBible';
import {bibleVersions} from './BibleVersion';
// import {PanGestureHandler, State} from 'react-native-gesture-handler';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from 'react-native-gesture-handler';
import {TouchableOpacity} from 'react-native';
import {useBibleVersion} from '../Setting/BibleVersionContext';
import englishBibleBooks from './englishBible';
import {useTheme} from '../Theme/ThemeContext';

function BibleScreen({route, navigation}) {
  const [chapterData, setChapterData] = useState([]);
  const [currentChapter, setCurrentChapter] = useState(1);
  const [bookName, setBookName] = useState('창'); // Default book name
  const [modalVisible, setModalVisible] = useState(false);
  const [isChangingChapter, setIsChangingChapter] = useState(false);
  const [currentChapters, setCurrentChapters] = useState(
    Array.from({length: koreanBibleBooks['창'].chapters}, (_, i) => i + 1),
  );
  const {theme} = useTheme(); // Use the theme
  const styles = getStyles(theme);

  const scrollViewRef = useRef(null);
  const [navigatedFromSearch, setNavigatedFromSearch] = useState(false);
  const {bibleVersion} = useBibleVersion(); // Access the selected Bible version
  console.log(`Current Bible version: ${bibleVersion}`); // Add this line for debugging
  const bibleConfig = bibleVersions[bibleVersion]; // Get the configuration for the current version
  if (!bibleConfig) {
    console.error(`No config found for version: ${bibleVersion}`);
    return null; // or some fallback UI
  }
  const fetchChapterData = (book, chapter) => {
    fetch(
      `http://127.0.0.1:5000/get-chapter?version=${bibleVersion}&book=${book}&chapter=${chapter}`,
    )
      .then(response => response.json())
      .then(data => setChapterData(data))
      .catch(error => console.error('Error fetching chapter:', error));
  };

  const openSelectionModal = () => {
    setModalVisible(true);
  };
  const handleResultSelect = (book, chapter, verseNumber) => {
    navigation.navigate('Bible', {book, chapter, verseNumber});
  };

  const handleSelection = (selectedBook, selectedChapter) => {
    if (selectedBook) {
      const bookDetail = bibleConfig.books[selectedBook];
      if (bookDetail) {
        setBookName(selectedBook);
        setCurrentChapter(selectedChapter || 1);
        setCurrentChapters(
          Array.from({length: bookDetail.chapters}, (_, i) => i + 1),
        );
        if (selectedChapter) {
          fetchChapterData(selectedBook, selectedChapter);
        }
      } else {
        console.error('Book not found: ', selectedBook);
      }
    } else {
      // If no book is selected, reset the chapter list and close the modal
      setCurrentChapters([]);
      setModalVisible(false);
    }
    if (selectedChapter) {
      fetchChapterData(selectedBook, selectedChapter);
      scrollViewRef.current?.scrollTo({x: 0, y: 0, animated: true});
    }
    setHighlightedVerse(null); // Clear the highlight
  };

  const handleSelectionModal = (selectedLongName, selectedChapter) => {
    console.log(
      'selectedLongName ',
      selectedLongName,
      ' selectedChapter ',
      selectedChapter,
    );
    if (selectedLongName) {
      const shortName = selectedLongName;
      if (
        shortName &&
        selectedChapter &&
        selectedChapter <= bibleConfig.books[shortName].chapters
      ) {
        setBookName(shortName);
        setCurrentChapter(selectedChapter || 1);
        setCurrentChapters(
          Array.from(
            {length: bibleConfig.books[shortName].chapters},
            (_, i) => i + 1,
          ),
        );
        setModalVisible(false);
        fetchChapterData(shortName, selectedChapter || 1);
      } else if (shortName) {
        setCurrentChapters(
          Array.from(
            {length: bibleConfig.books[shortName]?.chapters},
            (_, i) => i + 1,
          ),
        );
      } else {
        console.log(
          `Selected: ${selectedLongName}, Chapter: ${selectedChapter}`,
        );
      }
    } else {
      setModalVisible(false);
    }
    if (selectedChapter) {
      fetchChapterData(selectedLongName, selectedChapter || 1);
      scrollViewRef.current?.scrollTo({x: 0, y: 0, animated: true});
    }
    setNavigatedFromSearch(false);
    setHighlightedVerse(null); // Clear the highlight
  };

  useEffect(() => {
    // Check if route params are valid and exist in bibleConfig.books
    if (route.params?.book && bibleConfig.books[route.params.book]) {
      handleSelection(route.params.book, route.params.chapter);
    } else {
      fetchChapterData(bookName, currentChapter);
    }
    if (route.params?.verseNumber) {
      const versePosition = verseHeight * (route.params.verseNumber - 1);
      scrollViewRef.current?.scrollTo({x: 0, y: versePosition, animated: true});
    }
  }, [route.params]);

  // ---- search use effect -- when comes from the verse verse to the center
  const verseHeight = 40; // Replace with the actual height of your verse item

  // ... rest of your component

  useEffect(() => {
    if (
      route.params?.navigatedFromSearch &&
      route.params?.verseNumber &&
      chapterData.length > 0
    ) {
      const verseHeight = 40;
      const yOffset = verseHeight * (route.params.verseNumber - 1);
      scrollViewRef.current?.scrollTo({x: 0, y: yOffset, animated: true});
      console.log('setting highlight');
      setHighlightedVerse(route.params.verseNumber); // Set the highlighted verse
      setNavigatedFromSearch(false); // Reset the flag
    }
  }, [route.params]);

  //--------------------------------------------------------arrow function -------------------------------------------------------------------------------

  const [showArrows, setShowArrows] = useState(false);
  const hideArrowsTimeout = useRef(null);

  const onUserInteraction = () => {
    if (hideArrowsTimeout.current) {
      clearTimeout(hideArrowsTimeout.current);
    }
    setShowArrows(true);
    hideArrowsTimeout.current = setTimeout(() => {
      setShowArrows(false);
    }, 3000);
    setHighlightedVerse(null); // Clear the highlight
  };

  const onScroll = event => {
    const yOffset = event.nativeEvent.contentOffset.y;
    setShowArrows(yOffset > 50); // Show arrows when scrolled down a bit
  };

  const goToNextChapter = () => {
    const bookKeys = Object.keys(bibleConfig.books);
    const currentBookIndex = bookKeys.indexOf(bookName);
    const isLastChapter =
      currentChapter === bibleConfig.books[bookName].chapters;

    if (!isLastChapter) {
      setCurrentChapter(currentChapter + 1);
      fetchChapterData(bookName, currentChapter + 1);
    } else if (currentBookIndex < bookKeys.length - 1) {
      const nextBook = bookKeys[currentBookIndex + 1];
      setBookName(nextBook);
      setCurrentChapter(1);
      fetchChapterData(nextBook, 1);
    }
    scrollViewRef.current?.scrollTo({x: 0, y: 0, animated: true});
  };

  const goToPreviousChapter = () => {
    const bookKeys = Object.keys(bibleConfig.books);
    const currentBookIndex = bookKeys.indexOf(bookName);

    if (currentChapter > 1) {
      setCurrentChapter(currentChapter - 1);
      fetchChapterData(bookName, currentChapter - 1);
    } else if (currentBookIndex > 0) {
      const prevBook = bookKeys[currentBookIndex - 1];
      const lastChapter = bibleConfig.books[prevBook].chapters;
      setBookName(prevBook);
      setCurrentChapter(lastChapter);
      fetchChapterData(prevBook, lastChapter);
    }
    scrollViewRef.current?.scrollTo({x: 0, y: 0, animated: true});
  };
  const isLastBookAndChapter = () => {
    const bookKeys = Object.keys(bibleConfig.books);
    const isLastBook = bookName === bookKeys[bookKeys.length - 1];
    const isLastChapter =
      currentChapter === bibleConfig.books[bookName].chapters;
    return isLastBook && isLastChapter;
  };

  const isFirstBookAndChapter = () => {
    const bookKeys = Object.keys(bibleConfig.books);
    const isFirstBook = bookName === bookKeys[0];
    return isFirstBook && currentChapter === 1;
  };

  const ArrowButton = ({direction}) => (
    <TouchableOpacity
      style={[
        styles.arrowButton,
        direction === 'right' ? styles.rightArrow : styles.leftArrow,
      ]}
      onPress={direction === 'right' ? goToNextChapter : goToPreviousChapter}>
      <Text style={styles.arrowText}>{direction === 'right' ? '>' : '<'}</Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    return () => {
      if (hideArrowsTimeout.current) {
        clearTimeout(hideArrowsTimeout.current);
      }
    };
  }, []);

  //--------------------------------------------------------drag gesture -------------------------------------------------------------------------------
  const [isSwipeProcessing, setIsSwipeProcessing] = useState(false);

  const onGestureEvent = event => {
    // Check if nativeEvent is defined
    if (event.nativeEvent) {
      const {velocityX} = event.nativeEvent;

      if (velocityX > 0) {
        handleSwipeRight();
      } else {
        handleSwipeLeft();
      }
    }
  };

  const onHandlerStateChange = ({nativeEvent}) => {
    if (nativeEvent.state === State.END) {
      const {translationX} = nativeEvent;

      if (translationX > 0) {
        handleSwipeRight();
      } else {
        handleSwipeLeft();
      }
    }
  };
  const handleSwipeLeft = () => {
    if (!isSwipeProcessing && !isLastBookAndChapter()) {
      setIsSwipeProcessing(true);
      goToNextChapter();
      setTimeout(() => setIsSwipeProcessing(false), 300); // Adjust the delay as needed
    }
  };

  const handleSwipeRight = () => {
    if (!isSwipeProcessing && !isFirstBookAndChapter()) {
      setIsSwipeProcessing(true);
      goToPreviousChapter();
      setTimeout(() => setIsSwipeProcessing(false), 300); // Adjust the delay as needed
    }
  };

  // ----------------------------------higlight
  const [highlightedVerse, setHighlightedVerse] = useState(null);
  useEffect(() => {}, [highlightedVerse]);

  // ----------------update version
  const getDefaultBookName = () => {
    return bibleConfig.defaultBook;
  };

  const updateBooksAndChapters = () => {
    const defaultBookName = getDefaultBookName();
    const booksData = bibleConfig.books;

    console.log(`Updating to book: ${defaultBookName}`);
    setBookName(defaultBookName);
    setCurrentChapters(
      Array.from(
        {length: booksData[defaultBookName].chapters},
        (_, i) => i + 1,
      ),
    );
  };

  useEffect(() => {
    updateBooksAndChapters(); // Call this function when the component mounts
  }, []);

  useEffect(() => {
    // Log the version change
    console.log(`Bible version changed to: ${bibleVersion}`);

    // Update the book name and chapters based on the new version
    const newDefaultBookName = getDefaultBookName(bibleVersion);
    const newBooksData = bibleConfig.books;

    setBookName(newDefaultBookName);
    setCurrentChapters(
      Array.from(
        {length: newBooksData[newDefaultBookName].chapters},
        (_, i) => i + 1,
      ),
    );

    // Fetch the first chapter of the new version's default book
    fetchChapterData(newDefaultBookName, 1);

    // Reset the current chapter to 1
    setCurrentChapter(1);

    // Scroll to the top of the ScrollView
    scrollViewRef.current?.scrollTo({x: 0, y: 0, animated: false});
  }, [bibleVersion]);

  //   useEffect(() => {
  //     updateBooksAndChapters(); // Call this function when bibleVersion changes
  //     const defaultBookName = getDefaultBookName(bibleVersion);
  //     setBookName(defaultBookName);
  //     setCurrentChapters(
  //       Array.from(
  //         {length: bibleConfig.books[defaultBookName].chapters},
  //         (_, i) => i + 1,
  //       ),
  //     );
  //   }, [bibleVersion]);

  return (
    <GestureHandlerRootView
      style={{flex: 1, backgroundColor: theme.backgroundColor}}
      onTouchStart={onUserInteraction}
      key={bibleVersion}>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}>
        <View style={styles.outerContainer}>
          {showArrows && !isFirstBookAndChapter() && (
            <ArrowButton direction="left" />
          )}
          {showArrows && !isLastBookAndChapter() && (
            <ArrowButton direction="right" />
          )}
          <ScrollView
            ref={scrollViewRef}
            style={styles.container}
            contentContainerStyle={styles.content}
            onTouchStart={onUserInteraction}
            onScroll={onScroll}
            scrollEventThrottle={16} // Add this line
          >
            <Text
              style={[
                styles.screenTitle,
                {color: theme.textColor, fontSize: theme.fontSize},
              ]}>
              {bibleConfig.books[bookName]?.name || 'Unknown Book'} Chapter{' '}
              {currentChapter}
            </Text>
            {chapterData.map((verse, index) => (
              <Text
                key={index}
                style={[
                  styles.verse,
                  highlightedVerse === verse.verse_number
                    ? styles.highlightedVerse
                    : null,
                  {color: theme.textColor, fontSize: theme.fontSize},
                ]}>
                {verse.verse_number}. {verse.text}
              </Text>
            ))}
          </ScrollView>
          <SelectButton
            title="Select Book / Chapter"
            onPress={openSelectionModal}
          />
          {modalVisible && (
            <SelectionModal
              visible={modalVisible}
              books={Object.keys(bibleConfig.books).map(
                key => bibleConfig.books[key].name,
              )}
              bibleConfig={bibleConfig}
              chapters={currentChapters}
              onSelection={handleSelectionModal}
              onRequestClose={() => setModalVisible(false)}
            />
          )}
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
}

const getStyles = theme =>
  StyleSheet.create({
    outerContainer: {
      flex: 1,
      position: 'relative',
    },
    container: {
      flex: 1,
    },
    content: {
      flexGrow: 1,
      padding: 10,
    },
    screenTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      textAlign: 'center',
      marginVertical: 20,
    },
    verse: {
      fontSize: 16,
      marginBottom: 10,
    },

    arrowButton: {
      position: 'absolute',
      top: '50%',
      marginTop: -20, // Adjust this based on the height of your button
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      // backgroundColor: `${theme.backgroundColor}`,
      borderRadius: 20,
      zIndex: 10,
    },
    leftArrow: {
      left: 10,
    },
    rightArrow: {
      right: 10,
    },
    highlightedVerse: {
      backgroundColor: 'yellow', // Or any other highlight style
    },
  });

export default BibleScreen;
