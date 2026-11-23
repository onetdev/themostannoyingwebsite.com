'use client';

import { useEffect, useState } from 'react';

const HOVER_QUERY = '(hover: hover)';

const hasMatchMedia = () =>
  typeof window !== 'undefined' && typeof window.matchMedia === 'function';

const canHoverNow = () => {
  // Assume hover support when the API is unavailable (SSR, older test DOMs).
  if (!hasMatchMedia()) {
    return true;
  }

  return window.matchMedia(HOVER_QUERY).matches;
};

/**
 * Tracks whether the primary input can hover, e.g. to gate hover-only
 * previews. Re-evaluates when the device's input capabilities change.
 */
export function useCanHover(): boolean {
  const [canHover, setCanHover] = useState(canHoverNow);

  useEffect(() => {
    if (!hasMatchMedia()) {
      return;
    }

    const watcher = window.matchMedia(HOVER_QUERY);
    const onChange = (event: MediaQueryListEvent) => setCanHover(event.matches);

    setCanHover(watcher.matches);
    watcher.addEventListener('change', onChange);

    return () => watcher.removeEventListener('change', onChange);
  }, []);

  return canHover;
}
