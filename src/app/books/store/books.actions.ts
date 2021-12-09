import {createAction, props} from '@ngrx/store';
import {Book} from '../model/book';

export enum BooksActionsTypes {
  SetBooks = '[Books] Set books',
  SelectBooks = '[Books] Select book',
  DeselectBooks = '[Books] Deselect book'
}

export const setBooksAction = createAction(BooksActionsTypes.SetBooks, props<{ books: Book[] }>());
export const selectBooksAction = createAction(BooksActionsTypes.SelectBooks, props<{ book: Book }>());
export const deselectBooksAction = createAction(BooksActionsTypes.DeselectBooks);
