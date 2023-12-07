import { SummaryPipe } from './summary.pipe';

describe('SummaryPipe', () => {
  let pipe: SummaryPipe;

  beforeEach(() => {
    pipe = new SummaryPipe();
  });

  it('should return null if input is null', () => {
    expect(pipe.transform()).toBeNull();
  });

  it('should truncate string if it is longer than the specified limit', () => {
    const text = 'This is a very long string that exceeds the limit';
    const result = pipe.transform(text, 10);
    expect(result).toBe('This is a ...');
  });

  it('should default to 50 characters if no limit is provided', () => {
    const text = 'This is a long string but not too long';
    const result = pipe.transform(text);
    expect(result?.length).toBeLessThanOrEqual(50);
  });

  it('should not truncate string if it is shorter than the specified limit', () => {
    const text = 'Short string';
    const result = pipe.transform(text, 50);
    expect(result).toBe(text);
  });

  it('should not append "..." if string length is equal to the limit', () => {
    const text = '1234567890'; // 10 characters
    const result = pipe.transform(text, 10);
    expect(result).toBe('1234567890');
  });
});
