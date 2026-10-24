import { FooterArtworkScene } from './FooterArtworkScene';
import { createFooterArtworkLayers } from './footer-artwork-tiles';

/**
 * Decorative dichroic panel wall rendered below the site footer.
 *
 * Server-rendered: the three tile sheets are generated once from fixed seeds
 * and inlined as SVG data URIs, so the scene ships no markup amplification and
 * no client render work. Only the scroll coupling hydrates.
 *
 * Purely presentational, hence `aria-hidden` and no translated strings. It is
 * hidden in print for the same reason as the footer itself.
 */
export function FooterArtwork() {
  const layers = createFooterArtworkLayers();

  return (
    <div
      id="footer-artwork"
      data-testid="footer-artwork"
      aria-hidden="true"
      className="border-border bg-[var(--panel-base)] relative mt-4 mb-4 h-[clamp(15rem,42vh,28rem)] w-full overflow-hidden rounded-2xl border select-none isolate print:hidden"
    >
      <div className="panel-glow" />
      <FooterArtworkScene layers={layers} />
      <div className="panel-vignette" />
      <div className="panel-grain" />
    </div>
  );
}
