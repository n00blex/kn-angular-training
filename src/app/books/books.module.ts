import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookListComponent} from './component/book-list/book-list.component';
import {BookService} from './service/book.service';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {HttpClientModule} from '@angular/common/http';
import { BookDetailsComponent } from './component/book-details/book-details.component';
import { EditionDetailsComponent } from './component/book-details/edition-details/edition-details.component';

@NgModule({
  declarations: [
    BookListComponent,
    BookDetailsComponent,
    EditionDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    BookListComponent,
    BookDetailsComponent
  ],
  providers: [BookService]
})
export class BooksModule {
}
