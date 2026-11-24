'use client';

import { useEffect, useState } from 'react';

const TIME_EVENTS = ['timeupdate', 'seeked', 'loadedmetadata'] as const;

/**
 * Tracks the playback position of the active video in milliseconds.
 *
 * Milliseconds are used because the Content API exposes cue and duration
 * offsets in the same unit, so consumers never convert units.
 */
export function useVideoTime(video: HTMLVideoElement | null): number {
  const [currentMs, setCurrentMs] = useState(0);

  useEffect(() => {
    if (!video) {
      setCurrentMs(0);
      return;
    }

    const sync = () => {
      const next = video.currentTime * 1000;
      setCurrentMs(Number.isFinite(next) ? next : 0);
    };

    for (const event of TIME_EVENTS) {
      video.addEventListener(event, sync);
    }
    sync();

    return () => {
      for (const event of TIME_EVENTS) {
        video.removeEventListener(event, sync);
      }
    };
  }, [video]);

  return currentMs;
}
