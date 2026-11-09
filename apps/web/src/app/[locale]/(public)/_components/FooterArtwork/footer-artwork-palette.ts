/**
 * Colour palette gradients for the footer wall.
 *
 * The twenty-five source gradients are linear colour sets; their original
 * `135deg` angle is intentionally ignored. At usage level every palette is
 * treated as a closed loop: `c1 → … → cn → c1`, with each segment occupying the
 * same fraction of the loop. The source arrays themselves are not duplicated or
 * modified — the wrap is a property of the sampler, which keeps `T = 1` equal
 * to `T = 0` without jumps.
 *
 * The 25 palettes are packed into a 2D texture (one row per palette). The shader
 * picks a row with a PRNG and samples horizontally with the animation phase.
 *
 * The raw CPG gamut is not what the reference wall looks like: it is darker and
 * carries a lot of purple and green, while the reference is mostly warm orange
 * and red with cyan/blue and a little magenta. When the atlas is built, every
 * sampled colour is therefore remapped through the hue, saturation and value
 * distributions measured from the reference video. The source arrays stay
 * untouched; the remap is a usage-level tone map, exactly like the cyclic wrap.
 */

export type CpgRgb = readonly [number, number, number];

export interface FooterArtworkCpg {
  readonly id: number;
  readonly name: string;
  /** Source hex colours, in order. Never extended with a duplicated first stop. */
  readonly colors: readonly string[];
}

export const FOOTER_ARTWORK_CPGS: readonly FooterArtworkCpg[] = [
  {
    id: 1,
    name: 'Neon Prism Cascade',
    colors: ['#300350', '#7b0099', '#ff007f', '#ff5500', '#ffaa00'],
  },
  {
    id: 2,
    name: 'Spectrum Matrix',
    colors: ['#ff0055', '#ff5500', '#ffcc00', '#00e5ff', '#0044ff'],
  },
  {
    id: 3,
    name: 'Cosmic Sunset Wave',
    colors: ['#03001e', '#7303c0', '#ec38bc', '#fdeff9', '#ff9900'],
  },
  {
    id: 4,
    name: 'Electric Solar Flare',
    colors: ['#ff3300', '#ff7700', '#ffdd00', '#88ff00', '#00ffcc'],
  },
  {
    id: 5,
    name: 'Deep Violet Dawn',
    colors: ['#0d0826', '#2a085c', '#6c118a', '#b8238f', '#e85375', '#ff925c'],
  },
  {
    id: 6,
    name: 'Cyber Synthwave',
    colors: ['#ff007f', '#aa00ff', '#0055ff', '#00e5ff', '#00ffaa'],
  },
  {
    id: 7,
    name: 'Velvet Ignition',
    colors: ['#4a00e0', '#8e2de2', '#f000ff', '#ff0055', '#ff8800'],
  },
  {
    id: 8,
    name: 'Molten Horizon',
    colors: ['#ff416c', '#ff4b2b', '#ff9068', '#fffb7d', '#00d2ff'],
  },
  {
    id: 9,
    name: 'Oceanic Abyss',
    colors: ['#0f2027', '#203a43', '#2c5364', '#3a7bd5', '#00d2ff', '#92fe9d'],
  },
  {
    id: 10,
    name: 'Neon Twilight Fusion',
    colors: ['#fc466b', '#3f5efb', '#00c6ff', '#0072ff', '#11002c'],
  },
  {
    id: 11,
    name: 'Hyperdrive Glow',
    colors: ['#8a2be2', '#d100d1', '#ff0066', '#ff6600', '#ffcc00', '#ffffff'],
  },
  {
    id: 12,
    name: 'Frosted Amber Night',
    colors: ['#111d42', '#1f4068', '#e43f5a', '#ff9a76', '#fff3cd'],
  },
  {
    id: 13,
    name: 'Infra-Purple Burn',
    colors: ['#1a0033', '#4d0066', '#990099', '#e60073', '#ff3300', '#ffaa00'],
  },
  {
    id: 14,
    name: 'Cyber Pulse Ocean',
    colors: ['#000428', '#004e92', '#0099ff', '#00e5ff', '#7efb6d'],
  },
  {
    id: 15,
    name: 'Full Rainbow Matrix',
    colors: ['#ff0033', '#ff6600', '#ffcc00', '#33cc33', '#0099ff', '#6600cc'],
  },
  {
    id: 16,
    name: 'Crimson Ember Shift',
    colors: ['#2c003e', '#510a32', '#851342', '#c72c41', '#ee4540', '#f7c59f'],
  },
  {
    id: 17,
    name: 'Velvet Sunset Grid',
    colors: ['#0f0c1b', '#2d1f47', '#5c2c6d', '#99386d', '#d45069', '#f78259'],
  },
  {
    id: 18,
    name: 'Electric Tropic Heat',
    colors: ['#00223e', '#1d976c', '#93f9b9', '#fffa65', '#ff5e62'],
  },
  {
    id: 19,
    name: 'Berry Flare',
    colors: ['#400036', '#780206', '#c9184a', '#ff4d6d', '#ff8fa3', '#fff0f3'],
  },
  {
    id: 20,
    name: 'Frosted Amethyst',
    colors: ['#0b091a', '#1a153b', '#352b68', '#5c449b', '#8a64cc', '#c097f6'],
  },
  {
    id: 21,
    name: 'Aurora LED Surge',
    colors: ['#ff7b00', '#ffae00', '#38ef7d', '#11998e', '#0575e6'],
  },
  {
    id: 22,
    name: 'Muted Cobalt Fog',
    colors: ['#2e003e', '#3d2352', '#3d3b5e', '#3d5a80', '#98c1d9', '#e0fbfc'],
  },
  {
    id: 23,
    name: 'Radiant Citrus Flame',
    colors: ['#ff0844', '#ff4e50', '#f9d423', '#e1eec3', '#f05f57'],
  },
  {
    id: 24,
    name: 'Ultraviolet Abyss',
    colors: ['#10002b', '#240046', '#3c096c', '#5a189a', '#7b2cbf', '#9d4edd'],
  },
  {
    id: 25,
    name: 'Holographic Pixel Grid',
    colors: ['#ff5e00', '#ff0077', '#6100ff', '#00b7ff', '#00ffaa', '#ffe600'],
  },
];

