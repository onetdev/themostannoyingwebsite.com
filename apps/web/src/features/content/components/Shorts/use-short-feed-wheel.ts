'use client';

import { useCallback, useEffect, useRef, type WheelEvent } from 'react';

export const WHEEL_STEP_THRESHOLD_PX = 40;
export const WHEEL_STEP_LOCK_MS = 650;

export interface UseShortFeedWheelOptions {
  onNext: () => void;
  onPrevious: () => void;
}

function normalizeWheelDelta(deltaY: number, deltaMode: number): number {
  if (deltaMode === 1) {
    return deltaY * 16;
  }

  if (deltaMode === 2) {
    return deltaY * 100;
  }

  return deltaY;
}

/**
 * Desktop wheel/trackpad navigation for the vertical feed.
 *
 * Deltas are accumulated until they cross a small threshold, then the feed
 * advances once. A short lock prevents a single trackpad gesture (and its
 * momentum events) from skipping multiple clips.
 */
export function useShortFeedWheel({
  onNext,
  onPrevious,
}: UseShortFeedWheelOptions) {
  const accumulatedDelta = useRef(0);
  const isLocked = useRef(false);
  const lockTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onWheel = useCallback(
    (event: WheelEvent<HTMLDivElement>) => {
      const isHorizontal = Math.abs(event.deltaY) <= Math.abs(event.deltaX);

      if (event.ctrlKey || isLocked.current || isHorizontal) {
        return;
      }

      accumulatedDelta.current += normalizeWheelDelta(
        event.deltaY,
        event.deltaMode,
      );

      if (Math.abs(accumulatedDelta.current) < WHEEL_STEP_THRESHOLD_PX) {
        return;
      }

      const direction = accumulatedDelta.current > 0 ? 1 : -1;
      accumulatedDelta.current = 0;
      isLocked.current = true;

      if (direction > 0) {
        onNext();
      } else {
        onPrevious();
      }

      if (lockTimeout.current) {
        clearTimeout(lockTimeout.current);
      }

      lockTimeout.current = setTimeout(() => {
        isLocked.current = false;
      }, WHEEL_STEP_LOCK_MS);
    },
    [onNext, onPrevious],
  );

  useEffect(() => {
    return () => {
      if (lockTimeout.current) {
        clearTimeout(lockTimeout.current);
      }
    };
  }, []);

  return onWheel;
}
