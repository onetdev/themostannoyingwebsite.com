import { trimLeadingSlashes, trimTrailingSlashes } from './url';

describe('trimTrailingSlashes', () => {
  it.each([
    ['https://example.com/', 'https://example.com'],
    ['https://example.com///', 'https://example.com'],
    ['https://example.com/path/', 'https://example.com/path'],
    ['https://example.com', 'https://example.com'],
    ['/', ''],
    ['///', ''],
    ['', ''],
  ])('turns %p into %p', (input, expected) => {
    expect(trimTrailingSlashes(input)).toBe(expected);
  });
});

describe('trimLeadingSlashes', () => {
  it.each([
    ['/api/v1', 'api/v1'],
    ['///api/v1', 'api/v1'],
    ['api/v1', 'api/v1'],
    ['/', ''],
    ['///', ''],
    ['', ''],
  ])('turns %p into %p', (input, expected) => {
    expect(trimLeadingSlashes(input)).toBe(expected);
  });
});
