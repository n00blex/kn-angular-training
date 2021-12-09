import {BookListComponent} from './book-list.component';
import {BookService} from '../../service/book.service';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../../shared/shared.module';
import {ErrorMsgPipe} from '../../../shared/pipes/error-msg.pipe';
import {of} from 'rxjs';
import {Book} from '../../model/book';

describe('BookListComponent', () => {

  let component: BookListComponent;
  let bookServiceMock: any;

  const books = () => [{
    id: 1,
    title: 'Solaris',
    author: 'Stanisław Lem',
    description: 'Solaris chronicles the ultimate futility of attempted communications with the extraterrestrial life inhabiting a distant alien planet named Solaris. The planet is almost completely covered with an ocean of gel that is revealed to be a single, planet-encompassing entity. Terran scientists conjecture it is a living and a sentient being, and attempt to communicate with it.',
    edition: {
      publisher: "KN Training",
      publishYear: 2021,
      editionNumber: 1
    }
  }, {
    id: 2,
    title: '2001: A Space Odyssey',
    author: 'Aurthur C. Clarke',
    description: 'A mysterious alien civilization uses a tool with the appearance of a large crystalline monolith to investigate worlds across the galaxy and, if possible, to encourage the development of intelligent life. The book shows one such monolith appearing in prehistoric Africa, 3 million years ago (in the movie, 4 mya), where it inspires a starving group of hominids to develop tools. The hominids use their tools to kill animals and eat meat, ending their starvation. They then use the tools to kill a leopard preying on them; the next day, the main ape character, Moon-Watcher, uses a club to kill the leader of a rival tribe. The book suggests that the monolith was instrumental in awakening intelligence.',
    edition: {
      publisher: "KN Training",
      publishYear: 2021,
      editionNumber: 1
    }
  }, {
    id: 3,
    title: 'Ubik',
    author: 'Phillip K. Dick',
    description: 'By the year 1992, humanity has colonized the Moon and psychic powers are common. The protagonist, Joe Chip, is a debt-ridden technician working for Runciter Associates, a "prudence organization" employing "inertials"—people with the ability to negate the powers of telepaths and "precogs"—to enforce the privacy of clients. The company is run by Glen Runciter, assisted by his deceased wife Ella who is kept in a state of "half-life", a form of cryonic suspension that allows the deceased limited consciousness and ability to communicate. While consulting with Ella, Runciter discovers that her consciousness is being invaded by another half-lifer named Jory Miller.',
    edition: {
      publisher: "KN Training",
      publishYear: 2021,
      editionNumber: 1
    }
  }];

  beforeEach(() => {
    bookServiceMock = {
      getBooks: () => of(books()),
      saveBook: (book: Book) => of(book)
    };
  })

  describe('[class]', () => {

    beforeEach(() => {
      component = new BookListComponent(bookServiceMock);
    });

    it('should has no selected book', () => {
      expect(component.selectedBook).toBeNull();
    });

    it('should allow to select a book', () => {
      // given
      const toBeSelected = books()[1];

      // when
      component.selectBook(toBeSelected);

      // then
      expect(component.selectedBook).toEqual(toBeSelected);
    });

    it('should allow cancel', () => {
      // given
      const toBeSelected = books()[1];
      component.selectBook(toBeSelected);

      // when
      component.cancelEditing();

      // then
      expect(component.selectedBook).toBeNull();
    });
  });

  describe('[DOM]', () => {

    let fixture: ComponentFixture<BookListComponent>;
    let bookService: BookService;
    let nativeElement: HTMLElement;

    // nouns
    const bookList = () => nativeElement.querySelectorAll('li.list-group-item');
    const bookElementAt = (position: number) => bookList().item(position);
    const editor = () => nativeElement.querySelector('#editor');
    const cancelButton = () => nativeElement.querySelector('button.btn.btn-light') as HTMLButtonElement;
    const saveButton = () => nativeElement.querySelector('button.btn.btn-primary') as HTMLButtonElement;
    const title = () => nativeElement.querySelector('input#title') as HTMLInputElement;
    const author = () => nativeElement.querySelector('input#author') as HTMLInputElement;
    const description = () => nativeElement.querySelector('textarea#description') as HTMLTextAreaElement;
    // verbs
    const clickBookAt = (position: number) => bookElementAt(position).dispatchEvent(new MouseEvent('click'));
    const clickCancel = () => cancelButton().dispatchEvent(new MouseEvent('click'));
    const clickSave = () => saveButton().dispatchEvent(new MouseEvent('click'));
    const editField = (field: HTMLInputElement | HTMLTextAreaElement, value: string) => {
      field.value = value;
      field.dispatchEvent(new Event('input'));
    };

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [BookListComponent, ErrorMsgPipe],
        imports: [ReactiveFormsModule, SharedModule],
        providers: [{provide: BookService, useValue: bookServiceMock}]
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(BookListComponent);
      bookService = TestBed.inject(BookService)
      // bookService = fixture.debugElement.injector.get(BookService); // only needed if you provide Service in Component
      component = fixture.componentInstance;
      nativeElement = fixture.nativeElement;
      fixture.detectChanges();
    });

    it('should create component', () => {
      expect(component).toBeTruthy();
    });

    it('should render a list of books', () => {
      const liElements = bookList();
      expect(liElements.length).toBe(3);
    });

    it('should select book on clicking', () => {
      // given
      expect(component.selectedBook).toBeNull();
      expect(editor()).toBeFalsy();
      // when
      clickBookAt(1);
      fixture.detectChanges();
      // then
      expect(editor()).toBeTruthy();
      let selectedBook = books()[1];
      expect(component.selectedBook).toEqual(selectedBook);
      expect(title().value).toEqual(selectedBook.title);
      expect(author().value).toEqual(selectedBook.author);
      expect(description().value).toEqual(selectedBook.description);
      expect(bookElementAt(1).classList).toContain('selected');
    });

    it('should close editor after clicking on selected book', () => {
      // given
      clickBookAt(1);
      fixture.detectChanges();
      // when
      clickBookAt(1);
      fixture.detectChanges();
      // then
      expect(editor()).toBeFalsy();
      expect(component.selectedBook).toBeNull();
    });

    it('should close editor after clicking on cancel', () => {
      // given
      clickBookAt(1);
      fixture.detectChanges();
      // when
      clickCancel();
      fixture.detectChanges();
      // then
      expect(editor()).toBeFalsy();
      expect(component.selectedBook).toBeNull();
    });

    it('should close editor after clicking on save', () => {
      // given
      spyOn(bookService, 'saveBook').and.callThrough();
      clickBookAt(1);
      fixture.detectChanges()
      expect(editor()).toBeTruthy();

      // when
      editField(title(), 'Foo');
      editField(author(), 'Bar');
      editField(description(), 'Some description');
      fixture.detectChanges();
      clickSave();
      fixture.detectChanges();

      // then
      expect(editor()).toBeFalsy();
      expect(bookService.saveBook).toHaveBeenCalledOnceWith({
        id: 2,
        title: 'Foo',
        author: 'Bar',
        description: 'Some description',
        edition: {
          publisher: "KN Training",
          publishYear: 2021,
          editionNumber: 1
        }
      });
    });
  });

});
