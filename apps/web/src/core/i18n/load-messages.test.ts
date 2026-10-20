import type { ContentApiClient } from '@maw/content-sdk';
import enMessages from '@/i18n/messages/en';
import {
  isParseableMessage,
  loadMessages,
  mergeMessages,
} from './load-messages';

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

describe('isParseableMessage', () => {
  it('accepts tag-free and well-formed ICU messages', () => {
    expect(isParseableMessage('plain text')).toBe(true);
    expect(isParseableMessage('<the>the</the> <most>Most</most>')).toBe(true);
    expect(isParseableMessage('<br></br>')).toBe(true);
    expect(isParseableMessage('reach us at <linkTag>{email}</linkTag>')).toBe(
      true,
    );
  });

  it('rejects malformed ICU messages', () => {
    expect(isParseableMessage('<the>irritating</most>')).toBe(false);
    expect(isParseableMessage('<linkTag>GitHub')).toBe(false);
    expect(isParseableMessage('{count, plural, one {# item}')).toBe(false);
  });
});

describe('mergeMessages validation', () => {
  it('drops unparseable remote messages and reports their key paths', () => {
    const dropped: string[] = [];
    const result = mergeMessages(
      { common: { app: { logoAlt: 'base alt', logoShort: 'base short' } } },
      {
        common: {
          app: {
            logoAlt: '<the>irritating</most>',
            logoShort: '<the>MAW</the>',
          },
        },
      },
      dropped,
    );

    expect(dropped).toEqual(['common.app.logoAlt']);
    expect(result).toEqual({
      common: { app: { logoAlt: 'base alt', logoShort: '<the>MAW</the>' } },
    });
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
      messages: { common: { navigation: { about: 'Über' } } },
    }));

    const messages = await loadMessages('de', client);

    expect(asTree(asTree(messages.common).navigation).about).toBe('Über');
    // Keys missing from the API response still fall back to English.
    expect(asTree(asTree(messages.common).navigation).home).toBe(
      enMessages.common.navigation.home,
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

  it('drops malformed remote rich-text messages and falls back to English', async () => {
    const onInvalidMessages = jest.fn();
    const client = createClient(async () => ({
      messages: { common: { app: { logoAlt: '<the>irytująca</most>' } } },
    }));

    const messages = await loadMessages(
      'pl',
      client,
      undefined,
      onInvalidMessages,
    );

    expect(onInvalidMessages).toHaveBeenCalledWith(['common.app.logoAlt']);
    expect(asTree(asTree(messages.common).app).logoAlt).toBe(
      enMessages.common.app.logoAlt,
    );
  });
});
