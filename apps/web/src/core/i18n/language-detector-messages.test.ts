import type { ContentApiClient } from '@maw/content-sdk';
import enMessages from '@/i18n/messages/en';
import {
  fetchAllLanguageDetectorMessages,
  fetchLanguageDetectorMessages,
} from './language-detector-messages';

const FALLBACK = enMessages.languageDetector;

function createClient(
  getByLang: (...args: unknown[]) => Promise<unknown>,
): ContentApiClient {
  return {
    translations: {
      getByLang,
    },
  } as unknown as ContentApiClient;
}

describe('fetchLanguageDetectorMessages', () => {
  it('returns the bundled English copy for en without hitting the API', async () => {
    const getByLang = jest.fn();
    const client = createClient(getByLang);

    const messages = await fetchLanguageDetectorMessages('en', client);

    expect(messages).toEqual(FALLBACK);
    expect(getByLang).not.toHaveBeenCalled();
  });

  it('merges API copy over the English fallback', async () => {
    const client = createClient(async () => ({
      messages: { detected: 'Magyarul olvasnád?', switch: 'Váltás magyarra' },
    }));

    const messages = await fetchLanguageDetectorMessages('hu', client);

    expect(messages.detected).toBe('Magyarul olvasnád?');
    expect(messages.switch).toBe('Váltás magyarra');
    // `stay` is missing remotely, so English remains as the fallback.
    expect(messages.stay).toBe(FALLBACK.stay);
  });

  it('drops malformed API entries and keeps the English fallback', async () => {
    const client = createClient(async () => ({
      messages: { detected: 42, switch: '   ', stay: 'Maradok magyarul' },
    }));

    const messages = await fetchLanguageDetectorMessages('hu', client);

    expect(messages.detected).toBe(FALLBACK.detected);
    expect(messages.switch).toBe(FALLBACK.switch);
    expect(messages.stay).toBe('Maradok magyarul');
  });

  it('falls back to English when the namespace is missing', async () => {
    const client = createClient(async () => {
      throw new Error('404');
    });

    const messages = await fetchLanguageDetectorMessages('de', client);

    expect(messages).toEqual(FALLBACK);
  });
});

describe('fetchAllLanguageDetectorMessages', () => {
  it('returns a map keyed by locale', async () => {
    const client = createClient(async (lang) => ({
      messages: { detected: `read in ${String(lang)}` },
    }));

    const map = await fetchAllLanguageDetectorMessages(['en', 'de'], client);

    expect(map.en).toEqual(FALLBACK);
    expect(map.de.detected).toBe('read in de');
    expect(map.de.stay).toBe(FALLBACK.stay);
  });
});
