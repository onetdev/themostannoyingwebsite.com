'use client';

import { type CSSProperties, useEffect, useRef } from 'react';
import {
  createCameraState,
  formatRgb,
  panelColors,
  RESTING_CAMERA,
} from './footer-artwork-color';
import type { ArtworkColumn, ArtworkPanel } from './footer-artwork-panels';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

const prefersReducedMotion = () =>
  typeof window.matchMedia === 'function' &&
  window.matchMedia(REDUCED_MOTION_QUERY).matches;

/**
 * The two stops of the in-cell gradient, plus the acrylic opacity. They are set
 * as inline custom properties, so the server renders the resting colour and the
 * pointer handler only has to overwrite two strings per tile.
 */
const panelStyle = (panel: ArtworkPanel, camera = RESTING_CAMERA) => {
  const { primary, secondary } = panelColors(panel, camera);

  return {
    '--panel-c1': formatRgb(primary),
    '--panel-c2': formatRgb(secondary),
    '--panel-alpha': panel.opacity.toFixed(3),
  } as CSSProperties;
};

interface FooterArtworkTilesProps {
  columns: readonly ArtworkColumn[];
}

/**
 * The pile itself. It is server-rendered in its resting colours (crossed
 * polarizers, no tilt), so the artwork is complete without JavaScript.
 *
 * On the client the pointer stands in for the camera: its position tilts each
 * tile along its own film axis, which changes the retardation and therefore the
 * colour. Updates are coalesced into one animation frame and write custom
 * properties directly, so the twenty tiles never trigger a React render.
 *
 * Reduced-motion visitors keep the static pile — the listener is not attached.
 */
export function FooterArtworkTiles({ columns }: FooterArtworkTilesProps) {
  const pileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pile = pileRef.current;

    if (!pile || prefersReducedMotion()) {
      return;
    }

    const cells = Array.from(pile.querySelectorAll<HTMLElement>('.panel-cell'));
    const panels = columns.flatMap((column) => column.panels);
    let frame = 0;
    let camera = RESTING_CAMERA;

    const paint = () => {
      frame = 0;

      cells.forEach((cell, index) => {
        const panel = panels[index];

        if (!panel) {
          return;
        }

        const { primary, secondary } = panelColors(panel, camera);
        cell.style.setProperty('--panel-c1', formatRgb(primary));
        cell.style.setProperty('--panel-c2', formatRgb(secondary));
      });
    };

    const onPointerMove = (event: PointerEvent) => {
      camera = createCameraState(
        event.clientX / window.innerWidth - 0.5,
        event.clientY / window.innerHeight - 0.5,
      );
      frame ||= window.requestAnimationFrame(paint);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onPointerMove);

      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [columns]);

  return (
    <div ref={pileRef} className="panel-pile">
      {columns.map((column) => (
        <div
          key={column.id}
          data-testid="footer-artwork-column"
          className="panel-column"
        >
          {column.panels.map((panel) => (
            <div
              key={panel.id}
              className="panel-cell"
              style={panelStyle(panel)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