export const CPG_COUNT = FOOTER_ARTWORK_CPGS.length;
export const CPG_TEXTURE_WIDTH = 256;

const parseHex = (hex: string): CpgRgb => {
  const value = Number.parseInt(hex.replace('#', ''), 16);

  return [(value >> 16) & 0xff, (value >> 8) & 0xff, value & 0xff];
};

export const FOOTER_ARTWORK_CPG_STOPS: readonly (readonly CpgRgb[])[] =
  FOOTER_ARTWORK_CPGS.map((cpg) => cpg.colors.map(parseHex));

/**
 * Samples one CPG at `position` (0 … 1), treating the palette as a closed loop
 * with equal-sized segments. The final `cn → c1` segment exists only here, at
 * usage level; the source definition stays `c1 … cn`.
 */
export const sampleCpg = (cpgIndex: number, position: number): CpgRgb => {
  const stops =
    FOOTER_ARTWORK_CPG_STOPS[
      Math.min(CPG_COUNT - 1, Math.max(0, Math.trunc(cpgIndex)))
    ] ?? FOOTER_ARTWORK_CPG_STOPS[0];

  if (!stops || stops.length === 0) {
    return [0, 0, 0];
  }

  const wrapped = ((position % 1) + 1) % 1;
  const scaled = wrapped * stops.length;
  const segment = Math.floor(scaled) % stops.length;
  const ratio = scaled - Math.floor(scaled);
  const from = stops[segment] ?? stops[0];
  const to = stops[(segment + 1) % stops.length] ?? stops[0];

  if (!from || !to) {
    return [0, 0, 0];
  }

  const mix = (a: number, b: number) => Math.round(a + (b - a) * ratio);

  return [mix(from[0], to[0]), mix(from[1], to[1]), mix(from[2], to[2])];
};

export interface FooterArtworkHsv {
  /** Hue in degrees, `0 … 360`. */
  readonly h: number;
  /** Saturation, `0 … 1`. */
  readonly s: number;
  /** Value, `0 … 1`. */
  readonly v: number;
}

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

