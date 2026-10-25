import { mulberry32 } from '@maw/utils/random';
import { GAMMA_RANGE, type TileOptics } from './footer-artwork-color';

/**
 * Deterministic optics for the dichroic footer artwork.
 *
 * The artwork is a small wall of 1:1 acrylic squares — twenty of them, stacked
 * in columns that grow in the middle and taper at both ends. Every square holds
 * its own film stack; nothing about the arrangement is random, the shape is
 * data.
 *
 * Each tile only stores the two properties the colour model needs: the
 * retardation of its film stack (Γ₀, from thin to thick) and the angle of its
 * axis relative to the polarizer (φ). Both come from one fixed seed, so the
 * server and the client agree and the composition is stable between builds.
 * The colours themselves are computed at render time by `footer-artwork-color`.
 */

/** Squares per column, left to right. Must add up to the intended pile size. */
export const COLUMN_COUNTS = [1, 2, 3, 4, 4, 3, 2, 1] as const;

/** Total squares the pile renders. */
export const PANEL_COUNT = COLUMN_COUNTS.reduce(
  (total, count) => total + count,
  0,
);

const SEED = 0x9a71c;

/** Opacity range of the acrylic squares. */
const OPACITY_RANGE = [0.82, 0.95] as const;

export interface ArtworkPanel extends TileOptics {
  id: string;
  /** Acrylic opacity; keeps the pile from reading as a flat grid. */
  opacity: number;
}

export interface ArtworkColumn {
  id: string;
  panels: readonly ArtworkPanel[];
}

export interface FooterArtworkPile {
  columns: readonly ArtworkColumn[];
}

const lerp = (min: number, max: number, ratio: number) =>
  min + (max - min) * ratio;

const createPanel = (index: number, random: () => number): ArtworkPanel => ({
  id: `panel-${index}`,
  gamma: lerp(GAMMA_RANGE[0], GAMMA_RANGE[1], random()),
  phi: (random() * Math.PI) / 2,
  opacity: lerp(OPACITY_RANGE[0], OPACITY_RANGE[1], random()),
});

/**
 * Builds the pile column by column. Panel indices run across the whole pile
 * rather than restarting per column, so every square gets its own seed and its
 * own film stack.
 */
export const createArtworkColumns = (
  counts: readonly number[] = COLUMN_COUNTS,
  seed = SEED,
): ArtworkColumn[] => {
  let panelIndex = 0;

  return counts.map((count, columnIndex) => {
    const panels = Array.from({ length: count }, () => {
      const index = panelIndex;
      panelIndex += 1;

      return createPanel(index, mulberry32(seed + index));
    });

    return { id: `column-${columnIndex}`, panels };
  });
};

/**
 * Flat sample used by the optics tests: the same generator, decoupled from the
 * pile shape so distributions can be checked over a full wall.
 */
export const createArtworkPanels = (
  count = PANEL_COUNT,
  seed = SEED,
): ArtworkPanel[] =>
  Array.from({ length: count }, (_, index) =>
    createPanel(index, mulberry32(seed + index)),
  );

let cachedPile: FooterArtworkPile | undefined;

/**
 * Built once per process: the panels are immutable, so the random walk does
 * not need to repeat on every request.
 */
export const createFooterArtworkPile = (): FooterArtworkPile => {
  cachedPile ??= { columns: createArtworkColumns() };

  return cachedPile;
};
