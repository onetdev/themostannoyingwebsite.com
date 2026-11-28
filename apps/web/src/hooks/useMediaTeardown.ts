'use client';

import { useCallback, useEffect, useRef } from 'react';
import {
  clearMediaSession,
  releaseMediaElement,
} from '@/core/media/media-teardown';

/**
 * Tracks media elements by key and releases them when they unmount or when the
 * owning surface closes.
 *
 * Releasing on the ref callback's `null` is deliberate: a real unmount removes
 * the element before the deferred cleanup runs, so the cleanup alone cannot
 * find it.
 */
export function useMediaTeardown<
  TKey = string,
  TMedia extends HTMLMediaElement = HTMLMediaElement,
>() {
  const mediaRef = useRef(new Map<TKey, TMedia>());
  const releaseTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const register = useCallback((key: TKey, media: TMedia | null) => {
    if (media) {
      mediaRef.current.set(key, media);
      return;
    }

    const existing = mediaRef.current.get(key);
    if (existing) {
      releaseMediaElement(existing);
      mediaRef.current.delete(key);
    }
  }, []);

  const get = useCallback((key: TKey) => mediaRef.current.get(key), []);

  const releaseAll = useCallback(() => {
    for (const media of mediaRef.current.values()) {
      releaseMediaElement(media);
    }

    clearMediaSession();
  }, []);

  useEffect(() => {
    // Strict Mode simulates an unmount and immediately re-mounts. Defer the
    // release so the dev-only cycle cannot stop a live element.
    if (releaseTimeout.current) {
      clearTimeout(releaseTimeout.current);
      releaseTimeout.current = null;
    }

    return () => {
      releaseTimeout.current = setTimeout(() => {
        releaseTimeout.current = null;
        releaseAll();
      }, 0);
    };
  }, [releaseAll]);

  return { get, register, releaseAll };
}
