/**
 * @jest-environment jsdom
 */
import { act, renderHook } from '@testing-library/react';

import { useRotatingMessage } from './useRotatingMessage';

describe('useRotatingMessage', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('returns undefined for an empty list', () => {
    const { result } = renderHook(() => useRotatingMessage([]));

    expect(result.current).toBeUndefined();
  });

  it('returns the only message without scheduling when the list is singular', () => {
    const { result } = renderHook(() => useRotatingMessage(['Only one']));

    act(() => {
      jest.advanceTimersByTime(10_000);
    });

    expect(result.current).toBe('Only one');
  });

  it('advances to the next message on each interval', () => {
    const { result } = renderHook(() =>
      useRotatingMessage(['First', 'Second'], { intervalMs: 1000 }),
    );

    expect(result.current).toBe('First');

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current).toBe('Second');

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current).toBe('First');
  });

  it('clears the interval on unmount', () => {
    const clearInterval = jest.spyOn(globalThis, 'clearInterval');
    const { unmount } = renderHook(() =>
      useRotatingMessage(['First', 'Second']),
    );

    unmount();

    expect(clearInterval).toHaveBeenCalled();
  });
});
