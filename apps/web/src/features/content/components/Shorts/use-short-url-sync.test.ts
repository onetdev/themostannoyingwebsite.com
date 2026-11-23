/**
 * @jest-environment jsdom
 */
import type { ShortVideoListItem } from '@maw/content-sdk';
import { renderHook } from '@testing-library/react';

import { useShortUrlSync } from './use-short-url-sync';

jest.mock('next-intl', () => ({
  useLocale: () => 'en',
}));

const makeShort = (slug: string, title: string) =>
  ({ slug, title }) as ShortVideoListItem;

describe('useShortUrlSync', () => {
  beforeEach(() => {
    document.title = 'First | The Most Annoying Website';
    jest.spyOn(window.history, 'replaceState').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('replaces the localized URL and keeps the title template suffix', () => {
    const first = makeShort('first', 'First');

    const { rerender } = renderHook(
      ({ short }: { short: ShortVideoListItem }) => useShortUrlSync({ short }),
      { initialProps: { short: first } },
    );

    expect(window.history.replaceState).toHaveBeenLastCalledWith(
      null,
      '',
      '/en/shorts/first/',
    );
    expect(document.title).toBe('First | The Most Annoying Website');

    const second = makeShort('second', 'Second');
    rerender({ short: second });

    expect(window.history.replaceState).toHaveBeenLastCalledWith(
      null,
      '',
      '/en/shorts/second/',
    );
    expect(document.title).toBe('Second | The Most Annoying Website');
  });

  it('leaves the URL untouched when there is no active clip', () => {
    renderHook(() => useShortUrlSync({ short: undefined }));

    expect(window.history.replaceState).not.toHaveBeenCalled();
    expect(document.title).toBe('First | The Most Annoying Website');
  });
});
