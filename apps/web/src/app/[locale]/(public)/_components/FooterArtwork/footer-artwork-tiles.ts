/**
 * Deterministic tile sheets for the dichroic footer artwork.
 *
 * The reference footage is a wall of translucent acrylic squares lit from
 * behind: every cell holds one dye, and the whole mosaic re-arranges whenever
 * the camera changes angle. Reproducing that with hundreds of DOM nodes costs
 * layout and paint on every frame, so instead each plane's mosaic is baked once
 * into an SVG data URI. The plane then drifts as a single composited
 * `transform`, and three planes with different colour families and speeds
 * overlap under `mix-blend-mode` — that overlap, not the individual tiles, is
 * what produces the slowly boiling colour field.
 *
 * Everything here is a pure function of fixed seeds, so the server renders the
 * same sheet on every request (no hydration mismatch) and the markup stays
 * cache-friendly.
 */

/** Side of a single tile in the generated sheet, in SVG pixels. */
const TILE_SIZE = 64;
/** Tiles across the sheet. Kept near 18 so a desktop band shows ~5.5 % cells. */
const COLUMNS = 18;
/** Tiles down the sheet; the band's aspect ratio scales them to square-ish. */
const ROWS = 6;
/** Light leak between the acrylic squares, in SVG pixels. */
const TILE_GAP = 2;
/** Control points of the colour field; the mosaic is interpolated between them. */
const ANCHOR_COLUMNS = 5;
const ANCHOR_ROWS = 3;

export const PANEL_SHEET_WIDTH = TILE_SIZE * COLUMNS;
export const PANEL_SHEET_HEIGHT = TILE_SIZE * ROWS;

export type PanelLayerId = 'back' | 'mid' | 'front';

export interface PanelLayer {
  id: PanelLayerId;
  /** Ready-to-use `background-image` value for the plane. */
  dataUri: string;
  /** Seconds for one back-and-forth drift cycle. */
  duration: number;
  /** Horizontal drift amplitude, as a percentage of the plane's width. */
  amplitude: number;
  /** Scroll-parallax multiplier; the back plane moves less than the front. */
  depth: number;
  opacity: number;
  /** Depth-of-field softening, in pixels. */
  blur: number;
}

export interface PanelSheet {
  width: number;
  height: number;
  svg: string;
  dataUri: string;
}

export interface TileFamily {
  /** Hue range for the plane's dominant dye. */
  hue: readonly [number, number];
  saturation: readonly [number, number];
  lightness: readonly [number, number];
  /** Fraction of cells that are painted at all. */
  density: number;
  /** Fraction of painted cells that burn out to near-white highlights. */
  highlightChance: number;
  /** Fraction of cells that borrow the neighbouring dye instead. */
  accentChance: number;
  accentHue: readonly [number, number];
}

interface PanelLayerSpec {
  id: PanelLayerId;
  seed: number;
  duration: number;
  amplitude: number;
  depth: number;
  opacity: number;
  blur: number;
  family: TileFamily;
}

/**
 * Magenta dominates (as in the footage), cyan/violet sit on the middle plane
 * and warm amber/lime accents ride on the front plane. Keeping the families
 * separate is what makes the overlap change colour as the planes slide.
 */
const LAYER_SPECS: readonly PanelLayerSpec[] = [
  {
    id: 'back',
    seed: 0x5eed01,
    duration: 43,
    amplitude: 4,
    depth: 0.45,
    opacity: 0.68,
    blur: 1.2,
    family: {
      hue: [324, 352],
      saturation: [76, 96],
      lightness: [50, 68],
      density: 1,
      highlightChance: 0.04,
      accentChance: 0.1,
      accentHue: [188, 208],
    },
  },
  {
    id: 'mid',
    seed: 0x5eed02,
    duration: 37,
    amplitude: 7,
    depth: 0.8,
    opacity: 0.62,
    blur: 0.4,
    family: {
      hue: [182, 208],
      saturation: [66, 90],
      lightness: [48, 64],
      density: 0.46,
      highlightChance: 0.03,
      accentChance: 0.22,
      accentHue: [296, 328],
    },
  },
  {
    id: 'front',
    seed: 0x5eed03,
    duration: 28,
    amplitude: 11,
    depth: 1.2,
    opacity: 0.82,
    blur: 0,
    family: {
      hue: [30, 58],
      saturation: [80, 98],
      lightness: [50, 66],
      density: 0.22,
      highlightChance: 0.08,
      accentChance: 0.16,
      accentHue: [98, 132],
    },
  },
];

