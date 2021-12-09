import {createFeatureSelector, createSelector} from '@ngrx/store';
import {BooksState} from './books.reducer';

const getBookState = createFeatureSelector<BooksState>('books')

const getBooks = createSelector(getBookState, (state: BooksState) => state.books);
const getSelectedBook = createSelector(getBookState, (state: BooksState) => state.selectedBook);

export const BooksSelectors = {
  getBooks,
  getSelectedBook
}
