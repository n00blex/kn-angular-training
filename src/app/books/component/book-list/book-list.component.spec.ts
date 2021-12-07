import {BookListComponent} from './book-list.component';
import {BookService} from '../../service/book.service';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

describe('BookListComponent', () => {

  let component: BookListComponent;

  describe('[class]', () => {
    let bookService: BookService;

    beforeEach(() => {
      bookService = new BookService();
      component = new BookListComponent(bookService);
    });

    it('should has no selected book', () => {
      expect(component.selectedBook).toBeNull();
    });

    it('should has books', () => {
      expect(component.books).toHaveSize(3);
    });

    it('should allow to select a book', () => {
      // given
      const toBeSelected = component.books[1];

      // when
      component.selectBook(toBeSelected);

      // then
      expect(component.selectedBook).toEqual(toBeSelected);
    });

    it('should allow cancel', () => {
      // given
      const toBeSelected = component.books[1];
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
    const editField = (field: HTMLInputElement | HTMLTextAreaElement, value: string) => field.value = value;

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [BookListComponent],
        providers: [BookService]
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
      let selectedBook = component.books[1];
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

    it('should close editor after clicking on selected book', () => {
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

    it('should close editor after clicking on selected book', () => {
      // given
      spyOn(bookService, 'saveBook').and.callThrough();
      clickBookAt(1);
      fixture.detectChanges()
      expect(editor()).toBeTruthy();

      // when
      editField(title(), 'Foo');
      editField(author(), 'Bar');
      editField(description(), 'Some description');
      clickSave();
      fixture.detectChanges();

      // then
      expect(editor()).toBeFalsy();
      expect(bookService.saveBook).toHaveBeenCalledOnceWith({
        id: 2,
        title: 'Foo',
        author: 'Bar',
        description: 'Some description'
      });
      expect(component.books[1].title).toBe('Foo');
      expect(component.books[1].author).toBe('Bar');
      expect(component.books[1].description).toBe('Some description');
    });
  });

});
