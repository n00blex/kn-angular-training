import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookListComponent} from './component/book-list/book-list.component';
import {BookService} from './service/book.service';


@NgModule({
  declarations: [
    BookListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BookListComponent
  ],
  providers: [BookService]
})
export class BooksModule {
}
