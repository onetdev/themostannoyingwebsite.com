import {
  createGradientCss,
  createGradientSteps,
  createRandomPalette,
  DEFAULT_GRADIENT_OPACITY,
  GRADIENT_POC_STEP_COUNT,
  gradientStopOpacity,
  mixRgb,
  rgbToHex,
} from './gradient-poc-colors';

describe('gradient POC colours', () => {
  it('builds exactly 100 valid hex steps', () => {
    const steps = createGradientSteps(12345);

    expect(steps).toHaveLength(GRADIENT_POC_STEP_COUNT);
    expect(steps).toHaveLength(100);

    for (const step of steps) {
      expect(step).toMatch(/^#[0-9a-f]{6}$/);
    }
  });

  it('is deterministic for the same seed', () => {
    expect(createGradientSteps(42)).toEqual(createGradientSteps(42));
  });

  it('changes when the seed changes', () => {
    expect(createGradientSteps(42)).not.toEqual(createGradientSteps(43));
  });

  it('anchors the first and last steps on the palette ends', () => {
    const palette = createRandomPalette(7);
    const steps = createGradientSteps(7);
    const first = palette[0];
    const last = palette[palette.length - 1];

    if (!first || !last) {
      throw new Error('Palette is empty');
    }

    expect(steps[0]).toBe(rgbToHex(first));
    expect(steps[steps.length - 1]).toBe(rgbToHex(last));
  });

  it('mixes RGB endpoints', () => {
    const black = { r: 0, g: 0, b: 0 };
    const white = { r: 255, g: 255, b: 255 };

    expect(mixRgb(black, white, 0)).toEqual(black);
    expect(mixRgb(black, white, 1)).toEqual(white);
    expect(mixRgb(black, white, 0.5)).toEqual({ r: 128, g: 128, b: 128 });
  });

  it('supports a custom step count', () => {
    expect(createGradientSteps(1, 10)).toHaveLength(10);
    expect(createGradientSteps(1, 1)).toHaveLength(1);
  });

  it('builds one smooth CSS gradient with 100 stops', () => {
    const steps = createGradientSteps(99);
    const css = createGradientCss(steps);
    const stops = css.match(/rgba\([^)]+\) [0-9.]+%/g);

    expect(css.startsWith('linear-gradient(to right, ')).toBe(true);
    expect(steps).toHaveLength(100);
    expect(stops).toHaveLength(100);
    expect(css).toContain(' 0%');
    expect(css).toContain(' 100%');
  });

  it('modulates stop opacity within the default range', () => {
    const alphas = Array.from({ length: 100 }, (_, index) =>
      gradientStopOpacity(index, 100),
    );

    for (const alpha of alphas) {
      expect(alpha).toBeGreaterThanOrEqual(DEFAULT_GRADIENT_OPACITY.min);
      expect(alpha).toBeLessThanOrEqual(DEFAULT_GRADIENT_OPACITY.max);
    }

    expect(Math.max(...alphas) - Math.min(...alphas)).toBeGreaterThan(0.2);
  });

  it('writes per-stop alpha into the CSS', () => {
    const css = createGradientCss(createGradientSteps(5));
    const alphas = [...css.matchAll(/rgba\([^)]+,\s*([0-9.]+)\)/g)].map(
      (match) => Number(match[1]),
    );

    expect(alphas).toHaveLength(100);
    expect(Math.min(...alphas)).toBeGreaterThanOrEqual(
      DEFAULT_GRADIENT_OPACITY.min,
    );
    expect(Math.max(...alphas)).toBeLessThanOrEqual(
      DEFAULT_GRADIENT_OPACITY.max,
    );
  });

  it('uses the configured opacity range', () => {
    const settings = {
      ...DEFAULT_GRADIENT_OPACITY,
      min: 0.3,
      max: 0.7,
    };
    const alphas = Array.from({ length: 101 }, (_, index) =>
      gradientStopOpacity(index, 101, settings),
    );

    for (const alpha of alphas) {
      expect(alpha).toBeGreaterThanOrEqual(0.3);
      expect(alpha).toBeLessThanOrEqual(0.7);
    }

    expect(Math.max(...alphas) - Math.min(...alphas)).toBeGreaterThan(0.2);
  });

  it('scales the wave with the amplitude control', () => {
    const settings = { ...DEFAULT_GRADIENT_OPACITY, amplitude: 0 };
    const center =
      (DEFAULT_GRADIENT_OPACITY.min + DEFAULT_GRADIENT_OPACITY.max) / 2;
    const alphas = Array.from({ length: 101 }, (_, index) =>
      gradientStopOpacity(index, 101, settings),
    );

    for (const alpha of alphas) {
      expect(alpha).toBeCloseTo(center, 5);
    }
  });

  it('changes the pattern with cycles and phase', () => {
    const sample = (overrides: Partial<typeof DEFAULT_GRADIENT_OPACITY>) =>
      Array.from({ length: 101 }, (_, index) =>
        gradientStopOpacity(index, 101, {
          ...DEFAULT_GRADIENT_OPACITY,
          ...overrides,
        }),
      );

    expect(sample({ cycles: 2 })).not.toEqual(sample({}));
    expect(sample({ phaseDegrees: 90 })).not.toEqual(sample({}));
  });

  it('falls back to a transparent gradient for an empty list', () => {
    expect(createGradientCss([])).toBe(
      'linear-gradient(to right, transparent, transparent)',
    );
  });
});
