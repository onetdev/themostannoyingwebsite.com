import { FooterArtworkTiles } from './FooterArtworkTiles';
import { createFooterArtworkPile } from './footer-artwork-panels';

/**
 * Decorative dichroic squares piled below the site footer.
 *
 * Twenty 1:1 tiles are stacked in columns that grow toward the middle and taper
 * at both ends, so the wall reads as a wide pyramid. The squares touch edge to
 * edge: there is no gap to speak of, only the rounded corners carving their own
 * seams.
 *
 * Each tile's colour is computed from a simplified polariscope model: a film
 * stack with its own retardation and axis sits between crossed polarizers, so
 * white light leaves as colour. The pointer stands in for the camera and tilts
 * each tile along its own axis, which is why neighbouring squares respond
 * differently to the same movement.
 *
 * The optics are deterministic, so the server renders the resting colours and
 * hydration matches. Purely presentational, hence `aria-hidden` and no
 * translated strings. Hidden in print like the footer.
 */
export function FooterArtwork() {
  const { columns } = createFooterArtworkPile();

  return (
    <div
      id="footer-artwork"
      data-testid="footer-artwork"
      aria-hidden="true"
      className="panel-stage select-none print:hidden"
    >
      <FooterArtworkTiles columns={columns} />
    </div>
  );
}
