import { ErrorMsgPipe } from './error-msg.pipe';

describe('ErrorMsgPipe', () => {

  let pipe = new ErrorMsgPipe();

  it('create an instance', () => {
    const pipe = new ErrorMsgPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return empty string for null values', () => {
    expect(pipe.transform(null)).toBe('');
  });

  it('should return required message for specific field', () => {
    expect(pipe.transform({ required: true}, 'foo bar')).toBe('Value for this foo bar is required.');
  });

  it('should return generic message for non-specific field', () => {
    expect(pipe.transform({ required: true})).toBe('Value for this field is required.');
  });
});
