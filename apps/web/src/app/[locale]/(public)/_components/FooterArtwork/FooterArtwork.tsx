'use client';

import { useEffect, useRef, useState } from 'react';
import { getFooterArtworkGrid } from './footer-artwork-geometry';
import type {
  FooterArtworkBleedMode,
  FooterArtworkRenderer,
} from './footer-artwork-renderer';
import { useFooterArtworkFrameRate } from './useFooterArtworkFrameRate';

const LOOP_DURATION_MS = 18_000;
const TARGET_FPS = 30;
const FRAME_INTERVAL = 1000 / TARGET_FPS;
const STATIC_LOOP_POSITION = 0.35;
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

type ArtworkState = 'idle' | 'ready' | 'failed';

export interface FooterArtworkProps {
  /**
   * Edge-light model. `analytic` is the production default; `lut` is the
   * measured-falloff POC variant.
   */
  bleedMode?: FooterArtworkBleedMode;
  /** Multiplier for the edge-light strength. Defaults to `1`. */
  bleedStrength?: number;
  /** Overrides the element id/test id when several walls are on one page. */
  instanceId?: string;
  /**
   * Shared wall-clock epoch (ms). When set, the loop phase is derived from it
   * so several walls on the page stay in sync.
   */
  loopEpoch?: number;
  /** Freezes the wall at a loop position instead of animating it. */
  staticTime?: number;
}

const prefersReducedMotion = () =>
  typeof window.matchMedia === 'function' &&
  window.matchMedia(REDUCED_MOTION_QUERY).matches;

/**
 * The live CPG mosaic below the footer.
 *
 * The component owns only the browser lifecycle: it waits until the wall is
 * about to enter the viewport, dynamically loads the OGL renderer, and drives a
 * throttled eighteen-second loop. Everything expensive lives in the shader;
 * this file is responsible for not loading or running when nobody is looking.
 *
 * `loopEpoch` keeps the dev comparison walls on the same frame. `staticTime`
 * freezes a wall completely. `bleedStrength` is updated as a live uniform, so
 * moving the comparison slider does not recreate the WebGL context.
 *
 * The CSS layer underneath is a complete static fallback: it is what renders
 * while the WebGL chunk loads and what stays visible if WebGL is unavailable.
 * `data-artwork-state` is the contract between the two; the canvas only fades
 * in after the first successful frame.
 */
