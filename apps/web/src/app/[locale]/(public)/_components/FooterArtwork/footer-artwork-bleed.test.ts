import {
  createFooterArtworkBleedTexture,
  EDGE_BLEED_MAX_DISTANCE,
  EDGE_BLEED_TEXTURE_WIDTH,
  REFERENCE_EDGE_BLEED_STOPS,
  sampleReferenceEdgeBleed,
} from './footer-artwork-bleed';

describe('footer artwork edge bleed', () => {
  it('starts at full strength and reaches zero at 40% of the cell', () => {
    expect(sampleReferenceEdgeBleed(0)).toBe(1);
    expect(sampleReferenceEdgeBleed(0.4)).toBe(0);
    expect(sampleReferenceEdgeBleed(0.5)).toBe(0);
  });

  it('is monotonic non-increasing', () => {
    let previous = sampleReferenceEdgeBleed(0);

    for (let step = 1; step <= 50; step += 1) {
      const value = sampleReferenceEdgeBleed((step / 50) * 0.5);

      expect(value).toBeLessThanOrEqual(previous + 1e-9);
      previous = value;
    }
  });

  it('interpolates between the measured stops', () => {
    const middle = (REFERENCE_EDGE_BLEED_STOPS[1]?.at ?? 0) / 2;

    expect(sampleReferenceEdgeBleed(middle)).toBeGreaterThan(0.61);
    expect(sampleReferenceEdgeBleed(middle)).toBeLessThan(1);
  });

  it('builds a deterministic RGBA LUT over the 0…0.5 range', () => {
    const data = createFooterArtworkBleedTexture();

    expect(data).toHaveLength(EDGE_BLEED_TEXTURE_WIDTH * 4);
    expect(data.slice(0, 3)).toEqual(new Uint8Array([255, 255, 255]));
    expect(data[EDGE_BLEED_TEXTURE_WIDTH - 1]).toBe(255);

    for (let index = 3; index < data.length; index += 4) {
      expect(data[index]).toBe(255);
    }

    const lastColorIndex = (EDGE_BLEED_TEXTURE_WIDTH - 1) * 4;

    expect(data[lastColorIndex]).toBe(
      Math.round(sampleReferenceEdgeBleed(EDGE_BLEED_MAX_DISTANCE) * 255),
    );
    expect([...createFooterArtworkBleedTexture()]).toEqual([...data]);
  });
});
