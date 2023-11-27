import {koreanBibleBooks, koreanLongBibleBooks} from './koreanBible';
import englishBibleBooks from './englishBible';
export const bibleVersions = {
  KoreanVerses1: {
    defaultBook: '창',
    books: koreanBibleBooks, // Imported from your Korean Bible books file
    language: 'korean',
  },
  KoreanVerses2: {
    defaultBook: '창',
    books: koreanBibleBooks, // Assuming this is similar to KoreanVerses1 for the example
    language: 'korean',
  },
  EnglishVerses1: {
    defaultBook: 'Genesis',
    books: englishBibleBooks, // Imported from your English Bible books file
    language: 'english',
  },
};
