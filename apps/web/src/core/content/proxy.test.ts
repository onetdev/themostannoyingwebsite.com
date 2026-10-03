import {
  buildContentApiProxyUrl,
  CONTENT_API_BASE_URL,
  isContentApiProxyEnabled,
  resolveContentApiBaseUrl,
} from './proxy';

describe('resolveContentApiBaseUrl', () => {
  it('defaults to the production Content API when unconfigured', () => {
    expect(resolveContentApiBaseUrl(undefined)).toBe(CONTENT_API_BASE_URL);
  });

  it('strips trailing slashes from the configured URL', () => {
    expect(resolveContentApiBaseUrl('https://api.example.com//')).toBe(
      'https://api.example.com',
    );
  });
});

describe('buildContentApiProxyUrl', () => {
  it('joins path segments and preserves the query string', () => {
    const target = buildContentApiProxyUrl(
      ['api', 'v1', 'search'],
      '?q=test&type=article',
      CONTENT_API_BASE_URL,
    );

    expect(target.toString()).toBe(
      'https://content.themostannoyingwebsite.com/api/v1/search?q=test&type=article',
    );
  });

  it('drops empty segments left by a trailing slash', () => {
    const target = buildContentApiProxyUrl(
      ['api', 'v1', 'search', ''],
      '?q=test',
      CONTENT_API_BASE_URL,
    );

    expect(target.toString()).toBe(
      'https://content.themostannoyingwebsite.com/api/v1/search?q=test',
    );
  });
});

describe('isContentApiProxyEnabled', () => {
  it('is enabled in development', () => {
    expect(isContentApiProxyEnabled('development')).toBe(true);
  });

  it.each(['production', 'test', 'staging'])(
    'is disabled in the %s environment',
    (environment) => {
      expect(isContentApiProxyEnabled(environment)).toBe(false);
    },
  );
});
