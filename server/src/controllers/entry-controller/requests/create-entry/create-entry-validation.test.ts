import { HttpResponseError } from '../../../../utils/http-response-error';
import { CreateEntryReqBody } from './create-entry-req-body';
import { checkIfIsValidCreateEntryReqBody } from './create-entry-validation';

describe('checkIfIsValidCreateEntryReqBody', () => {
  it('should not throw an error for a valid request body', () => {
    const validBody: CreateEntryReqBody = {
      title: 'Valid Title',
      customerLink: 'http://valid-link.com'
    };

    expect(() => checkIfIsValidCreateEntryReqBody(validBody)).not.toThrow();
  });

  it('should throw an error when title is missing', () => {
    const invalidBody: CreateEntryReqBody = {
      // title is missing
      customerLink: 'http://valid-link.com'
    };

    expect(() => checkIfIsValidCreateEntryReqBody(invalidBody)).toThrow(HttpResponseError);
    expect(() => checkIfIsValidCreateEntryReqBody(invalidBody)).toThrow('No "title" defined');
  });

  it('should throw an error when title is empty', () => {
    const invalidBody: CreateEntryReqBody = {
      title: '', // empty title
      customerLink: 'http://valid-link.com'
    };

    expect(() => checkIfIsValidCreateEntryReqBody(invalidBody)).toThrow(HttpResponseError);
    expect(() => checkIfIsValidCreateEntryReqBody(invalidBody)).toThrow('No "title" defined');
  });

  it('should throw an error when customerLink is missing', () => {
    const invalidBody: CreateEntryReqBody = {
      title: 'Valid Title'
      // customerLink is missing
    };

    expect(() => checkIfIsValidCreateEntryReqBody(invalidBody)).toThrow(HttpResponseError);
    expect(() => checkIfIsValidCreateEntryReqBody(invalidBody)).toThrow('No "customer Link" defined');
  });

  it('should throw an error when customerLink is empty', () => {
    const invalidBody: CreateEntryReqBody = {
      title: 'Valid Title',
      customerLink: '' // empty customerLink
    };

    expect(() => checkIfIsValidCreateEntryReqBody(invalidBody)).toThrow(HttpResponseError);
    expect(() => checkIfIsValidCreateEntryReqBody(invalidBody)).toThrow('No "customer Link" defined');
  });
});
