import {Book} from '../model/book';
import {createReducer, on} from '@ngrx/store';
import {deselectBooksAction, selectBooksAction, setBooksAction} from './books.actions';

export const BOOKS_FEATURE = 'books';

export interface BooksState {
  books: Book[],
  selectedBook: Book | null
}

export const initialBooksState: BooksState = {
  books: [],
  selectedBook: null
}

export const booksStateReducer = createReducer(
  initialBooksState,
  on(setBooksAction, (state: BooksState, {books}) => ({...state, books})),
  on(selectBooksAction, (state: BooksState, {book}) => ({...state, selectedBook: book})),
  on(deselectBooksAction, (state: BooksState) => ({...state, selectedBook: null}))
);
