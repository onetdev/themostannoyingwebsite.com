/**
 * @jest-environment jsdom
 */
import { act, renderHook } from '@testing-library/react';

import { useIsScrolled } from './useIsScrolled';

const setScrollY = (value: number) => {
  Object.defineProperty(window, 'scrollY', {
    value,
    writable: true,
    configurable: true,
  });
};

describe('useIsScrolled', () => {
  afterEach(() => setScrollY(0));

  it('is false at the top of the page', () => {
    const { result } = renderHook(() => useIsScrolled());

    expect(result.current).toBe(false);
  });

  it('becomes true once the page is scrolled past the threshold', () => {
    const { result } = renderHook(() => useIsScrolled(10));

    act(() => {
      setScrollY(240);
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(true);
  });

  it('resets when scrolled back above the threshold', () => {
    const { result } = renderHook(() => useIsScrolled(10));

    act(() => {
      setScrollY(240);
      window.dispatchEvent(new Event('scroll'));
    });
    act(() => {
      setScrollY(0);
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(false);
  });
});
