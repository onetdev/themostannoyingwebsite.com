'use client';

import { useEffect } from 'react';

export function useFaviconBadge(hasUnread: boolean) {
  useEffect(() => {
    const icons =
      document.querySelectorAll<HTMLLinkElement>('link[rel*="icon"]');

    const href = hasUnread ? '/favicon_unread.png' : '/favicon.ico';

    icons.forEach((icon) => {
      icon.href = href;
    });
  }, [hasUnread]);
}
