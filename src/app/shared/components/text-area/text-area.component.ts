import {Component, ElementRef, Input, Optional, Self, ViewChild} from '@angular/core';
import {ControlValueAccessor, NgControl} from '@angular/forms';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent implements ControlValueAccessor {

  @Input()
  mandatory = false;

  @Input()
  title = '';

  @Input()
  inputId = '';

  @Input()
  name = '';

  @Input()
  numberOfRows = 1;

  @ViewChild('valueText', {static: true})
  textAreaElement!: ElementRef;

  constructor(@Optional() @Self() public control: NgControl) {
    if (this.control) {
      this.control.valueAccessor = this;
    }
  }

  private onChangeFn: (value: string) => void = (_) => {
  };

  private onTouchedFn: () => void = () => {
  };

  writeValue(value: string): void {
    this.textAreaElement.nativeElement.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  performOnTouched(): void {
    this.onTouchedFn();
  }

  performOnChanged() {
    this.onChangeFn(this.textAreaElement.nativeElement.value);
  }

}
