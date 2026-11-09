/**
 * Vertical fade curves for the gradient POC.
 *
 * The mask always starts at full opacity on the top edge. The selected curve
 * controls how quickly it loses opacity as it approaches the bottom edge. The
 * vertical fade slider still controls the opacity at that bottom edge.
 */

export const FALLOFF_CURVES = [
  'smooth',
  'plateau',
  'exponential',
  'gaussian',
  'ease-in',
  'ease-out',
  'cubic',
  'sqrt',
  'sqrt-tail',
  'linear',
] as const;

export type FalloffCurve = (typeof FALLOFF_CURVES)[number];

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

const smoothstep = (value: number) => {
  const t = clamp01(value);

  return t * t * (3 - 2 * t);
};

const FALLOFF_FUNCTIONS: Record<FalloffCurve, (t: number) => number> = {
  smooth: (t) => smoothstep(t),
  plateau: (t) => smoothstep((t - 0.2) / 0.8),
  exponential: (t) => {
    const k = 4;

    return (Math.exp(k * t) - 1) / (Math.exp(k) - 1);
  },
  gaussian: (t) => {
    const sigma = 0.5;

    return (
      (1 - Math.exp(-((t / sigma) ** 2))) / (1 - Math.exp(-((1 / sigma) ** 2)))
    );
  },
  'ease-in': (t) => t * t,
  'ease-out': (t) => 1 - (1 - t) * (1 - t),
  cubic: (t) => t * t * t,
  sqrt: (t) => Math.sqrt(clamp01(t)),
  // Sqrt shape for the first 70%, then a deliberate 10% → 0% tail.
  'sqrt-tail': (t) => {
    const pivot = 0.7;

    if (t <= pivot) {
      return 0.9 * Math.sqrt(clamp01(t / pivot));
    }

    return 0.9 + 0.1 * ((t - pivot) / (1 - pivot));
  },
  linear: (t) => t,
};

/**
 * Builds the vertical `mask-image` string. The first stop is always 100%
 * opacity; the last stop is `edgeAlpha`. The curve is sampled into enough
 * stops to look smooth.
 */
export const createVerticalFadeMask = (
  curve: FalloffCurve,
  edgeAlpha: number,
  steps = 32,
): string => {
  const falloff = FALLOFF_FUNCTIONS[curve];
  const target = clamp01(edgeAlpha);
  const sampleCount = Math.max(2, Math.floor(steps));
  const stops: string[] = [];

  for (let index = 0; index <= sampleCount; index += 1) {
    const t = index / sampleCount;
    const alpha = 1 - (1 - target) * clamp01(falloff(t));

    stops.push(`rgba(0, 0, 0, ${alpha.toFixed(4)}) ${(t * 100).toFixed(3)}%`);
  }

  return `linear-gradient(to bottom, ${stops.join(', ')})`;
};
