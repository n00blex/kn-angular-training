import {Injectable} from '@angular/core';
import {Book} from '../model/book';

const copyBook = (book: Book) => ({...book});

@Injectable()
export class BookService {

  private books: Book[] = [{
    id: 1,
    title: 'Solaris',
    author: 'Stanisław Lem',
    description: 'Solaris chronicles the ultimate futility of attempted communications with the extraterrestrial life inhabiting a distant alien planet named Solaris. The planet is almost completely covered with an ocean of gel that is revealed to be a single, planet-encompassing entity. Terran scientists conjecture it is a living and a sentient being, and attempt to communicate with it.'
  }, {
    id: 2,
    title: '2001: A Space Odyssey',
    author: 'Aurthur C. Clarke',
    description: 'A mysterious alien civilization uses a tool with the appearance of a large crystalline monolith to investigate worlds across the galaxy and, if possible, to encourage the development of intelligent life. The book shows one such monolith appearing in prehistoric Africa, 3 million years ago (in the movie, 4 mya), where it inspires a starving group of hominids to develop tools. The hominids use their tools to kill animals and eat meat, ending their starvation. They then use the tools to kill a leopard preying on them; the next day, the main ape character, Moon-Watcher, uses a club to kill the leader of a rival tribe. The book suggests that the monolith was instrumental in awakening intelligence.'
  }, {
    id: 3,
    title: 'Ubik',
    author: 'Phillip K. Dick',
    description: 'By the year 1992, humanity has colonized the Moon and psychic powers are common. The protagonist, Joe Chip, is a debt-ridden technician working for Runciter Associates, a "prudence organization" employing "inertials"—people with the ability to negate the powers of telepaths and "precogs"—to enforce the privacy of clients. The company is run by Glen Runciter, assisted by his deceased wife Ella who is kept in a state of "half-life", a form of cryonic suspension that allows the deceased limited consciousness and ability to communicate. While consulting with Ella, Runciter discovers that her consciousness is being invaded by another half-lifer named Jory Miller.'
  }];

  constructor() {
  }

  getBooks(): Book[] {
    return this.books.map(copyBook);
  }

  saveBook(book: Book): void {
    this.books = this.books.map(value => value.id === book.id ? copyBook(book) : value);
  }
}