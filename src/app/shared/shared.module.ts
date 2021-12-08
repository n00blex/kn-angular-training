import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMsgPipe } from './pipes/error-msg.pipe';
import { InputComponent } from './components/input/input.component';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    ErrorMsgPipe,
    InputComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ErrorMsgPipe,
    InputComponent
  ]
})
export class SharedModule { }
