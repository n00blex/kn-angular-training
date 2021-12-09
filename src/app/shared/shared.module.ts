import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ErrorMsgPipe} from './pipes/error-msg.pipe';
import {InputComponent} from './components/input/input.component';
import {TextAreaComponent} from './components/text-area/text-area.component';

@NgModule({
  declarations: [
    ErrorMsgPipe,
    InputComponent,
    TextAreaComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ErrorMsgPipe,
    InputComponent,
    TextAreaComponent
  ]
})
export class SharedModule {
}
