import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Book} from '../../model/book';
import {BookService} from '../../service/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  // providers: [BookService]
})
export class BookListComponent {

  books: Book[] = [];
  selectedBook: Book | null = null;

  @ViewChild('title', {static: false})
  titleInputComponent!: ElementRef;

  @ViewChild('author', {static: false})
  authorInputComponent!: ElementRef;

  @ViewChild('description', {static: false})
  descriptionTextAreaComponent!: ElementRef;

  constructor(private readonly bookService: BookService) {
    this.books = this.bookService.getBooks();
  }

  selectBook(book: Book): void {
    if (this.selectedBook === book) {
      this.selectedBook = null;
    } else {
      this.selectedBook = book;
    }
  }

  save(): void {
    if (this.selectedBook) {
      const updatedBook: Book = {
        id: this.selectedBook.id,
        title: this.titleInputComponent.nativeElement.value,
        author: this.authorInputComponent.nativeElement.value,
        description: this.descriptionTextAreaComponent.nativeElement.value
      }
      this.bookService.saveBook(updatedBook);
      this.selectedBook = null;
      this.books = this.bookService.getBooks();
    }
  }

  cancelEditing(): void {
    this.selectedBook = null;
  }
}
