/**
 * @jest-environment jsdom
 */
import { act, renderHook } from '@testing-library/react';

import { useMediaQuery } from './useMediaQuery';

const originalMatchMedia = window.matchMedia;

function mockMatchMedia(initialMatches: boolean) {
  const listeners = new Set<(event: MediaQueryListEvent) => void>();
  const mediaQueryList = {
    matches: initialMatches,
    media: '(min-width: 1024px)',
    onchange: null,
    addEventListener: (
      _type: string,
      listener: (event: MediaQueryListEvent) => void,
    ) => {
      listeners.add(listener);
    },
    removeEventListener: (
      _type: string,
      listener: (event: MediaQueryListEvent) => void,
    ) => {
      listeners.delete(listener);
    },
    addListener: jest.fn(),
    removeListener: jest.fn(),
    dispatchEvent: jest.fn(),
  };

  window.matchMedia = jest.fn(
    () => mediaQueryList,
  ) as unknown as typeof window.matchMedia;

  return (matches: boolean) => {
    mediaQueryList.matches = matches;
    listeners.forEach((listener) => {
      listener({ matches } as MediaQueryListEvent);
    });
  };
}

describe('useMediaQuery', () => {
  afterEach(() => {
    if (originalMatchMedia) {
      window.matchMedia = originalMatchMedia;
    } else {
      delete (window as { matchMedia?: typeof window.matchMedia }).matchMedia;
    }
  });

  it('defaults to false when matchMedia is unavailable', () => {
    delete (window as { matchMedia?: typeof window.matchMedia }).matchMedia;

    const { result } = renderHook(() => useMediaQuery('(min-width: 1024px)'));

    expect(result.current).toBe(false);
  });

  it('reflects the current media query result', () => {
    mockMatchMedia(true);

    const { result } = renderHook(() => useMediaQuery('(min-width: 1024px)'));

    expect(result.current).toBe(true);
  });

  it('updates when the media query changes', () => {
    const emit = mockMatchMedia(false);
    const { result } = renderHook(() => useMediaQuery('(min-width: 1024px)'));

    act(() => emit(true));

    expect(result.current).toBe(true);
  });
});