/** Mulberry32 — tiny, fast, and stable across runtimes. */
const createRandom = (seed: number) => {
  let state = seed >>> 0;

  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
};

const lerp = (min: number, max: number, ratio: number) =>
  min + (max - min) * ratio;

const toHexChannel = (value: number) =>
  Math.round(value * 255)
    .toString(16)
    .padStart(2, '0');

/** `hsl()` → `#rrggbb`, so the generated sheet stays compact. */
export const hslToHex = (
  hue: number,
  saturation: number,
  lightness: number,
): string => {
  const s = saturation / 100;
  const l = lightness / 100;
  const channel = (offset: number) => {
    const k = (offset + hue / 30) % 12;
    return l - s * Math.min(l, 1 - l) * Math.max(-1, Math.min(k - 3, 9 - k, 1));
  };

  return `#${toHexChannel(channel(0))}${toHexChannel(channel(8))}${toHexChannel(channel(4))}`;
};

const toOpacity = (value: number) => value.toFixed(2).replace(/^0/, '');

interface Tile {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  opacity: string;
}

interface ColourAnchor {
  hue: number;
  saturation: number;
  lightness: number;
}

/**
 * Coarse colour field. Sampling it bilinearly gives the mosaic *regions* of
 * similar dye — the footage never looks like per-cell confetti, the colour
 * drifts across the wall in patches.
 */
const createAnchors = (
  family: TileFamily,
  random: () => number,
): ColourAnchor[] => {
  const anchors: ColourAnchor[] = [];

  for (let row = 0; row < ANCHOR_ROWS; row += 1) {
    for (let column = 0; column < ANCHOR_COLUMNS; column += 1) {
      const isAccent = random() < family.accentChance;
      const [hueMin, hueMax] = isAccent ? family.accentHue : family.hue;

      anchors.push({
        hue: lerp(hueMin, hueMax, random()),
        saturation: lerp(family.saturation[0], family.saturation[1], random()),
        lightness: lerp(family.lightness[0], family.lightness[1], random()),
      });
    }
  }

  return anchors;
};

const anchorAt = (
  anchors: readonly ColourAnchor[],
  column: number,
  row: number,
) => anchors[row * ANCHOR_COLUMNS + column];

/** Bilinear sample; the horizontal axis wraps so the sheet repeats seamlessly. */
const sampleAnchors = (
  anchors: readonly ColourAnchor[],
  x: number,
  y: number,
): ColourAnchor => {
  const fieldX = (x / COLUMNS) * ANCHOR_COLUMNS;
  const fieldY = (y / ROWS) * (ANCHOR_ROWS - 1);
  const column = Math.floor(fieldX);
  const row = Math.min(Math.floor(fieldY), ANCHOR_ROWS - 1);
  const nextRow = Math.min(row + 1, ANCHOR_ROWS - 1);
  const ratioX = fieldX - column;
  const ratioY = fieldY - row;
  const left = column % ANCHOR_COLUMNS;
  const right = (column + 1) % ANCHOR_COLUMNS;
  const mix = (key: keyof ColourAnchor) =>
    lerp(
      lerp(
        anchorAt(anchors, left, row)[key],
        anchorAt(anchors, right, row)[key],
        ratioX,
      ),
      lerp(
        anchorAt(anchors, left, nextRow)[key],
        anchorAt(anchors, right, nextRow)[key],
        ratioX,
      ),
      ratioY,
    );

  return {
    hue: mix('hue'),
    saturation: mix('saturation'),
    lightness: mix('lightness'),
  };
};

