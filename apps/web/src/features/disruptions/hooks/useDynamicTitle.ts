'use client';

import { useEffect, useRef } from 'react';

/**
 * Manages the page title dynamically, capturing the original title
 * and restoring it when the effect is disabled or the component unmounts.
 */
export function useDynamicTitle(enabled: boolean) {
  const originalTitleRef = useRef<string | null>(null);

  useEffect(() => {
    if (enabled && originalTitleRef.current === null) {
      originalTitleRef.current = document.title;
    }

    if (!enabled && originalTitleRef.current !== null) {
      document.title = originalTitleRef.current;
      originalTitleRef.current = null;
    }
  }, [enabled]);

  useEffect(() => {
    return () => {
      if (originalTitleRef.current !== null) {
        document.title = originalTitleRef.current;
      }
    };
  }, []);

  const setTitle = (newTitle: string) => {
    if (enabled) {
      document.title = newTitle;
    }
  };

  return { setTitle, originalTitle: originalTitleRef.current };
}