export function FooterArtwork({
  bleedMode = 'analytic',
  bleedStrength = 1,
  instanceId = 'footer-artwork',
  loopEpoch,
  staticTime,
}: FooterArtworkProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<FooterArtworkRenderer | null>(null);
  const strengthRef = useRef(bleedStrength);
  const [state, setState] = useState<ArtworkState>('idle');
  const {
    enabled: fpsEnabled,
    fps,
    recordFrame,
    reset: resetFrameRate,
  } = useFooterArtworkFrameRate();

  useEffect(() => {
    strengthRef.current = bleedStrength;
    rendererRef.current?.setBleedStrength(bleedStrength);
  }, [bleedStrength]);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;

    if (!stage || !canvas) {
      return;
    }

    const media = window.matchMedia(REDUCED_MOTION_QUERY);
    let disposed = false;
    let initialised = false;
    let visible = false;
    let reducedMotion = prefersReducedMotion();
    let renderer: FooterArtworkRenderer | undefined;
    let frame = 0;
    let startedAt = 0;
    let lastPaint = 0;

    const draw = (now: number) => {
      if (!renderer) {
        return;
      }

      const elapsed =
        loopEpoch !== undefined
          ? (Date.now() - loopEpoch + LOOP_DURATION_MS) % LOOP_DURATION_MS
          : (now - startedAt) % LOOP_DURATION_MS;
      const animatedTime = elapsed / LOOP_DURATION_MS;
      const time =
        staticTime ?? (reducedMotion ? STATIC_LOOP_POSITION : animatedTime);

      renderer.render(Math.min(1, Math.max(0, time)));
    };

    const tick = (now: number) => {
      frame = 0;

      if (!renderer || !visible || reducedMotion) {
        return;
      }

      recordFrame(now);

      if (now - lastPaint >= FRAME_INTERVAL) {
        lastPaint = now;
        draw(now);
      }

      frame = window.requestAnimationFrame(tick);
    };

    const start = () => {
      if (
        !renderer ||
        staticTime !== undefined ||
        reducedMotion ||
        frame ||
        document.hidden
      ) {
        return;
      }

      frame = window.requestAnimationFrame(tick);
    };

    const stop = () => {
      if (!frame) {
        return;
      }

      window.cancelAnimationFrame(frame);
      frame = 0;

      if (!disposed) {
        resetFrameRate();
      }
    };

    const createRendererSafely = async () => {
      try {
        const { createFooterArtworkRenderer } = await import(
          './footer-artwork-renderer'
        );

        if (disposed) {
          return undefined;
        }

        const created = createFooterArtworkRenderer({
          canvas,
          stage,
          bleedMode,
          bleedStrength: strengthRef.current,
          onFirstFrame: () => {
            if (!disposed) {
              setState('ready');
            }
          },
          onFailure: () => {
            stop();
            renderer?.destroy();
            renderer = undefined;
            rendererRef.current = null;

            if (!disposed) {
              setState('failed');
            }
          },
        });

        rendererRef.current = created;

        return created;
      } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn('Footer artwork WebGL is unavailable', error);
        }

        if (!disposed) {
          setState('failed');
        }

        return undefined;
      }
    };

    const initialize = async () => {
      if (initialised) {
        return;
      }

      initialised = true;
      renderer = await createRendererSafely();

      if (!renderer) {
        return;
      }

      startedAt = performance.now();
      renderer.resize();

      if (staticTime !== undefined) {
        draw(startedAt);
        return;
      }

      if (reducedMotion) {
        draw(startedAt);
        return;
      }

      start();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (!entry) {
          return;
        }

        visible = entry.isIntersecting;

        if (visible) {
          void initialize();
          start();
        } else {
          stop();
        }
      },
      // Start loading the shader chunk a little before the wall is on screen,
      // but never on initial page load.
      { rootMargin: '300px 0px' },
    );
    observer.observe(stage);

    const syncGrid = () => {
      const bounds = stage.getBoundingClientRect();
      const grid = getFooterArtworkGrid(bounds.width, bounds.height);

      stage.style.setProperty('--footer-artwork-cols', String(grid.columns));
      stage.style.setProperty('--footer-artwork-rows', String(grid.rows));
      stage.dataset.artworkColumns = String(grid.columns);
      stage.dataset.artworkRows = String(grid.rows);
    };

    // Set the exact grid immediately, even before WebGL is loaded or when it is
    // unavailable: the CSS fallback must never show a cropped edge tile.
    syncGrid();

    const resizeObserver = new ResizeObserver(() => {
      syncGrid();
      renderer?.resize();

      if (renderer && !frame) {
        draw(performance.now());
      }
    });
    resizeObserver.observe(stage);

    const onReducedMotionChange = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;

      if (reducedMotion) {
        stop();
        draw(performance.now());
      } else {
        start();
      }
    };
    media.addEventListener('change', onReducedMotionChange);

    const onVisibilityChange = () => {
      if (document.hidden) {
        stop();
      } else {
        start();
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      disposed = true;
      observer.disconnect();
      resizeObserver.disconnect();
      media.removeEventListener('change', onReducedMotionChange);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      stop();
      renderer?.destroy();
      rendererRef.current = null;
    };
  }, [bleedMode, loopEpoch, recordFrame, resetFrameRate, staticTime]);

  return (
    <div
      ref={stageRef}
      id={instanceId}
      data-testid={instanceId}
      data-artwork-state={state}
      aria-hidden="true"
      className="footer-artwork select-none print:hidden"
    >
      <div className="footer-artwork-fallback" />
      <canvas ref={canvasRef} className="footer-artwork-canvas" />
      {fpsEnabled && staticTime === undefined && (
        <span className="footer-artwork-fps" aria-hidden="true">
          {fps > 0 ? `${fps} fps` : '— fps'}
        </span>
      )}
    </div>
  );
}
