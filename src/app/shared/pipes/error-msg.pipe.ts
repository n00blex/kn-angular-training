import {Pipe, PipeTransform} from '@angular/core';
import {ValidationErrors} from '@angular/forms';
import {errorToMessage} from '../util/error-util';

@Pipe({
  name: 'errorMsg'
})
export class ErrorMsgPipe implements PipeTransform {

  transform(validationErrors: ValidationErrors | null | undefined, fieldName?: string): string {
    if (validationErrors) {
      const errorKeys = Object.keys(validationErrors);
      return errorKeys.map(key => errorToMessage(key, validationErrors[key], fieldName)).join('')
    }
    return '';
  }

}
