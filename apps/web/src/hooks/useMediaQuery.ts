'use client';

import { useEffect, useState } from 'react';

const hasMatchMedia = () =>
  typeof window !== 'undefined' && typeof window.matchMedia === 'function';

const matchesNow = (query: string) => {
  if (!hasMatchMedia()) {
    return false;
  }

  return window.matchMedia(query).matches;
};

/**
 * Tracks whether a media query currently matches.
 *
 * Starts from the live match when the browser exposes `matchMedia`; during SSR
 * it resolves to `false` until the effect runs.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => matchesNow(query));

  useEffect(() => {
    if (!hasMatchMedia()) {
      return;
    }

    const watcher = window.matchMedia(query);
    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);

    setMatches(watcher.matches);
    watcher.addEventListener('change', onChange);

    return () => watcher.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}
