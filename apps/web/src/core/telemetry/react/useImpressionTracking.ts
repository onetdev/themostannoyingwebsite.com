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
  TRACK_IGNORE_SELECTOR,
} from './capture';

const MIN_VISIBLE_MS = 500;

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
  if (
    document.visibilityState !== 'visible' ||
    element.closest(TRACK_IGNORE_SELECTOR)
  ) {
    return;
  }
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
    if (
      document.visibilityState !== 'visible' ||
      context.seen.has(key) ||
      !element.isConnected
    ) {
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

interface ImpressionRegistry {
  observer: IntersectionObserver;
  observed: Set<Element>;
  context: DwellContext;
}

function observeElement(registry: ImpressionRegistry, element: Element): void {
  if (
    registry.observed.has(element) ||
    element.closest(TRACK_IGNORE_SELECTOR)
  ) {
    return;
  }
  registry.observed.add(element);
  registry.observer.observe(element);
}

function scanImpressions(
  registry: ImpressionRegistry,
  root: ParentNode = document,
): void {
  if (root instanceof Element && root.matches('[data-track-impression]')) {
    observeElement(registry, root);
  }
  for (const element of Array.from(
    root.querySelectorAll('[data-track-impression]'),
  )) {
    observeElement(registry, element);
  }
}

function unobserveTree(registry: ImpressionRegistry, node: Node): void {
  if (!(node instanceof Element)) {
    return;
  }

  const targets = Array.from(node.querySelectorAll('[data-track-impression]'));
  if (node.matches('[data-track-impression]')) {
    targets.push(node);
  }

  for (const target of targets) {
    registry.context.clearDwell(target);
    registry.observer.unobserve(target);
    registry.observed.delete(target);
  }
}

function handleMutations(
  registry: ImpressionRegistry,
  records: MutationRecord[],
): void {
  for (const record of records) {
    for (const node of Array.from(record.removedNodes)) {
      unobserveTree(registry, node);
    }
    for (const node of Array.from(record.addedNodes)) {
      if (node instanceof Element) {
        scanImpressions(registry, node);
      }
    }
  }
}

/**
 * Single IntersectionObserver for the whole app.
 *
 * An element is "impressed" once it has been sufficiently visible for 500 ms;
 * "sufficiently" is 50 % of its own area, or half the viewport for elements
 * taller than the viewport (article bodies, long carousels). A MutationObserver
 * scans only added/removed subtrees (carousel cards, portals), so no feature
 * component needs its own observer.
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
    const registry: ImpressionRegistry = {
      observer,
      observed: new Set<Element>(),
      context,
    };

    scanImpressions(registry);

    const mutations = new MutationObserver((records) => {
      handleMutations(registry, records);
    });

    if (document.body) {
      mutations.observe(document.body, { childList: true, subtree: true });
    }

    const onVisibility = () => {
      if (document.visibilityState !== 'visible') {
        for (const element of Array.from(context.dwells.keys())) {
          context.clearDwell(element);
        }
        return;
      }
      // Re-observe the already known elements so an element that stayed in
      // view across a hidden/visible cycle starts a fresh dwell.
      for (const element of registry.observed) {
        observer.unobserve(element);
        observer.observe(element);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      observer.disconnect();
      mutations.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      for (const dwell of context.dwells.values()) {
        clearTimeout(dwell.timer);
      }
      context.dwells.clear();
      registry.observed.clear();
    };
  }, [pathname, locale]);
}
