import type { CSSProperties } from 'react';
import { createFooterArtworkPile } from './footer-artwork-panels';

/**
 * Decorative dichroic squares piled below the site footer.
 *
 * Twenty 1:1 panels are stacked in columns that grow toward the middle and
 * taper at both ends, so the wall reads as a wide diamond. The squares touch
 * edge to edge: there is no gap to speak of, only the rounded corners carving
 * their own seams. The arrangement is completely static — only the colour
 * *inside* each square moves, driven by the scroll position through CSS
 * scroll-driven animations (`animation-timeline: view()`). No JavaScript, no
 * hydration, and nothing animating while the page is at rest.
 *
 * Every square samples one shared blurred plate (`footer-artwork-bg.webp`): the
 * generator hands each panel a percentage offset and a quarter turn, so the wall
 * shows many different crops of the same gradient. Offsets come from a fixed
 * seed, so the markup is stable across requests and builds. The plate is only
 * fetched once the pile approaches the viewport, via `content-visibility`.
 *
 * Server-rendered and deterministic. Purely presentational, hence `aria-hidden`
 * and no translated strings. Hidden in print like the footer.
 */
const artworkStyle = {
  '--panel-image': "url('/assets/images/footer-artwork-bg.webp')",
} as CSSProperties;

export function FooterArtwork() {
  const { columns } = createFooterArtworkPile();

  return (
    <div
      id="footer-artwork"
      data-testid="footer-artwork"
      aria-hidden="true"
      style={artworkStyle}
      className="panel-stage select-none print:hidden"
    >
      <div className="panel-pile">
        {columns.map((column) => (
          <div
            key={column.id}
            data-testid="footer-artwork-column"
            className="panel-column"
          >
            {column.panels.map((panel) => (
              <div key={panel.id} className="panel-cell" style={panel.style} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
