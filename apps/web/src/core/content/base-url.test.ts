import { CONTENT_API_BASE_URL, resolveContentApiBaseUrl } from './base-url';

// The default-resolution assertions expect CONTENT_API_BASE_URL, so an ambient
// NEXT_PUBLIC_API_URL (e.g. from a local .envrc) must not leak in.
const originalContentApiUrl = process.env.NEXT_PUBLIC_API_URL;

beforeEach(() => {
  delete process.env.NEXT_PUBLIC_API_URL;
});

afterAll(() => {
  if (originalContentApiUrl !== undefined) {
    process.env.NEXT_PUBLIC_API_URL = originalContentApiUrl;
  }
});

describe('resolveContentApiBaseUrl', () => {
  it('defaults to the production Content API when unconfigured', () => {
    expect(resolveContentApiBaseUrl(undefined)).toBe(CONTENT_API_BASE_URL);
  });

  it.each(['', '   '])(
    'falls back to the production Content API for an empty value (%p)',
    (configured) => {
      expect(resolveContentApiBaseUrl(configured)).toBe(CONTENT_API_BASE_URL);
    },
  );

  it('strips trailing slashes from the configured URL', () => {
    expect(resolveContentApiBaseUrl('https://api.example.com//')).toBe(
      'https://api.example.com',
    );
  });
});
