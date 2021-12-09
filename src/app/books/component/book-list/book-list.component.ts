import {Component, OnDestroy} from '@angular/core';
import {Book} from '../../model/book';
import {BookService} from '../../service/book.service';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {BooksState} from '../../store/books.reducer';
import {deselectBooksAction, selectBooksAction, setBooksAction} from '../../store/books.actions';
import {BooksSelectors} from '../../store/books.selectors';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnDestroy {

  books$: Observable<Book[]>;
  readonly selectedBook$: Observable<Book | null>;
  selectedBookId: number | undefined = undefined;

  private readonly unSubscribe = new Subject();

  constructor(private readonly bookService: BookService, private readonly store: Store<BooksState>) {
    this.bookService.getBooks()
      .pipe(
        takeUntil(this.unSubscribe))
      .subscribe(books =>
        this.store.dispatch(setBooksAction({books}))
      );
    this.books$ = this.store.pipe(select(BooksSelectors.getBooks));
    this.selectedBook$ = this.store.pipe(select(BooksSelectors.getSelectedBook));
    this.selectedBook$.pipe(takeUntil(this.unSubscribe)).subscribe(
      book => book ? this.selectedBookId = book.id : this.selectedBookId = undefined
    );
  }

  ngOnDestroy(): void {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }

  selectBook(book: Book): void {
    if (this.selectedBookId === book.id) {
      this.cancelEditing();
    } else {
      this.store.dispatch(selectBooksAction({book}));
    }
  }

  save(book: Book): void {
    this.bookService.saveBook(book).pipe(takeUntil(this.unSubscribe)).subscribe(_ => {
      this.bookService.getBooks()
        .pipe(takeUntil(this.unSubscribe))
        .subscribe(books => this.store.dispatch(setBooksAction({ books })));
      this.store.dispatch(deselectBooksAction());
    });
  }

  cancelEditing(): void {
    this.store.dispatch(deselectBooksAction());
  }

}