export const footerArtworkRgbToHsv = ([
  red,
  green,
  blue,
]: CpgRgb): FooterArtworkHsv => {
  const r = red / 255;
  const g = green / 255;
  const b = blue / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  let hue = 0;

  if (delta > 0) {
    if (max === r) {
      hue = ((g - b) / delta) % 6;
    } else if (max === g) {
      hue = (b - r) / delta + 2;
    } else {
      hue = (r - g) / delta + 4;
    }

    hue *= 60;

    if (hue < 0) {
      hue += 360;
    }
  }

  return { h: hue, s: max === 0 ? 0 : delta / max, v: max };
};

export const footerArtworkHsvToRgb = ({
  h,
  s,
  v,
}: FooterArtworkHsv): CpgRgb => {
  const hue = ((h % 360) + 360) % 360;
  const chroma = v * s;
  const sector = hue / 60;
  const x = chroma * (1 - Math.abs((sector % 2) - 1));
  const match = v - chroma;
  let red = 0;
  let green = 0;
  let blue = 0;

  if (sector < 1) {
    red = chroma;
    green = x;
  } else if (sector < 2) {
    red = x;
    green = chroma;
  } else if (sector < 3) {
    green = chroma;
    blue = x;
  } else if (sector < 4) {
    green = x;
    blue = chroma;
  } else if (sector < 5) {
    red = x;
    blue = chroma;
  } else {
    red = chroma;
    blue = x;
  }

  return [
    Math.round(clamp01(red + match) * 255),
    Math.round(clamp01(green + match) * 255),
    Math.round(clamp01(blue + match) * 255),
  ];
};

interface WeightedValue {
  readonly value: number;
  readonly weight: number;
}

interface WeightedCdf {
  readonly values: readonly number[];
  readonly cumulative: readonly number[];
}

const buildWeightedCdf = (samples: readonly WeightedValue[]): WeightedCdf => {
  const sorted = [...samples].sort((a, b) => a.value - b.value);
  const total = sorted.reduce((sum, sample) => sum + sample.weight, 0);
  const values: number[] = [];
  const cumulative: number[] = [];
  let running = 0;

  for (const sample of sorted) {
    running += sample.weight;
    values.push(sample.value);
    cumulative.push(total > 0 ? running / total : 0);
  }

  return { values, cumulative };
};

const buildUniformCdf = (samples: readonly number[]): WeightedCdf =>
  buildWeightedCdf(samples.map((value) => ({ value, weight: 1 })));

interface QuantileRange {
  readonly start: number;
  readonly end: number;
}

const cdfQuantileRange = (cdf: WeightedCdf, value: number): QuantileRange => {
  if (cdf.values.length === 0) {
    return { start: 0, end: 0 };
  }

  // First index whose value is >= the target.
  let low = 0;
  let high = cdf.values.length;

  while (low < high) {
    const middle = (low + high) >> 1;

    if ((cdf.values[middle] ?? 0) < value) {
      low = middle + 1;
    } else {
      high = middle;
    }
  }

  const first = low;

  // First index whose value is > the target.
  high = cdf.values.length;

  while (low < high) {
    const middle = (low + high) >> 1;

    if ((cdf.values[middle] ?? 0) <= value) {
      low = middle + 1;
    } else {
      high = middle;
    }
  }

  const last = low;
  const start = first > 0 ? (cdf.cumulative[first - 1] ?? 0) : 0;
  const end = last > 0 ? (cdf.cumulative[last - 1] ?? 0) : 0;

  return { start, end };
};

/**
 * Spreading duplicate values over their shared rank range keeps a block of
 * identical stops from collapsing onto a single output value. The jitter is
 * deterministic per colour, so the atlas stays stable across builds.
 */
const spreadQuantile = (range: QuantileRange, jitter: number): number =>
  range.start + (range.end - range.start) * clamp01(jitter);

const hashColor = ([red, green, blue]: CpgRgb, salt: number): number => {
  let hash = Math.imul(red + 1, 73856093);
  hash ^= Math.imul(green + 1, 19349663);
  hash ^= Math.imul(blue + 1, 83492791);
  hash ^= Math.imul(salt, 2654435761);
  hash = Math.imul(hash ^ (hash >>> 16), 2246822507);
  hash = Math.imul(hash ^ (hash >>> 13), 3266489909);

  return ((hash ^ (hash >>> 16)) >>> 0) / 4294967296;
};

