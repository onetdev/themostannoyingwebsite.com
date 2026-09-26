import {
  absoluteAssetUrl,
  absoluteUrl,
  localeSiteId,
  normalizeBaseUrl,
  siteId,
} from './absolute-url';

describe('normalizeBaseUrl', () => {
  it('strips trailing slashes', () => {
    expect(normalizeBaseUrl('https://example.com///')).toBe(
      'https://example.com',
    );
  });
});

describe('absoluteUrl', () => {
  it('builds a locale-prefixed trailing-slashed url', () => {
    expect(absoluteUrl('https://example.com', 'en', 'articles/hello')).toBe(
      'https://example.com/en/articles/hello/',
    );
  });

  it('builds the locale root when no path is given', () => {
    expect(absoluteUrl('https://example.com', 'hu')).toBe(
      'https://example.com/hu/',
    );
  });

  it('normalizes slash noise', () => {
    expect(absoluteUrl('https://example.com/', 'de', '/about/')).toBe(
      'https://example.com/de/about/',
    );
  });

  it('encodes path segments', () => {
    expect(
      absoluteUrl('https://example.com', 'en', 'articles/hello world'),
    ).toBe('https://example.com/en/articles/hello%20world/');
  });
});

describe('absoluteAssetUrl', () => {
  it('keeps absolute urls untouched', () => {
    expect(
      absoluteAssetUrl('https://example.com', 'https://cdn.example.com/a.png'),
    ).toBe('https://cdn.example.com/a.png');
  });

  it('keeps protocol-relative and non-http scheme urls untouched', () => {
    expect(
      absoluteAssetUrl('https://example.com', '//cdn.example.com/a.png'),
    ).toBe('//cdn.example.com/a.png');
    expect(
      absoluteAssetUrl('https://example.com', 'data:image/png;base64,AAA'),
    ).toBe('data:image/png;base64,AAA');
  });

  it('joins root-relative asset paths', () => {
    expect(absoluteAssetUrl('https://example.com/', '/assets/a.png')).toBe(
      'https://example.com/assets/a.png',
    );
  });

  it('normalizes relative asset paths', () => {
    expect(absoluteAssetUrl('https://example.com', 'assets/a.png')).toBe(
      'https://example.com/assets/a.png',
    );
  });
});

describe('siteId', () => {
  it('builds stable fragment ids', () => {
    expect(siteId('https://example.com/', 'organization')).toBe(
      'https://example.com/#organization',
    );
  });
});

describe('localeSiteId', () => {
  it('builds a stable localized website id', () => {
    expect(localeSiteId('https://example.com', 'en')).toBe(
      'https://example.com/en/#website',
    );
  });
});
