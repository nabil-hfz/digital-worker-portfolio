import { buildImageUrl, getFilenameFromImageUrl } from "./url-builders";

describe('buildImageUrl', () => {
  it('should correctly build the image URL', () => {
    const mockReq = {
      protocol: 'http',
      get: jest.fn().mockReturnValue('example.com'),
    };
    const filename = 'image.jpg';

    const url = buildImageUrl(mockReq as any, filename);

    expect(url).toBe('http://example.com/uploads/image.jpg');
    expect(mockReq.get).toHaveBeenCalledWith('host');
  });
});

describe('getFilenameFromImageUrl', () => {
  it('should extract the filename from a URL', () => {
    const imageUrl = 'http://example.com/uploads/image.jpg';
    const filename = getFilenameFromImageUrl(imageUrl);

    expect(filename).toBe('image.jpg');
  });

  it('should return an empty string if no filename is present', () => {
    const imageUrl = 'http://example.com/uploads/';
    const filename = getFilenameFromImageUrl(imageUrl);

    expect(filename).toBe('');
  });
});