const cdfValueAt = (cdf: WeightedCdf, quantile: number): number => {
  if (cdf.values.length === 0) {
    return 0;
  }

  const target = clamp01(quantile);
  let low = 0;
  let high = cdf.cumulative.length - 1;

  while (low < high) {
    const middle = (low + high) >> 1;

    if ((cdf.cumulative[middle] ?? 0) < target) {
      low = middle + 1;
    } else {
      high = middle;
    }
  }

  return cdf.values[low] ?? cdf.values[0] ?? 0;
};

/**
 * Saturation-weighted hue histogram of the reference wall, measured from 1,440
 * cell-centre samples over ten seconds. Bins are ten degrees wide and the
 * values are percentages.
 */
export const REFERENCE_HUE_DISTRIBUTION = [
  2.48, 20.22, 18.27, 15.35, 2.99, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  8.81, 6.33, 1.97, 0.7, 1.15, 1.24, 1.08, 0.81, 1.25, 0.68, 1.01, 1.12, 3.22,
  4.52, 3.91, 2.9,
] as const;

/** Reference HSV value quantiles, measured at 5% steps. */
export const REFERENCE_VALUE_QUANTILES = [
  0.435, 0.655, 0.702, 0.725, 0.753, 0.776, 0.788, 0.8, 0.812, 0.827, 0.847,
  0.875, 0.898, 0.933, 0.961, 0.98, 0.988, 0.988, 0.992, 0.996, 1,
] as const;

/** Reference HSV saturation quantiles, measured at 5% steps. */
export const REFERENCE_SATURATION_QUANTILES = [
  0.01, 0.126, 0.198, 0.246, 0.289, 0.35, 0.427, 0.482, 0.521, 0.555, 0.594,
  0.638, 0.694, 0.754, 0.816, 0.877, 0.946, 0.991, 0.996, 1, 1,
] as const;

const CPG_REFERENCE_SAMPLE_COUNT = 256;
const HUE_BIN_DEGREES = 10;
const HUE_BIN_STEPS = 12;

const buildReferenceHueCdf = (): WeightedCdf => {
  const samples: WeightedValue[] = [];

  for (const [bin, weight] of REFERENCE_HUE_DISTRIBUTION.entries()) {
    if (weight <= 0) {
      continue;
    }

    for (let step = 0; step < HUE_BIN_STEPS; step += 1) {
      samples.push({
        value:
          bin * HUE_BIN_DEGREES +
          ((step + 0.5) / HUE_BIN_STEPS) * HUE_BIN_DEGREES,
        weight: weight / HUE_BIN_STEPS,
      });
    }
  }

  return buildWeightedCdf(samples);
};

const quantileTableValueAt = (
  table: readonly number[],
  quantile: number,
): number => {
  if (table.length === 0) {
    return 0;
  }

  const scaled = clamp01(quantile) * (table.length - 1);
  const lower = Math.floor(scaled);
  const upper = Math.min(table.length - 1, lower + 1);
  const ratio = scaled - lower;
  const from = table[lower] ?? 0;
  const to = table[upper] ?? from;

  return from + (to - from) * ratio;
};

const collectCpgSamples = (): CpgRgb[] => {
  const colors: CpgRgb[] = [];

  for (let cpg = 0; cpg < CPG_COUNT; cpg += 1) {
    for (let index = 0; index < CPG_REFERENCE_SAMPLE_COUNT; index += 1) {
      colors.push(sampleCpg(cpg, index / CPG_REFERENCE_SAMPLE_COUNT));
    }
  }

  return colors;
};

