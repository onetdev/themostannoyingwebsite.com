'use client';

import { useEffect } from 'react';
import { usePathname } from '@/core/i18n/navigation';
import { track } from '..';
import {
  resolveImpressionIndex,
  resolveImpressionKey,
  resolveSection,
} from './capture';

const MIN_VISIBLE_RATIO = 0.5;
const MIN_VISIBLE_MS = 500;
const RESCAN_DEBOUNCE_MS = 250;

/**
 * Single IntersectionObserver for the whole app.
 *
 * An element is "impressed" once it has been at least 50% visible for 500ms.
 * A debounced MutationObserver picks up dynamically mounted nodes (carousel
 * cards, portals), so no feature component needs its own observer.
 */
export function useImpressionTracking(): void {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    const seen = new Set<string>();
    const timers = new Map<Element, ReturnType<typeof setTimeout>>();
    const observed = new WeakSet<Element>();

    const clearDwell = (element: Element) => {
      const timer = timers.get(element);
      if (timer !== undefined) {
        clearTimeout(timer);
        timers.delete(element);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.intersectionRatio < MIN_VISIBLE_RATIO) {
            clearDwell(entry.target);
            continue;
          }
          if (timers.has(entry.target)) {
            continue;
          }

          const element = entry.target;
          const key = resolveImpressionKey(element);
          if (seen.has(key)) {
            continue;
          }

          const timer = setTimeout(() => {
            timers.delete(element);
            if (seen.has(key) || !element.isConnected) {
              return;
            }

            seen.add(key);
            track('impression.element', {
              key,
              section: resolveSection(element),
              index: resolveImpressionIndex(element),
              ratio: Number(entry.intersectionRatio.toFixed(2)),
              visibleMs: MIN_VISIBLE_MS,
            });
          }, MIN_VISIBLE_MS);
          timers.set(element, timer);
        }
      },
      { threshold: [MIN_VISIBLE_RATIO] },
    );

    const scan = () => {
      for (const element of Array.from(
        document.querySelectorAll('[data-track-impression]'),
      )) {
        if (observed.has(element)) {
          continue;
        }
        observed.add(element);
        observer.observe(element);
      }
    };

    scan();

    let rescanTimer: ReturnType<typeof setTimeout> | undefined;
    const mutations = new MutationObserver(() => {
      if (rescanTimer !== undefined) {
        clearTimeout(rescanTimer);
      }
      rescanTimer = setTimeout(scan, RESCAN_DEBOUNCE_MS);
    });

    if (document.body) {
      mutations.observe(document.body, { childList: true, subtree: true });
    }

    return () => {
      observer.disconnect();
      mutations.disconnect();
      if (rescanTimer !== undefined) {
        clearTimeout(rescanTimer);
      }
      for (const timer of timers.values()) {
        clearTimeout(timer);
      }
      timers.clear();
    };
  }, [pathname]);
}
