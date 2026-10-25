import { mulberry32 } from '@maw/utils/random';
import type { CSSProperties } from 'react';

/**
 * Deterministic panel data for the dichroic footer artwork.
 *
 * The artwork is a small wall of 1:1 acrylic squares — twenty of them, stacked
 * in columns that grow in the middle and taper at both ends. Every square holds
 * its own dye; nothing about the arrangement is random, the shape is data.
 *
 * Everything is generated from one fixed seed so the server and the client
 * agree (no hydration mismatch) and the composition is stable between builds.
 * The generator emits only numbers as CSS custom properties — the paint lives in
 * `effects.css`, which keeps the per-panel payload tiny and lets the theme
 * re-tune lightness and chroma without a second data set.
 */

/** Squares per column, left to right. Must add up to the intended pile size. */
export const COLUMN_COUNTS = [1, 2, 3, 4, 4, 3, 2, 1] as const;

/** Total squares the pile renders. */
export const PANEL_COUNT = COLUMN_COUNTS.reduce(
  (total, count) => total + count,
  0,
);

const SEED = 0x9a71c;

/**
 * Percentage of the plate kept clear at each edge when a panel picks its base
 * window. The plate does not tile, so no square may sit hard against its
 * border; the scroll drift is still free to travel into this buffer.
 */
const EDGE_BUFFER = 10;

export interface ArtworkPanel {
  id: string;
  style: CSSProperties;
}

export interface ArtworkColumn {
  id: string;
  panels: readonly ArtworkPanel[];
}

export interface FooterArtworkPile {
  columns: readonly ArtworkColumn[];
}

interface HueFamily {
  /** Inclusive hue range in degrees. */
  range: readonly [number, number];
  /** Relative share of the pile. */
  weight: number;
  /** Dyes that read harsh at full chroma are dialled down. */
  chromaScale: number;
}

/**
 * Weighted after the reference: magenta/red carry the wall, blue and violet
 * provide the cold patches, amber and green are sparse accents.
 */
const HUE_FAMILIES: readonly HueFamily[] = [
  { range: [322, 354], weight: 4, chromaScale: 1 }, // magenta
  { range: [2, 26], weight: 3, chromaScale: 1 }, // red / coral
  { range: [34, 62], weight: 1, chromaScale: 0.95 }, // amber
  { range: [196, 232], weight: 2, chromaScale: 0.95 }, // blue
  { range: [174, 196], weight: 1, chromaScale: 0.75 }, // cyan
  { range: [262, 300], weight: 2, chromaScale: 0.9 }, // violet
  { range: [96, 148], weight: 1, chromaScale: 0.6 }, // green
];

const lerp = (min: number, max: number, ratio: number) =>
  min + (max - min) * ratio;

const normalizeHue = (hue: number) => ((hue % 360) + 360) % 360;

const pickFamily = (random: () => number) => {
  const total = HUE_FAMILIES.reduce((sum, family) => sum + family.weight, 0);
  let target = random() * total;

  for (const family of HUE_FAMILIES) {
    target -= family.weight;
    if (target <= 0) {
      return family;
    }
  }

  return HUE_FAMILIES[0];
};

/**
 * Secondary dye inside a panel: a near neighbour of the base hue, never a
 * complement. The reference blends analogous dyes (blue into cyan, pink into
 * red); the contrast comes from adjacent panels, not from within one square.
 */
const pickSecondaryHue = (hue: number, random: () => number) =>
  normalizeHue(hue + lerp(35, 95, random()) * (random() < 0.5 ? 1 : -1));

interface PanelTone {
  lightness: number;
  chroma: number;
  alpha: number;
  rim: number;
}

