import {Component, Input, EventEmitter, Output, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Book} from '../../model/book';
import {EditionDetailsComponent} from './edition-details/edition-details.component';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnChanges {

  readonly formGroup: FormGroup;

  @Input()
  selectedBook!: Book | null;

  @Output()
  editedBook = new EventEmitter<Book>();

  @Output()
  canceledBook = new EventEmitter();

  @ViewChild(EditionDetailsComponent, {static: true})
  set editionDetailsComponent(component: EditionDetailsComponent){
    this.formGroup.addControl('edition', component.formGroup);
  }

  constructor() {
    this.formGroup = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      author: new FormControl({
        value: '',
        disabled: false
      }, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      description: new FormControl('', [Validators.maxLength(100)])
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    if (changes.selectedBook && this.selectedBook) {
      this.formGroup.patchValue({
        title: this.selectedBook.title,
        author: this.selectedBook.author,
        description: this.selectedBook.description,
        edition: {
          publisher: this.selectedBook.edition.publisher,
          publishYear: this.selectedBook.edition.publishYear,
          editionNumber: this.selectedBook.edition.editionNumber
        }
      })
    }
  }

  save(): void {
    const rawEdition = this.formGroup.value.edition;
    const edition = {
      ...rawEdition,
      publishYear: Number.parseInt(rawEdition.publishYear, 10),
      editionNumber: Number.parseInt(rawEdition.editionNumber, 10)
    };
    this.editedBook.emit({
      ...this.selectedBook,
      ...{...this.formGroup.value, edition}
    });
  }

  cancelEditing(): void {
    this.canceledBook.emit();
  }

}
