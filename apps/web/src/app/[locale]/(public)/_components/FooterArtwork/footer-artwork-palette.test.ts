import {
  CPG_COUNT,
  CPG_TEXTURE_WIDTH,
  createFooterArtworkCpgTexture,
  FOOTER_ARTWORK_CPG_STOPS,
  FOOTER_ARTWORK_CPGS,
  footerArtworkRgbToHsv,
  mapToReferenceGamut,
  REFERENCE_HUE_DISTRIBUTION,
  REFERENCE_SATURATION_QUANTILES,
  REFERENCE_VALUE_QUANTILES,
  sampleCpg,
} from './footer-artwork-palette';

const readAtlasColors = (width = CPG_TEXTURE_WIDTH) => {
  const data = createFooterArtworkCpgTexture(width);
  const colors: [number, number, number][] = [];

  for (let index = 0; index < data.length; index += 4) {
    colors.push([data[index] ?? 0, data[index + 1] ?? 0, data[index + 2] ?? 0]);
  }

  return colors;
};

const percentile = (values: readonly number[], position: number) => {
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.min(
    sorted.length - 1,
    Math.max(0, Math.round(position * (sorted.length - 1))),
  );

  return sorted[index] ?? 0;
};

const hueDistribution = (colors: readonly [number, number, number][]) => {
  const bins = Array.from({ length: 36 }, () => 0);

  for (const color of colors) {
    const hsv = footerArtworkRgbToHsv(color);

    if (hsv.s <= 0.12) {
      continue;
    }

    bins[Math.floor(hsv.h / 10) % 36] =
      (bins[Math.floor(hsv.h / 10) % 36] ?? 0) + hsv.s;
  }

  const total = bins.reduce((sum, value) => sum + value, 0) || 1;

  return bins.map((value) => (value / total) * 100);
};

describe('footer artwork colour palette gradients', () => {
  it('contains all twenty-five CPGs with five or six stops', () => {
    expect(CPG_COUNT).toBe(25);
    expect(FOOTER_ARTWORK_CPGS).toHaveLength(25);
    expect(FOOTER_ARTWORK_CPGS.map((cpg) => cpg.id)).toEqual(
      Array.from({ length: 25 }, (_, index) => index + 1),
    );

    for (const cpg of FOOTER_ARTWORK_CPGS) {
      expect(cpg.colors.length).toBeGreaterThanOrEqual(5);
      expect(cpg.colors.length).toBeLessThanOrEqual(6);

      for (const color of cpg.colors) {
        expect(color).toMatch(/^#[0-9a-f]{6}$/i);
      }
    }
  });

  it('keeps the CPG definitions untouched and wraps only when sampling', () => {
    for (const cpg of FOOTER_ARTWORK_CPG_STOPS) {
      expect(cpg.at(0)).not.toEqual(cpg.at(-1));
    }
  });

  it('samples every stop at equally spaced positions', () => {
    for (let cpgIndex = 0; cpgIndex < CPG_COUNT; cpgIndex += 1) {
      const stops = FOOTER_ARTWORK_CPG_STOPS[cpgIndex];

      if (!stops) {
        throw new Error(`Missing CPG ${cpgIndex}`);
      }

      stops.forEach((stop, index) => {
        expect(sampleCpg(cpgIndex, index / stops.length)).toEqual(stop);
      });

      // The wrap segment ends back on the first stop.
      expect(sampleCpg(cpgIndex, 1)).toEqual(stops[0]);
    }
  });

  it('uses equal length segments including the closing wrap segment', () => {
    const cpgIndex = 0;
    const stops = FOOTER_ARTWORK_CPG_STOPS[cpgIndex];

    if (!stops) {
      throw new Error('Missing first CPG');
    }

    for (let index = 0; index < stops.length; index += 1) {
      const from = stops[index];
      const to = stops[(index + 1) % stops.length];
      const midpoint = (index + 0.5) / stops.length;

      if (!from || !to) {
        throw new Error('Missing stop');
      }

      const sampled = sampleCpg(cpgIndex, midpoint);
      const expected = from.map((channel, channelIndex) =>
        Math.round(channel + ((to[channelIndex] ?? 0) - channel) * 0.5),
      );

      sampled.forEach((channel, channelIndex) => {
        expect(
          Math.abs(channel - (expected[channelIndex] ?? 0)),
        ).toBeLessThanOrEqual(1);
      });
    }
  });

  it('wraps positions around the loop', () => {
    expect(sampleCpg(3, 1.25)).toEqual(sampleCpg(3, 0.25));
    expect(sampleCpg(3, -0.25)).toEqual(sampleCpg(3, 0.75));
  });

  it('lifts the dark CPG stops out of near-black', () => {
    const darkest = mapToReferenceGamut([3, 0, 30]);
    const hsv = footerArtworkRgbToHsv(darkest);

    expect(hsv.v).toBeGreaterThanOrEqual(
      (REFERENCE_VALUE_QUANTILES[0] ?? 0) - 0.02,
    );
  });

  it('tone-maps the atlas into the measured reference gamut', () => {
    const colors = readAtlasColors();
    const saturation = colors.map((color) => footerArtworkRgbToHsv(color).s);
    const value = colors.map((color) => footerArtworkRgbToHsv(color).v);

    const measuredHue = hueDistribution(colors);

    REFERENCE_HUE_DISTRIBUTION.forEach((target, bin) => {
      expect(Math.abs((measuredHue[bin] ?? 0) - target)).toBeLessThanOrEqual(3);
    });

    for (let step = 0; step <= 20; step += 1) {
      const position = step / 20;
      const measuredValue = percentile(value, position);
      const measuredSaturation = percentile(saturation, position);
      // The palette smoothing moves the very ends of the distribution a little;
      // the body of the distribution is the part that matters visually.
      const tolerance = step === 0 || step === 20 ? 0.1 : 0.03;

      expect(
        Math.abs(measuredValue - (REFERENCE_VALUE_QUANTILES[step] ?? 0)),
      ).toBeLessThanOrEqual(tolerance);
      expect(
        Math.abs(
          measuredSaturation - (REFERENCE_SATURATION_QUANTILES[step] ?? 0),
        ),
      ).toBeLessThanOrEqual(tolerance);
    }
  });

  it('builds a 25-row RGBA atlas', () => {
    const data = createFooterArtworkCpgTexture();

    expect(data).toHaveLength(CPG_TEXTURE_WIDTH * CPG_COUNT * 4);

    for (let index = 3; index < data.length; index += 4) {
      expect(data[index]).toBe(255);
    }
  });

  it('keeps the atlas free of abrupt hue flips', () => {
    const data = createFooterArtworkCpgTexture();
    const rowLength = CPG_TEXTURE_WIDTH * 4;
    let largestStep = 0;

    for (let row = 0; row < CPG_COUNT; row += 1) {
      for (let column = 0; column < CPG_TEXTURE_WIDTH; column += 1) {
        const nextColumn = (column + 1) % CPG_TEXTURE_WIDTH;
        const from = row * rowLength + column * 4;
        const to = row * rowLength + nextColumn * 4;
        const step = Math.hypot(
          (data[from] ?? 0) - (data[to] ?? 0),
          (data[from + 1] ?? 0) - (data[to + 1] ?? 0),
          (data[from + 2] ?? 0) - (data[to + 2] ?? 0),
        );

        largestStep = Math.max(largestStep, step);
      }
    }

    expect(largestStep).toBeLessThan(120);
  });

  it('is deterministic', () => {
    expect([...createFooterArtworkCpgTexture(32)]).toEqual([
      ...createFooterArtworkCpgTexture(32),
    ]);
  });
});