const createTone = (random: () => number, chromaScale: number): PanelTone => {
  const roll = random();

  // A few burned-out and a few near-black panels keep the pile from reading as
  // an evenly saturated gradient (both are present in the reference).
  if (roll < 0.06) {
    return {
      lightness: lerp(0.84, 0.92, random()),
      chroma: lerp(0.03, 0.06, random()),
      alpha: lerp(0.82, 0.94, random()),
      rim: lerp(0.18, 0.3, random()),
    };
  }

  if (roll < 0.12) {
    return {
      lightness: lerp(0.38, 0.48, random()),
      chroma: lerp(0.14, 0.2, random()) * chromaScale,
      alpha: lerp(0.84, 0.94, random()),
      rim: lerp(0.12, 0.24, random()),
    };
  }

  return {
    lightness: lerp(0.62, 0.82, random()),
    chroma: lerp(0.12, 0.21, random()) * chromaScale,
    alpha: lerp(0.8, 0.95, random()),
    rim: lerp(0.14, 0.3, random()),
  };
};

/**
 * The artwork plate is a single blurred colour field; each square samples its
 * own window of it. `--panel-bg-*` are percentage offsets, so they stay valid
 * regardless of how far the plate is zoomed in, and `--panel-turn` rotates the
 * window in quarter turns to break up the repetition of one shared gradient.
 */
const createPanel = (index: number, random: () => number): ArtworkPanel => {
  const family = pickFamily(random);
  const hue = lerp(family.range[0], family.range[1], random());
  const secondaryHue = pickSecondaryHue(hue, random);
  const tone = createTone(random, family.chromaScale);

  return {
    id: `panel-${index}`,
    style: {
      '--panel-h1': hue.toFixed(1),
      '--panel-h2': secondaryHue.toFixed(1),
      '--panel-l': tone.lightness.toFixed(3),
      '--panel-c': tone.chroma.toFixed(3),
      '--panel-alpha': tone.alpha.toFixed(2),
      '--panel-rim': tone.rim.toFixed(2),
      '--panel-x1': `${lerp(12, 88, random()).toFixed(1)}%`,
      '--panel-y1': `${lerp(10, 90, random()).toFixed(1)}%`,
      '--panel-x2': `${lerp(12, 88, random()).toFixed(1)}%`,
      '--panel-y2': `${lerp(10, 90, random()).toFixed(1)}%`,
      '--panel-angle': `${lerp(120, 220, random()).toFixed(0)}deg`,
      // Interior dye travel. Sign and size differ per panel so the pile does
      // not pulse in lockstep when the page scrolls.
      '--dye-x': `${(lerp(5, 11, random()) * (random() < 0.5 ? 1 : -1)).toFixed(1)}%`,
      '--dye-y': `${(lerp(3, 8, random()) * (random() < 0.5 ? 1 : -1)).toFixed(1)}%`,
      '--dye-r': `${(lerp(0.5, 3.5, random()) * (random() < 0.5 ? 1 : -1)).toFixed(1)}deg`,
      // Plate sampling, drawn last so the palette sequence above is unchanged.
      // Percentages keep the offset independent of how far the plate is zoomed;
      // quarter turns reuse the same gradient in four orientations. The base
      // window stays inside the edge buffer, while the drift may leave it.
      '--panel-bg-x': `${lerp(EDGE_BUFFER, 100 - EDGE_BUFFER, random()).toFixed(1)}%`,
      '--panel-bg-y': `${lerp(EDGE_BUFFER, 100 - EDGE_BUFFER, random()).toFixed(1)}%`,
      '--panel-turn': `${Math.floor(random() * 4) * 90}deg`,
    } as CSSProperties,
  };
};

/**
 * Builds the pile column by column. Panel indices run across the whole pile
 * rather than restarting per column, so every square gets its own seed and its
 * own dye.
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
 * Flat sample used by the palette tests: the same generator, decoupled from the
 * pile shape so statistics can be checked over a full wall.
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
 * Built once per server process: the panels are immutable, so the random walk
 * does not need to repeat on every request.
 */
export const createFooterArtworkPile = (): FooterArtworkPile => {
  cachedPile ??= { columns: createArtworkColumns() };

  return cachedPile;
};
