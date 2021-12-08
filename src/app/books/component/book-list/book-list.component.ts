import {Component} from '@angular/core';
import {Book} from '../../model/book';
import {BookService} from '../../service/book.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent {

  books: Book[] = [];
  selectedBook: Book | null = null;
  readonly formGroup: FormGroup;

  constructor(private readonly bookService: BookService) {
    this.books = this.bookService.getBooks();
    this.formGroup = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      author: new FormControl({
        value: '',
        disabled: false
      }, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      description: new FormControl('', [Validators.maxLength(100)])
    })
  }

  selectBook(book: Book): void {
    if (this.selectedBook?.id === book.id) {
      this.selectedBook = null;
    } else {
      this.selectedBook = book;
      this.formGroup.reset({
        title: this.selectedBook.title,
        author: this.selectedBook.author,
        description: this.selectedBook.description,
      })
    }
  }

  save(): void {
    if (this.selectedBook) {
      this.bookService.saveBook({...this.selectedBook, ...this.formGroup.value});
      this.selectedBook = null;
      this.books = this.bookService.getBooks();
    }
  }

  cancelEditing(): void {
    this.selectedBook = null;
  }

}
