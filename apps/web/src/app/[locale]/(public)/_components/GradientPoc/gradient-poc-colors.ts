/**
 * Colour helpers for the 100-step gradient POC.
 *
 * A random seed picks a five-colour palette spread around the hue wheel. The
 * palette is then linearly interpolated in RGB into exactly 100 steps, which
 * the component renders as 100 equal-width bands.
 */

export interface RgbColor {
  readonly r: number;
  readonly g: number;
  readonly b: number;
}

export const GRADIENT_POC_STEP_COUNT = 100;
const PALETTE_SIZE = 5;

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

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

const hueToChannel = (
  hue: number,
  saturation: number,
  lightness: number,
  offset: number,
): number => {
  let value = hue + offset;

  if (value < 0) {
    value += 1;
  }

  if (value > 1) {
    value -= 1;
  }

  if (saturation === 0) {
    return lightness;
  }

  const q =
    lightness < 0.5
      ? lightness * (1 + saturation)
      : lightness + saturation - lightness * saturation;
  const p = 2 * lightness - q;

  if (value < 1 / 6) {
    return p + (q - p) * 6 * value;
  }

  if (value < 1 / 2) {
    return q;
  }

  if (value < 2 / 3) {
    return p + (q - p) * (2 / 3 - value) * 6;
  }

  return p;
};

const hslToRgb = (
  hue: number,
  saturation: number,
  lightness: number,
): RgbColor => {
  const normalizedHue = (((hue % 360) + 360) % 360) / 360;
  const s = clamp01(saturation);
  const l = clamp01(lightness);

  return {
    r: Math.round(hueToChannel(normalizedHue, s, l, 1 / 3) * 255),
    g: Math.round(hueToChannel(normalizedHue, s, l, 0) * 255),
    b: Math.round(hueToChannel(normalizedHue, s, l, -1 / 3) * 255),
  };
};

const toHexChannel = (value: number) =>
  Math.min(255, Math.max(0, Math.round(value)))
    .toString(16)
    .padStart(2, '0');

export const rgbToHex = ({ r, g, b }: RgbColor): string =>
  `#${toHexChannel(r)}${toHexChannel(g)}${toHexChannel(b)}`;

export const mixRgb = (
  from: RgbColor,
  to: RgbColor,
  ratio: number,
): RgbColor => {
  const t = clamp01(ratio);

  return {
    r: Math.round(from.r + (to.r - from.r) * t),
    g: Math.round(from.g + (to.g - from.g) * t),
    b: Math.round(from.b + (to.b - from.b) * t),
  };
};

export const createRandomPalette = (
  seed: number,
  size = PALETTE_SIZE,
): RgbColor[] => {
  const random = createRandom(seed);
  const paletteSize = Math.max(2, Math.trunc(size));
  const baseHue = random() * 360;
  const palette: RgbColor[] = [];

  for (let index = 0; index < paletteSize; index += 1) {
    const hue =
      (baseHue + (index / paletteSize) * 360 + (random() - 0.5) * 50 + 360) %
      360;
    const saturation = 0.65 + random() * 0.3;
    const lightness = 0.45 + random() * 0.2;

    palette.push(hslToRgb(hue, saturation, lightness));
  }

  return palette;
};

const samplePalette = (
  palette: readonly RgbColor[],
  position: number,
): RgbColor => {
  const first = palette[0] ?? { r: 0, g: 0, b: 0 };

  if (palette.length < 2) {
    return first;
  }

  const scaled = clamp01(position) * (palette.length - 1);
  const index = Math.min(palette.length - 2, Math.floor(scaled));
  const from = palette[index] ?? first;
  const to = palette[index + 1] ?? from;

  return mixRgb(from, to, scaled - index);
};

export const createGradientSteps = (
  seed: number,
  stepCount = GRADIENT_POC_STEP_COUNT,
): string[] => {
  const palette = createRandomPalette(seed);
  const count = Math.max(1, Math.trunc(stepCount));

  if (count === 1) {
    return [rgbToHex(samplePalette(palette, 0))];
  }

  return Array.from({ length: count }, (_, index) =>
    rgbToHex(samplePalette(palette, index / (count - 1))),
  );
};

