'use client';

import { useCallback, useEffect } from 'react';

/**
 * Manages the page title dynamically, capturing the base title
 * from og:title and restoring it when disabled or unmounted.
 */
export function useDynamicPageTitle(enabled: boolean) {
  const setTitle = useCallback(
    (newTitle: string) => {
      if (!enabled) {
        return;
      }

      document.title = newTitle;
    },
    [enabled],
  );

  const resetTitle = useCallback(() => {
    const originalTitle = document
      .querySelector(`meta[property="og:title"]`)
      ?.getAttribute('content');
    if (originalTitle) {
      setTitle(originalTitle);
    }
  }, [setTitle]);

  useEffect(() => {
    return () => {
      resetTitle();
    };
  }, [resetTitle]);

  return { setTitle, resetTitle };
}
