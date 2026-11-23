/**
 * @jest-environment jsdom
 */

import { act, renderHook } from '@testing-library/react';
import type { WheelEvent } from 'react';

import { useShortFeedWheel, WHEEL_STEP_LOCK_MS } from './use-short-feed-wheel';

const wheel = (overrides: Partial<WheelEvent<HTMLDivElement>>) =>
  ({
    deltaX: 0,
    deltaY: 0,
    deltaMode: 0,
    ctrlKey: false,
    ...overrides,
  }) as WheelEvent<HTMLDivElement>;

describe('useShortFeedWheel', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('accumulates small deltas before advancing once', () => {
    const onNext = jest.fn();
    const onPrevious = jest.fn();
    const { result } = renderHook(() =>
      useShortFeedWheel({ onNext, onPrevious }),
    );

    act(() => result.current(wheel({ deltaY: 20 })));
    expect(onNext).not.toHaveBeenCalled();

    act(() => result.current(wheel({ deltaY: 30 })));
    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it('locks the feed during a gesture and its momentum', () => {
    const onNext = jest.fn();
    const { result } = renderHook(() =>
      useShortFeedWheel({ onNext, onPrevious: jest.fn() }),
    );

    act(() => result.current(wheel({ deltaY: 50 })));
    act(() => result.current(wheel({ deltaY: 200 })));
    expect(onNext).toHaveBeenCalledTimes(1);

    act(() => jest.advanceTimersByTime(WHEEL_STEP_LOCK_MS));
    act(() => result.current(wheel({ deltaY: 50 })));
    expect(onNext).toHaveBeenCalledTimes(2);
  });

  it('navigates backwards for negative deltas', () => {
    const onPrevious = jest.fn();
    const { result } = renderHook(() =>
      useShortFeedWheel({ onNext: jest.fn(), onPrevious }),
    );

    act(() => result.current(wheel({ deltaY: -50 })));

    expect(onPrevious).toHaveBeenCalledTimes(1);
  });

  it('ignores horizontal and line-mode-normalized wheel gestures', () => {
    const onNext = jest.fn();
    const { result } = renderHook(() =>
      useShortFeedWheel({ onNext, onPrevious: jest.fn() }),
    );

    act(() => result.current(wheel({ deltaX: 100, deltaY: 10 })));
    expect(onNext).not.toHaveBeenCalled();

    act(() => result.current(wheel({ deltaY: 3, deltaMode: 1 })));
    expect(onNext).toHaveBeenCalledTimes(1);
  });
});
