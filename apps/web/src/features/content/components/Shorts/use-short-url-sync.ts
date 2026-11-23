'use client';

import type { ShortListItem } from '@maw/content-sdk';
import { useLocale } from 'next-intl';
import { useEffect, useRef } from 'react';

export interface UseShortUrlSyncOptions {
  /** Clip currently on screen; the URL and title follow it. */
  short?: ShortListItem;
}

/** Separator of the layout's `%s | <site name>` document title template. */
const TITLE_TEMPLATE_SEPARATOR = ' | ';

/**
 * Mirrors the active clip into the address bar and the document title.
 *
 * `history.replaceState` is deliberate: the feed must stay one RSC page while
 * the URL keeps pointing at the clip on screen, so sharing yields a deep link
 * without a navigation that would remount the player. The tradeoff is that the
 * Next.js router keeps reporting the entry route, so `usePathname()` (and the
 * telemetry scoped to it) stays stale until the user leaves the player.
 */
export function useShortUrlSync({ short }: UseShortUrlSyncOptions): void {
  const locale = useLocale();
  const titleSuffixRef = useRef<string | null>(null);

  useEffect(() => {
    if (!short) {
      return;
    }

    window.history.replaceState(
      window.history.state,
      '',
      `/${locale}/shorts/${encodeURIComponent(short.slug)}/`,
    );

    // The layout owns the `%s | <site name>` template; capture its suffix once
    // so each clip only replaces the leading part of the title.
    if (titleSuffixRef.current === null) {
      const separatorIndex = document.title.indexOf(TITLE_TEMPLATE_SEPARATOR);
      titleSuffixRef.current =
        separatorIndex === -1 ? '' : document.title.slice(separatorIndex);
    }

    document.title = `${short.title}${titleSuffixRef.current}`;
  }, [locale, short]);
}
