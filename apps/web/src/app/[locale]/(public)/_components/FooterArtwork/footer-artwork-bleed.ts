/**
 * Edge-light model for the footer wall.
 *
 * The reference wall is lit from its edges: the glass tiles pick up a soft
 * white bleed that is strong at the seam, fades quickly and still contributes
 * up to roughly 40% of the cell from the edge. The corner intersections also
 * carry a much brighter, smaller hotspot.
 *
 * The measured falloff below is the normalised delta-luma profile from the
 * reference video, sampled inward from a top edge at the middle of the edge.
 * It is used by the "measured LUT" POC variant; the "analytic" variant fits the
 * same shape with an exponential core plus a quadratic tail.
 */

export const EDGE_BLEED_TEXTURE_WIDTH = 64;
export const EDGE_BLEED_MAX_DISTANCE = 0.5;

interface BleedStop {
  /** Distance from the edge as a fraction of the cross-axis cell side. */
  readonly at: number;
  /** Normalised intensity, `0 … 1`. */
  readonly value: number;
}

/** Measured reference profile, normalised to its value at the edge. */
export const REFERENCE_EDGE_BLEED_STOPS: readonly BleedStop[] = [
  { at: 0, value: 1 },
  { at: 0.05, value: 0.61 },
  { at: 0.1, value: 0.585 },
  { at: 0.15, value: 0.512 },
  { at: 0.2, value: 0.415 },
  { at: 0.25, value: 0.293 },
  { at: 0.3, value: 0.171 },
  { at: 0.35, value: 0.073 },
  { at: 0.4, value: 0 },
];

/**
 * Samples the measured edge falloff. `distance` is horizontal for left/right
 * edges and vertical for top/bottom edges, normalised to the cell side.
 */
export const sampleReferenceEdgeBleed = (distance: number): number => {
  if (distance <= 0) {
    return 1;
  }

  if (distance >= EDGE_BLEED_MAX_DISTANCE) {
    return 0;
  }

  let previous = REFERENCE_EDGE_BLEED_STOPS[0];

  if (!previous) {
    return 0;
  }

  for (let index = 1; index < REFERENCE_EDGE_BLEED_STOPS.length; index += 1) {
    const current = REFERENCE_EDGE_BLEED_STOPS[index];

    if (!current) {
      continue;
    }

    if (distance <= current.at) {
      const span = current.at - previous.at;
      const ratio = span > 0 ? (distance - previous.at) / span : 0;

      return previous.value + (current.value - previous.value) * ratio;
    }

    previous = current;
  }

  return 0;
};

/**
 * RGBA texture data for the measured edge falloff: one horizontal row, sampled
 * over the `0 … 0.5` cell-side range. The shader reads the red channel.
 */
export const createFooterArtworkBleedTexture = (
  width = EDGE_BLEED_TEXTURE_WIDTH,
): Uint8Array => {
  const data = new Uint8Array(width * 4);
  const divisor = Math.max(1, width - 1);

  for (let index = 0; index < width; index += 1) {
    const distance = (index / divisor) * EDGE_BLEED_MAX_DISTANCE;
    const value = Math.round(sampleReferenceEdgeBleed(distance) * 255);
    const offset = index * 4;

    data[offset] = value;
    data[offset + 1] = value;
    data[offset + 2] = value;
    data[offset + 3] = 255;
  }

  return data;
};