const buildReferenceGamut = () => {
  const colors = collectCpgSamples();
  const hueSamples: WeightedValue[] = [];
  const values: number[] = [];
  const saturations: number[] = [];

  for (const color of colors) {
    const hsv = footerArtworkRgbToHsv(color);

    if (hsv.s > 0.05) {
      hueSamples.push({ value: hsv.h, weight: hsv.s });
    }

    values.push(hsv.v);
    saturations.push(hsv.s);
  }

  const sourceHue = buildWeightedCdf(hueSamples);
  const sourceValue = buildUniformCdf(values);
  const sourceSaturation = buildUniformCdf(saturations);
  const targetHue = buildReferenceHueCdf();

  return {
    hue: (hue: number, jitter: number) =>
      cdfValueAt(
        targetHue,
        spreadQuantile(cdfQuantileRange(sourceHue, hue), jitter),
      ),
    value: (value: number, jitter: number) =>
      quantileTableValueAt(
        REFERENCE_VALUE_QUANTILES,
        spreadQuantile(cdfQuantileRange(sourceValue, value), jitter),
      ),
    saturation: (saturation: number, jitter: number) =>
      quantileTableValueAt(
        REFERENCE_SATURATION_QUANTILES,
        spreadQuantile(cdfQuantileRange(sourceSaturation, saturation), jitter),
      ),
  };
};

const REFERENCE_GAMUT = buildReferenceGamut();

/**
 * Moves one CPG colour into the reference wall's gamut. Hue, saturation and
 * value are each matched through their measured distribution; the correlation
 * between them is deliberately not preserved, because the reference palettes
 * are not the CPG palettes.
 */
export const mapToReferenceGamut = (color: CpgRgb): CpgRgb => {
  const hsv = footerArtworkRgbToHsv(color);
  const hueJitter = hashColor(color, 1);
  const saturationJitter = hashColor(color, 2);
  const valueJitter = hashColor(color, 3);

  return footerArtworkHsvToRgb({
    h: REFERENCE_GAMUT.hue(hsv.h, hueJitter),
    s: REFERENCE_GAMUT.saturation(hsv.s, saturationJitter),
    v: REFERENCE_GAMUT.value(hsv.v, valueJitter),
  });
};

/**
 * The hue remap has to compress the CPG gamut's green/yellow and purple ranges
 * into the reference's much narrower distribution. That leaves a few hard hue
 * steps in the atlas, which read as a cell snapping colour in a single frame.
 * A short circular average along each palette row removes those steps without
 * changing the overall distribution or adding green.
 */
const ATLAS_SMOOTHING_RADIUS = 2;

const sampleMappedRow = (row: number, width: number): CpgRgb[] => {
  const colors: CpgRgb[] = [];

  for (let column = 0; column < width; column += 1) {
    colors.push(mapToReferenceGamut(sampleCpg(row, column / width)));
  }

  return colors;
};

const smoothPaletteRow = (
  colors: readonly CpgRgb[],
  radius: number,
): CpgRgb[] => {
  const width = colors.length;
  const taps = radius * 2 + 1;

  return colors.map((_, column) => {
    let red = 0;
    let green = 0;
    let blue = 0;

    for (let offset = -radius; offset <= radius; offset += 1) {
      const color = colors[(column + offset + width) % width] ?? colors[0];

      if (!color) {
        continue;
      }

      red += color[0];
      green += color[1];
      blue += color[2];
    }

    return [
      Math.round(red / taps),
      Math.round(green / taps),
      Math.round(blue / taps),
    ] as const;
  });
};

/**
 * RGBA texture data for the shader. One horizontal row per CPG; row selection
 * happens in the shader, horizontal interpolation is done by the GPU's linear
 * filter (with `wrapS: REPEAT` so the `cn → c1` segment is seamless). Every
 * texel is tone-mapped into the measured reference gamut, then lightly smoothed
 * so the animation has no single-frame colour snaps.
 */
export const createFooterArtworkCpgTexture = (
  width = CPG_TEXTURE_WIDTH,
): Uint8Array => {
  const data = new Uint8Array(width * CPG_COUNT * 4);

  for (let row = 0; row < CPG_COUNT; row += 1) {
    const colors = smoothPaletteRow(
      sampleMappedRow(row, width),
      ATLAS_SMOOTHING_RADIUS,
    );

    for (let column = 0; column < width; column += 1) {
      const [red, green, blue] = colors[column] ?? [0, 0, 0];
      const offset = (row * width + column) * 4;

      data[offset] = red;
      data[offset + 1] = green;
      data[offset + 2] = blue;
      data[offset + 3] = 255;
    }
  }

  return data;
};
