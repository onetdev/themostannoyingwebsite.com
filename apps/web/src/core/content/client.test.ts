import { createContentClient } from '@maw/content-sdk';
import {
  CONTENT_API_DEV_PROXY_PATH,
  createAppContentClient,
  resolveAppContentApiBaseUrl,
} from './client';

jest.mock('@maw/content-sdk', () => ({
  createContentClient: jest.fn(() => ({})),
}));

const createContentClientMock = jest.mocked(createContentClient);

describe('resolveAppContentApiBaseUrl', () => {
  it('returns the same-origin dev proxy path in the browser during development', () => {
    expect(resolveAppContentApiBaseUrl('development', true)).toBe(
      CONTENT_API_DEV_PROXY_PATH,
    );
  });

  it('returns undefined on the server even during development', () => {
    expect(resolveAppContentApiBaseUrl('development', false)).toBeUndefined();
  });

  it.each(['production', 'test', 'staging'])(
    'returns undefined in the browser for the %s environment',
    (environment) => {
      expect(resolveAppContentApiBaseUrl(environment, true)).toBeUndefined();
    },
  );
});

describe('createAppContentClient', () => {
  beforeEach(() => {
    createContentClientMock.mockClear();
  });

  it('targets the dev proxy in the browser during development', () => {
    createAppContentClient('development', true);

    expect(createContentClientMock).toHaveBeenCalledWith({
      baseUrl: CONTENT_API_DEV_PROXY_PATH,
    });
  });

  it('lets the SDK resolve the default base URL on the server', () => {
    createAppContentClient('development', false);

    expect(createContentClientMock).toHaveBeenCalledWith({
      baseUrl: undefined,
    });
  });

  it('lets the SDK resolve the default base URL in production', () => {
    createAppContentClient('production', true);

    expect(createContentClientMock).toHaveBeenCalledWith({
      baseUrl: undefined,
    });
  });
});
