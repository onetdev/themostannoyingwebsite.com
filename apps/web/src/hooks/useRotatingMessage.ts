'use client';

import { useEffect, useState } from 'react';

export interface UseRotatingMessageOptions {
  /** How long each message stays on screen, in milliseconds. */
  intervalMs?: number;
}

/**
 * Cycles through a list of messages on an interval.
 *
 * Returns `undefined` while the list is empty (e.g. a content pool that could
 * not be loaded) so callers can render their own fallback. The index advances
 * in list order and wraps around.
 */
export function useRotatingMessage(
  messages: readonly string[],
  { intervalMs = 1800 }: UseRotatingMessageOptions = {},
): string | undefined {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (messages.length <= 1) {
      setIndex(0);
      return;
    }

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [messages.length, intervalMs]);

  if (messages.length === 0) {
    return undefined;
  }

  return messages[index % messages.length];
}
