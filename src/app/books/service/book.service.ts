import {Injectable} from '@angular/core';
import {Book} from '../model/book';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const API = '/api/books';

@Injectable()
export class BookService {

  constructor(private readonly http: HttpClient) {
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${API}`);
  }

  saveBook(book: Book): Observable<Book> {
    return this.http.put<Book>(`${API}/${book.id}`, book);
  }
}
