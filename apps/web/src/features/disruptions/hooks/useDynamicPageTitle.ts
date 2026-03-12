'use client';

import { useCallback, useEffect } from 'react';
import { useLogger } from '@/hooks';

/**
 * Manages the page title dynamically, capturing the base title
 * from og:title and restoring it when disabled or unmounted.
 */
export function useDynamicPageTitle(enabled: boolean) {
  const logger = useLogger('useDynamicPageTitle');

  const setTitle = useCallback(
    (newTitle: string) => {
      if (!enabled) {
        return;
      }

      logger.info(`setting page title to new title: ${newTitle}`);
      document.title = newTitle;
    },
    [enabled, logger],
  );

  const resetTitle = useCallback(() => {
    const originalTitle = document
      .querySelector(`meta[property="og:title"]`)
      ?.getAttribute('content');

    if (originalTitle) {
      logger.info('resetting page title to original');
      document.title = originalTitle;
    } else {
      logger.warn(
        `og:title content is missing, can't reset page title to original`,
      );
    }
  }, [logger]);

  useEffect(() => {
    return () => {
      resetTitle();
    };
  }, [resetTitle]);

  return { setTitle, resetTitle };
}
