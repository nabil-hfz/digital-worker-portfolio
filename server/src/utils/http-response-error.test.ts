import { ErrorResponseBody, HttpResponseError } from "./http-response-error";


describe('HttpResponseError', () => {
  it('should create an instance with default parameters', () => {
    const error = new HttpResponseError(400);

    expect(error.status).toBe(400);
    expect(error.code).toBe('UNKNOWN');
    expect(error.description).toBe('An error occurred with status "400" and code "UNKNOWN"');
    expect(error.internalLog).toBe('An error occurred with status "400" and code "UNKNOWN"');
    expect(error.message).toBe('(HttpResponseError) status: "400" code: "UNKNOWN" description: "An error occurred with status "400" and code "UNKNOWN""');
  });

  it('should create an instance with custom parameters', () => {
    const error = new HttpResponseError(404, 'NOT_FOUND', 'Resource not found', 'Custom internal log');

    expect(error.status).toBe(404);
    expect(error.code).toBe('NOT_FOUND');
    expect(error.description).toBe('Resource not found');
    expect(error.internalLog).toBe('Custom internal log');
    expect(error.message).toBe('(HttpResponseError) status: "404" code: "NOT_FOUND" description: "Resource not found"');
  });

  it('should throw an error for invalid status codes', () => {
    expect(() => new HttpResponseError(200)).toThrow('HttpResponseError: invalid error, status is "200"');
  });
});




describe('ErrorResponseBody', () => {
  it('should create an instance correctly', () => {
    const errorInfo = {
      status: 500,
      code: 'INTERNAL_ERROR',
      description: 'An internal error occurred',
      internal: 'Internal server error'
    };
    const errorResponse = new ErrorResponseBody(errorInfo);

    expect(errorResponse.error).toEqual(errorInfo);
  });
});
