import type { ContentApiClient } from '@maw/content-sdk';
import enMessages from '@/i18n/messages/en';
import { loadMessages, mergeMessages } from './load-messages';

function createClient(
  getByLang: (...args: unknown[]) => Promise<unknown>,
): ContentApiClient {
  return {
    translations: {
      getByLang,
    },
  } as unknown as ContentApiClient;
}

const asTree = (value: unknown): Record<string, string> =>
  value as Record<string, string>;

describe('mergeMessages', () => {
  it('deep-merges nested trees and lets the override win', () => {
    const result = mergeMessages(
      { a: { b: 'base', c: 'keep' }, d: 'base' },
      { a: { b: 'remote' }, d: 'remote' },
    );

    expect(result).toEqual({
      a: { b: 'remote', c: 'keep' },
      d: 'remote',
    });
  });

  it('ignores nullish override values and replaces arrays', () => {
    const result = mergeMessages(
      { a: 'base', list: ['en'] },
      { a: null, list: ['de'] },
    );

    expect(result).toEqual({ a: 'base', list: ['de'] });
  });
});

describe('loadMessages', () => {
  it('returns the bundled English bundle for en without hitting the API', async () => {
    const getByLang = jest.fn();
    const client = createClient(getByLang);

    const messages = await loadMessages('en', client);

    expect(messages).toBe(enMessages);
    expect(getByLang).not.toHaveBeenCalled();
  });

  it('merges API messages over the English bundle', async () => {
    const client = createClient(async () => ({
      messages: { navigation: { about: 'Über' } },
    }));

    const messages = await loadMessages('de', client);

    expect(asTree(messages.navigation).about).toBe('Über');
    // Keys missing from the API response still fall back to English.
    expect(asTree(messages.navigation).home).toBe(
      asTree(enMessages.navigation).home,
    );
  });

  it('falls back to the English bundle and reports when the API fails', async () => {
    const onFallback = jest.fn();
    const client = createClient(async () => {
      throw new Error('network down');
    });

    const messages = await loadMessages('de', client, onFallback);

    expect(messages).toEqual(enMessages);
    expect(onFallback).toHaveBeenCalledTimes(1);
    expect(onFallback.mock.calls[0][0]).toBeInstanceOf(Error);
  });
});
