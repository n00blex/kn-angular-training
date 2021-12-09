import {Component, OnDestroy} from '@angular/core';
import {Book} from '../../model/book';
import {BookService} from '../../service/book.service';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnDestroy {

  books$: Observable<Book[]>;
  selectedBook: Book | null = null;

  private readonly unSubscribe = new Subject();

  constructor(private readonly bookService: BookService) {
    this.books$ = this.bookService.getBooks();
  }

  ngOnDestroy(): void {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }

  selectBook(book: Book): void {
    if (this.selectedBook?.id === book.id) {
      this.selectedBook = null;
    } else {
      this.selectedBook = book;
    }
  }

  save(book: Book): void {
    if (this.selectedBook) {
      this.bookService.saveBook({...this.selectedBook, ...book})
        .pipe(takeUntil(this.unSubscribe))
        .subscribe(_ => {
          this.selectedBook = null;
          this.books$ = this.bookService.getBooks();
        });
    }
  }

  cancelEditing(): void {
    this.selectedBook = null;
  }

}
