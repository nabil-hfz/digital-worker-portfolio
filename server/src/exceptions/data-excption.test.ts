import { Errors } from '../utils/errors';
import { DataException, InvalidDataException } from './data-excption';

describe('DataException', () => {
  it('should correctly assign properties', () => {
    const errorCode = 'ERROR_CODE';
    const message = 'Error message';
    const details = { detail: 'some detail' };

    const exception = new DataException(errorCode, message, details);

    expect(exception.errorCode).toBe(errorCode);
    expect(exception.message).toBe(message);
    expect(exception.details).toEqual(details);
  });

  it('should return correct string representation', () => {
    const errorCode = 'ERROR_CODE';
    const message = 'Error message';
    const exception = new DataException(errorCode, message);

    const expectedString = JSON.stringify(exception);
    expect(exception.toString()).toBe(expectedString);
  });
});

describe('InvalidDataException', () => {
  it('should inherit from DataException', () => {
    const exception = new InvalidDataException();
    expect(exception).toBeInstanceOf(DataException);
  });

  it('should have correct default properties', () => {
    const details = { detail: 'some detail' };
    const exception = new InvalidDataException(details);

    expect(exception.errorCode).toBe(Errors.INVALID_DATA);
    expect(exception.message).toBe("The data is invalid");
    expect(exception.details).toEqual(details);
  });
});
