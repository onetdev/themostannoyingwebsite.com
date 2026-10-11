'use client';

import { useEffect, useState } from 'react';

/**
 * Tracks whether the window has scrolled past `threshold` pixels.
 *
 * Registers a single passive scroll listener and reports the boolean so shared
 * sticky chrome (the floating header shadow, the top scroll scrim) can react
 * without each re-implementing the listener.
 */
export function useIsScrolled(threshold = 0): boolean {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return isScrolled;
}
