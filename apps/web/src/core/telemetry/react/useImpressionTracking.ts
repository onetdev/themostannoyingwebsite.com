'use client';

import { useLocale } from 'next-intl';
import { useEffect } from 'react';
import { usePathname } from '@/core/i18n/navigation';
import { track } from '..';
import {
  IMPRESSION_THRESHOLDS,
  isTrackingSuppressed,
  requiredImpressionRatio,
  resolveImpressionIndex,
  resolveImpressionKey,
  resolveSection,
} from './capture';

const MIN_VISIBLE_MS = 500;
const RESCAN_DEBOUNCE_MS = 250;

interface Dwell {
  timer: ReturnType<typeof setTimeout>;
  /** Latest measured intersection ratio while dwelling. */
  ratio: number;
  /** Ratio this element has to reach, scaled down for very tall elements. */
  required: number;
}

interface DwellContext {
  seen: Set<string>;
  dwells: Map<Element, Dwell>;
  clearDwell: (element: Element) => void;
}

function emitImpression(element: Element, key: string, ratio: number): void {
  track('impression.element', {
    key,
    section: resolveSection(element),
    index: resolveImpressionIndex(element),
    ratio,
  });
}

/** Marks an already-dwelling element as arrived or gone. */
function refreshDwell(
  entry: IntersectionObserverEntry,
  dwell: Dwell,
  context: DwellContext,
): void {
  if (entry.intersectionRatio < dwell.required) {
    context.clearDwell(entry.target);
    return;
  }
  dwell.ratio = entry.intersectionRatio;
}

/** Starts the visibility timer for an eligible element, if any. */
function startDwell(
  entry: IntersectionObserverEntry,
  context: DwellContext,
): void {
  const element = entry.target;
  const key = resolveImpressionKey(element);
  if (context.seen.has(key)) {
    return;
  }

  const required = requiredImpressionRatio(
    element.getBoundingClientRect().height,
    window.innerHeight,
  );
  if (entry.intersectionRatio < required) {
    return;
  }

  const timer = setTimeout(() => {
    const current = context.dwells.get(element);
    if (current === undefined) {
      return;
    }
    context.dwells.delete(element);
    if (context.seen.has(key) || !element.isConnected) {
      return;
    }

    context.seen.add(key);
    emitImpression(element, key, Number(current.ratio.toFixed(2)));
  }, MIN_VISIBLE_MS);

  context.dwells.set(element, {
    timer,
    ratio: entry.intersectionRatio,
    required,
  });
}

function handleEntries(
  entries: IntersectionObserverEntry[],
  context: DwellContext,
): void {
  for (const entry of entries) {
    const dwell = context.dwells.get(entry.target);
    if (dwell === undefined) {
      startDwell(entry, context);
      continue;
    }
    refreshDwell(entry, dwell, context);
  }
}

/**
 * Single IntersectionObserver for the whole app.
 *
 * An element is "impressed" once it has been sufficiently visible for 500 ms;
 * "sufficiently" is 50 % of its own area, or half the viewport for elements
 * taller than the viewport (article bodies, long carousels). A debounced
 * MutationObserver picks up dynamically mounted nodes (carousel cards,
 * portals), so no feature component needs its own observer.
 */
export function useImpressionTracking(): void {
  const pathname = usePathname();
  const locale = useLocale();

  // Re-arms per route (and per locale): `seen` is route-scoped by design.
  // biome-ignore lint/correctness/useExhaustiveDependencies: re-running the effect is the point.
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined' || isTrackingSuppressed()) {
      return;
    }

    const context: DwellContext = {
      seen: new Set<string>(),
      dwells: new Map<Element, Dwell>(),
      clearDwell: (element) => {
        const dwell = context.dwells.get(element);
        if (dwell !== undefined) {
          clearTimeout(dwell.timer);
          context.dwells.delete(element);
        }
      },
    };

    const observer = new IntersectionObserver(
      (entries) => handleEntries(entries, context),
      { threshold: [...IMPRESSION_THRESHOLDS] },
    );

    const observed = new WeakSet<Element>();
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
    // Coalesce bursts without letting a continuously mutating page starve the
    // scan: the timer is only scheduled when none is pending.
    const scheduleScan = () => {
      if (rescanTimer !== undefined) {
        return;
      }
      rescanTimer = setTimeout(() => {
        rescanTimer = undefined;
        scan();
      }, RESCAN_DEBOUNCE_MS);
    };
    const mutations = new MutationObserver(scheduleScan);

    if (document.body) {
      mutations.observe(document.body, { childList: true, subtree: true });
    }

    return () => {
      observer.disconnect();
      mutations.disconnect();
      if (rescanTimer !== undefined) {
        clearTimeout(rescanTimer);
      }
      for (const dwell of context.dwells.values()) {
        clearTimeout(dwell.timer);
      }
      context.dwells.clear();
    };
  }, [pathname, locale]);
}