const tileKey = (column: number, row: number) => `${column}:${row}`;

/** Chance that two neighbouring squares are cut from one wider panel. */
const MERGE_CHANCE = 0.05;

const pickColumnsWide = (
  column: number,
  row: number,
  occupied: ReadonlySet<string>,
  random: () => number,
) =>
  column < COLUMNS - 1 &&
  !occupied.has(tileKey(column + 1, row)) &&
  random() < MERGE_CHANCE
    ? 2
    : 1;

const createTile = (
  family: TileFamily,
  anchors: readonly ColourAnchor[],
  placement: { column: number; row: number; columnsWide: number },
  random: () => number,
): Tile => {
  const { column, row, columnsWide } = placement;
  const colour = sampleAnchors(anchors, column + 0.5, row + 0.5);
  const isHighlight = random() < family.highlightChance;
  const hue = colour.hue + lerp(-4, 4, random());
  const saturation = isHighlight ? lerp(18, 40, random()) : colour.saturation;
  const lightness = isHighlight
    ? lerp(78, 90, random())
    : colour.lightness + lerp(-3, 3, random());

  return {
    x: column * TILE_SIZE + TILE_GAP / 2,
    y: row * TILE_SIZE + TILE_GAP / 2,
    width: columnsWide * TILE_SIZE - TILE_GAP,
    height: TILE_SIZE - TILE_GAP,
    fill: hslToHex(hue, saturation, lightness),
    opacity: toOpacity(lerp(0.55, 0.95, random())),
  };
};

const createTiles = (family: TileFamily, seed: number): Tile[] => {
  const random = createRandom(seed);
  const anchors = createAnchors(family, random);
  const occupied = new Set<string>();
  const tiles: Tile[] = [];

  for (let row = 0; row < ROWS; row += 1) {
    for (let column = 0; column < COLUMNS; column += 1) {
      if (occupied.has(tileKey(column, row)) || random() > family.density) {
        continue;
      }

      const columnsWide = pickColumnsWide(column, row, occupied, random);
      occupied.add(tileKey(column, row));
      if (columnsWide === 2) {
        occupied.add(tileKey(column + 1, row));
      }

      tiles.push(
        createTile(family, anchors, { column, row, columnsWide }, random),
      );
    }
  }

  return tiles;
};

const createSvg = (tiles: readonly Tile[]) => {
  const rects = tiles
    .map(
      (tile) =>
        `<rect x='${tile.x}' y='${tile.y}' width='${tile.width}' height='${tile.height}' fill='${tile.fill}' fill-opacity='${tile.opacity}' stroke='#fff' stroke-opacity='.05'/>`,
    )
    .join('');

  return `<svg xmlns='http://www.w3.org/2000/svg' width='${PANEL_SHEET_WIDTH}' height='${PANEL_SHEET_HEIGHT}' viewBox='0 0 ${PANEL_SHEET_WIDTH} ${PANEL_SHEET_HEIGHT}'>${rects}</svg>`;
};

export const createPanelSheet = (
  family: TileFamily,
  seed: number,
): PanelSheet => {
  const svg = createSvg(createTiles(family, seed));

  return {
    width: PANEL_SHEET_WIDTH,
    height: PANEL_SHEET_HEIGHT,
    svg,
    dataUri: `data:image/svg+xml,${encodeURIComponent(svg)}`,
  };
};

let cachedLayers: readonly PanelLayer[] | undefined;

/**
 * Three pre-rendered planes, generated once per server process. The sheets are
 * immutable, so caching keeps the (small) generation cost off every request.
 */
export const createFooterArtworkLayers = (): readonly PanelLayer[] => {
  cachedLayers ??= LAYER_SPECS.map((spec) => ({
    id: spec.id,
    dataUri: createPanelSheet(spec.family, spec.seed).dataUri,
    duration: spec.duration,
    amplitude: spec.amplitude,
    depth: spec.depth,
    opacity: spec.opacity,
    blur: spec.blur,
  }));

  return cachedLayers;
};
