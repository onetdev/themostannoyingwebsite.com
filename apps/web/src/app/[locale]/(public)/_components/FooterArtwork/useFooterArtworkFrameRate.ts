'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import { createFrameRateSampler } from './footer-artwork-frame-rate';

/**
 * Dev-only display FPS for the footer wall.
 *
 * The sampler lives in this hook, not in the wall component. The component only
 * forwards its requestAnimationFrame timestamps and renders the small chip. The
 * state update is throttled to twice per second, so the debug meter cannot
 * cause per-frame React work.
 */

const FPS_METER_ENABLED = process.env.NODE_ENV !== 'production';
const FPS_UPDATE_INTERVAL_MS = 500;

export interface FooterArtworkFrameRate {
  /** False in production builds, where the meter is not rendered at all. */
  enabled: boolean;
  /** Last measured display FPS, or 0 before the first sample. */
  fps: number;
  /** Forwarded from every requestAnimationFrame tick. */
  recordFrame: (timestamp: number) => void;
  /** Clears the rolling window, e.g. when the loop pauses. */
  reset: () => void;
}

export const useFooterArtworkFrameRate = (): FooterArtworkFrameRate => {
  const sampler = useMemo(() => createFrameRateSampler(), []);
  const [fps, setFps] = useState(0);
  const lastUpdate = useRef(0);

  const recordFrame = useCallback(
    (timestamp: number) => {
      if (!FPS_METER_ENABLED) {
        return;
      }

      sampler.record(timestamp);

      if (timestamp - lastUpdate.current < FPS_UPDATE_INTERVAL_MS) {
        return;
      }

      lastUpdate.current = timestamp;
      setFps(Math.round(sampler.read()));
    },
    [sampler],
  );

  const reset = useCallback(() => {
    sampler.reset();
    lastUpdate.current = 0;
    setFps(0);
  }, [sampler]);

  return {
    enabled: FPS_METER_ENABLED,
    fps,
    recordFrame,
    reset,
  };
};