export interface GradientOpacitySettings {
  /** Lowest opacity in the wave, `0 … 1`. */
  readonly min: number;
  /** Highest opacity in the wave, `0 … 1`. */
  readonly max: number;
  /** How much of the min/max range the wave actually uses, `0 … 1`. */
  readonly amplitude: number;
  /** Number of base cycles across the strip. */
  readonly cycles: number;
  /** Phase offset in degrees. */
  readonly phaseDegrees: number;
}

export const DEFAULT_GRADIENT_OPACITY: GradientOpacitySettings = {
  min: 0.7,
  max: 1,
  amplitude: 1,
  cycles: 1,
  phaseDegrees: 0,
};

const clampOpacity = (value: number) => Math.min(1, Math.max(0, value));

/**
 * A composite wave instead of a pure sine.
 *
 * The three components use incommensurate frequencies and fixed phase
 * offsets, so the opacity drifts in a less regular way while staying smooth.
 * The coefficients sum to one, which keeps the result inside `-1 … 1`.
 */
const compositeWave = (
  position: number,
  cycles: number,
  phaseDegrees: number,
): number => {
  const base =
    position * Math.PI * 2 * Math.max(0, cycles) +
    (phaseDegrees * Math.PI) / 180;

  return (
    Math.sin(base) * 0.55 +
    Math.sin(base * 2.17 + 1.7) * 0.3 +
    Math.sin(base * 3.61 + 0.4) * 0.15
  );
};

/**
 * Normalises the composite wave across the strip to `-1 … 1`, so the opacity
 * min/max sliders actually reach their bounds at least once.
 */
const normalizedCompositeWave = (
  index: number,
  count: number,
  cycles: number,
  phaseDegrees: number,
): number => {
  if (count <= 1) {
    return 0;
  }

  const values: number[] = [];
  let min = Number.POSITIVE_INFINITY;
  let max = Number.NEGATIVE_INFINITY;

  for (let sample = 0; sample < count; sample += 1) {
    const value = compositeWave(sample / (count - 1), cycles, phaseDegrees);
    values.push(value);
    min = Math.min(min, value);
    max = Math.max(max, value);
  }

  const span = max - min;
  const raw = values[Math.min(index, values.length - 1)] ?? 0;

  return span > 1e-9 ? ((raw - min) / span) * 2 - 1 : 0;
};

/**
 * Opacity for one stop, driven by the composite wave above.
 */
export const gradientStopOpacity = (
  index: number,
  count: number,
  settings: GradientOpacitySettings = DEFAULT_GRADIENT_OPACITY,
): number => {
  const min = clampOpacity(settings.min);
  const max = clampOpacity(settings.max);
  const center = (min + max) / 2;
  const fullAmplitude = Math.abs(max - min) / 2;
  const amplitude =
    fullAmplitude * Math.min(1, Math.max(0, settings.amplitude));
  const wave = normalizedCompositeWave(
    index,
    count,
    settings.cycles,
    settings.phaseDegrees,
  );

  return Math.round(clampOpacity(center - amplitude * wave) * 1000) / 1000;
};

const hexToRgb = (hex: string): RgbColor => {
  const value = Number.parseInt(hex.replace('#', ''), 16);

  return {
    r: (value >> 16) & 0xff,
    g: (value >> 8) & 0xff,
    b: value & 0xff,
  };
};

const toRgba = (hex: string, alpha: number): string => {
  const { r, g, b } = hexToRgb(hex);

  return `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(3)})`;
};

export type GradientDirection = 'to right' | 'to bottom';

export const createGradientCss = (
  colors: readonly string[],
  settings: GradientOpacitySettings = DEFAULT_GRADIENT_OPACITY,
  direction: GradientDirection = 'to right',
): string => {
  if (colors.length === 0) {
    return 'linear-gradient(to right, transparent, transparent)';
  }

  const stops = colors.map((color, index) => {
    const position =
      colors.length <= 1 ? 0 : (index / (colors.length - 1)) * 100;
    const alpha = gradientStopOpacity(index, colors.length, settings);

    return `${toRgba(color, alpha)} ${position}%`;
  });

  return `linear-gradient(${direction}, ${stops.join(', ')})`;
};
