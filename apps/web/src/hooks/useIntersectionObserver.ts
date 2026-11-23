'use client';

import { type RefObject, useEffect, useRef } from 'react';

export interface UseIntersectionObserverProps {
  $ref: RefObject<Element | null>;
  onIntersect: (entry: IntersectionObserverEntry) => void;
}

/**
 * Observes a single element and forwards intersection entries to a handler.
 *
 * The handler is kept in a ref, so callers do not need to memoize it and the
 * observer is not torn down on every render. Environments without
 * `IntersectionObserver` (SSR, older test DOMs) are a no-op.
 */
export function useIntersectionObserver({
  $ref,
  onIntersect,
}: UseIntersectionObserverProps) {
  const onIntersectRef = useRef(onIntersect);

  useEffect(() => {
    onIntersectRef.current = onIntersect;
  });

  useEffect(() => {
    const node = $ref.current;

    if (!node || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry) {
        onIntersectRef.current(entry);
      }
    });

    observer.observe(node);

    return () => observer.disconnect();
  }, [$ref]);
}
