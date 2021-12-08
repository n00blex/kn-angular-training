import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookListComponent} from './component/book-list/book-list.component';
import {BookService} from './service/book.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [
    BookListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [
    BookListComponent
  ],
  providers: [BookService]
})
export class BooksModule {
}
