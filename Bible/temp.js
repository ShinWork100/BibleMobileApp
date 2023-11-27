  // gesture  --------------------------------------
  //   const onGestureEvent = event => {
  //     if (event.nativeEvent.translationX > 0 && isSwipeRightAllowed()) {
  //       goToNextChapter();
  //     } else if (event.nativeEvent.translationX < 0 && isSwipeLeftAllowed()) {
  //       goToPreviousChapter();
  //     }
  //   };
  //   const onHandlerStateChange = event => {
  //     if (event.nativeEvent.state === State.END && !isChangingChapter) {
  //       const translationX = event.nativeEvent.translationX;
  //       const swipeThreshold = 50; // Swipe threshold, adjust as needed

  //       // Swipe left (negative translationX) for next chapter
  //       if (translationX < -swipeThreshold && isSwipeLeftAllowed()) {
  //         setIsChangingChapter(true); // Set flag to indicate chapter change is in progress
  //         goToNextChapter();
  //       }
  //       // Swipe right (positive translationX) for previous chapter
  //       else if (translationX > swipeThreshold && isSwipeRightAllowed()) {
  //         setIsChangingChapter(true); // Set flag to indicate chapter change is in progress
  //         goToPreviousChapter();
  //       }
  //     }
  //   };

  //   const goToNextChapter = () => {
  //     let nextBook = bookName;
  //     let nextChapter = currentChapter + 1;

  //     if (nextChapter > koreanBibleBooks[bookName].chapters) {
  //       // Find the next book
  //       const bookKeys = Object.keys(koreanBibleBooks);
  //       const currentBookIndex = bookKeys.indexOf(bookName);

  //       if (currentBookIndex < bookKeys.length - 1) {
  //         nextBook = bookKeys[currentBookIndex + 1];
  //         nextChapter = 1;
  //       } else {
  //         // Last book's last chapter, do nothing or cycle to the first book
  //         return;
  //       }
  //     }
  //     setIsChangingChapter(false);
  //     setBookName(nextBook);
  //     setCurrentChapter(nextChapter);
  //     fetchChapterData(nextBook, nextChapter);
  //   };

  //   const goToPreviousChapter = () => {
  //     let prevBook = bookName;
  //     let prevChapter = currentChapter - 1;

  //     if (prevChapter < 1) {
  //       // Find the previous book
  //       const bookKeys = Object.keys(koreanBibleBooks);
  //       const currentBookIndex = bookKeys.indexOf(bookName);

  //       if (currentBookIndex > 0) {
  //         prevBook = bookKeys[currentBookIndex - 1];
  //         prevChapter = koreanBibleBooks[prevBook].chapters;
  //       } else {
  //         // First book's first chapter, do nothing or cycle to the last book
  //         return;
  //       }
  //     }
  //     setIsChangingChapter(false);
  //     setBookName(prevBook);
  //     setCurrentChapter(prevChapter);
  //     fetchChapterData(prevBook, prevChapter);
  //   };

  //   const isSwipeLeftAllowed = () => {
  //     return !(
  //       bookName === Object.keys(koreanBibleBooks)[0] && currentChapter === 1
  //     );
  //   };

  //   const isSwipeRightAllowed = () => {
  //     const bookKeys = Object.keys(koreanBibleBooks);
  //     const lastBook = bookKeys[bookKeys.length - 1];
  //     return !(
  //       bookName === lastBook &&
  //       currentChapter === koreanBibleBooks[lastBook].chapters
  //     );
  //   };