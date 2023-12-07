import { AbsoluteUrlPipe } from "./url.pipe";

describe('AbsoluteUrlPipe', () => {
  let pipe: AbsoluteUrlPipe;

  beforeEach(() => {
    pipe = new AbsoluteUrlPipe();
  });

  it('should prepend http:// to a URL that does not start with http:// or https://', () => {
    const url = 'www.example.com';
    expect(pipe.transform(url)).toEqual('http://' + url);
  });

  it('should not modify a URL that already starts with http://', () => {
    const url = 'http://www.example.com';
    expect(pipe.transform(url)).toEqual(url);
  });

  it('should not modify a URL that already starts with https://', () => {
    const url = 'https://www.example.com';
    expect(pipe.transform(url)).toEqual(url);
  });

});
