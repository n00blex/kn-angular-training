export const errorToMessage = (errorKey: string, errorData: any, fieldName?: string) => {
  const field = fieldName ? fieldName : 'field';
  switch (errorKey) {
    case 'required':
      return `Value for this ${field} is required.`
    case 'maxlength':
      return `Value for this ${field} is ${errorData.actualLength} which exceeds ${errorData.requiredLength} limit.`
    case 'minlength':
      return `Value for this ${field} is ${errorData.actualLength}, but the field should be ${errorData.requiredLength} characters at least.`
  }
  return '';
}
