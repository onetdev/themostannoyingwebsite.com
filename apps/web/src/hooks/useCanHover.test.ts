/**
 * @jest-environment jsdom
 */
import { act, renderHook } from '@testing-library/react';

import { useCanHover } from './useCanHover';

const originalMatchMedia = window.matchMedia;

function mockMatchMedia(initialMatches: boolean) {
  const listeners = new Set<(event: MediaQueryListEvent) => void>();
  const mediaQueryList = {
    matches: initialMatches,
    media: '(hover: hover)',
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

describe('useCanHover', () => {
  afterEach(() => {
    if (originalMatchMedia) {
      window.matchMedia = originalMatchMedia;
    } else {
      delete (window as { matchMedia?: typeof window.matchMedia }).matchMedia;
    }
  });

  it('assumes hover support when matchMedia is unavailable', () => {
    delete (window as { matchMedia?: typeof window.matchMedia }).matchMedia;

    const { result } = renderHook(() => useCanHover());

    expect(result.current).toBe(true);
  });

  it('reflects the current media query result', () => {
    mockMatchMedia(false);

    const { result } = renderHook(() => useCanHover());

    expect(result.current).toBe(false);
  });

  it('updates when the input capabilities change', () => {
    const emit = mockMatchMedia(false);
    const { result } = renderHook(() => useCanHover());

    act(() => emit(true));

    expect(result.current).toBe(true);
  });
});
