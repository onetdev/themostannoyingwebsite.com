'use client';

import { useEffect } from 'react';

/**
 * Hook to add a red dot badge to the favicon using a static asset.
 */
export function useFaviconBadge(hasBadge: boolean) {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const links =
      document.querySelectorAll<HTMLLinkElement>("link[rel*='icon']");

    if (!hasBadge) {
      // Restore original favicons
      links.forEach((link) => {
        const originalHref = link.getAttribute('data-original-href');
        if (originalHref) {
          link.href = originalHref;
        }
      });
      return;
    }

    // Set unread favicon
    const unreadFaviconUrl = '/favicon_unread.png';

    links.forEach((link) => {
      // Store original href to restore later if not already stored
      if (!link.getAttribute('data-original-href')) {
        link.setAttribute('data-original-href', link.href);
      }
      link.href = unreadFaviconUrl;
    });
  }, [hasBadge]);
}
