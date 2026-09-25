import type { ContentApiClient } from '@maw/content-sdk';
import {
  fetchSupportedLanguages,
  fetchSupportedLocaleMeta,
  getSupportedLanguages,
} from './get-supported-locales';

function createClient(
  list: (...args: unknown[]) => Promise<unknown>,
): ContentApiClient {
  return {
    locales: {
      list,
    },
  } as unknown as ContentApiClient;
}

describe('supported locales', () => {
  it('returns the bundled languages synchronously', () => {
    const languages = getSupportedLanguages();

    expect(languages.find((language) => language.locale === 'en')).toEqual({
      locale: 'en',
      flag: '🇺🇸',
      label: 'English',
    });
  });

  it('maps locale metadata returned by the Content API', async () => {
    const client = createClient(async () => ({
      items: [
        {
          code: 'en',
          lang: 'en',
          name: 'English',
          native_name: 'English (API)',
          dir: 'ltr',
        },
      ],
    }));

    const meta = await fetchSupportedLocaleMeta(client);

    expect(meta.en).toEqual({ flag: '🇺🇸', label: 'English (API)' });
  });

  it('falls back to bundled metadata when the API fails', async () => {
    const client = createClient(async () => {
      throw new Error('network down');
    });

    const meta = await fetchSupportedLocaleMeta(client);

    expect(meta.en).toEqual({ flag: '🇺🇸', label: 'English' });
  });

  it('generates the bundled English-only list when the API fails', async () => {
    const client = createClient(async () => {
      throw new Error('network down');
    });

    const languages = await fetchSupportedLanguages(client);

    expect(languages).toEqual([{ locale: 'en', flag: '🇺🇸', label: 'English' }]);
  });
});
