/**
 * GLSL for the footer wall.
 *
 * The wall is a mosaic of solid-colour glass cells. Every cell picks one of the
 * 25 CPGs with a deterministic PRNG seeded by its grid coordinates, and samples
 * that palette at its own phase offset. The offset is what makes the wall look
 * like the reference: without it every cell sits at the same palette position
 * and the whole wall swings through the same hue together.
 *
 * The glass read comes from a white edge bleed: strong at every seam, falling
 * away quickly but still visible up to ~40% of the cell, with a much brighter
 * hotspot at the corner intersections. The reference is top-lit, so the
 * top/bottom bands are about twice as strong as the left/right ones.
 *
 * Two POC variants are available behind `uBleedMode`:
 *   0 — analytic: an exponential core plus a quadratic tail.
 *   1 — measured: the sampled reference falloff from `uBleedLut`.
 * Both share the same corner oval and the same white blend.
 */

export const footerArtworkVertexShader = `
  attribute vec2 position;

  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

export const footerArtworkFragmentShader = `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uGrid;
  uniform float uCpgCount;
  uniform float uBleedMode;
  uniform float uBleedStrength;
  uniform sampler2D uPaletteAtlas;
  uniform sampler2D uBleedLut;

  const float TAU = 6.28318530718;

  const vec3 LUMA = vec3(0.2126, 0.7152, 0.0722);
  const vec3 WARM_WHITE = vec3(0.96, 0.94, 0.9);

  // The reference measures a top light: the top/bottom bands are about twice
  // as strong as the left/right bands.
  const float BAND_TOP_STRENGTH = 0.1;
  const float BAND_SIDE_STRENGTH = 0.065;
  const float CORNER_STRENGTH = 0.5;
  const float CORNER_RADIUS = 0.04;

  // Deterministic PRNG. The inputs are integer grid keys, so every cell keeps
  // its palette and phase across frames and resizes.
  float random21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float cpgSlot(vec2 key) {
    return min(floor(random21(key) * uCpgCount), uCpgCount - 1.0);
  }

  vec3 cpgColor(float slot, float position) {
    float row = (slot + 0.5) / uCpgCount;
    return texture2D(uPaletteAtlas, vec2(fract(position), row)).rgb;
  }

  // Analytic falloff: a narrow exponential core plus a linear tail that reaches
  // zero at 40% of the cell. It is a close fit to the measured curve below.
  float analyticBand(float distance) {
    float core = 0.4 * exp(-distance / 0.03);
    float tail =
      0.6 * (1.0 - clamp((distance - 0.1) / 0.3, 0.0, 1.0));
    return core + tail;
  }

  float measuredBand(float distance) {
    return texture2D(
      uBleedLut,
      vec2(clamp(distance / 0.5, 0.0, 1.0), 0.5)
    ).r;
  }

  float edgeBand(float distance) {
    return uBleedMode < 0.5
      ? analyticBand(distance)
      : measuredBand(distance);
  }

  void main() {
    vec2 cell = gl_FragCoord.xy / uResolution * uGrid;
    vec2 index = floor(cell);
    vec2 local = fract(cell);

    // Each cell has its own phase offset, so at any instant the wall mixes
    // warm, cool and magenta cells instead of sitting on one palette stop.
    float phase = random21(index + vec2(17.3, 29.1));
    float cellPalette = cpgSlot(index + vec2(0.37, 0.73));
    vec3 color = cpgColor(cellPalette, uTime + phase);

    // Per-cell diagonal sheen. The reference cells vary by roughly 9% luma and
    // 19% saturation across their surface, with a mostly random direction.
    float sheenAngle = random21(index + vec2(11.3, 7.7)) * TAU;
    vec2 sheenDirection = vec2(cos(sheenAngle), sin(sheenAngle));
    float sheen = dot(local - 0.5, sheenDirection);
    color *= 1.0 + sheen * 0.09;
    color = mix(vec3(dot(color, LUMA)), color, 1.0 + sheen * 0.18);

    // Normalised distances to the nearest vertical/horizontal cell edge. The
    // bleed is proportional to the cell, so the 40% reach survives any grid.
    float dx = min(local.x, 1.0 - local.x);
    float dy = min(local.y, 1.0 - local.y);

    float bandX = BAND_SIDE_STRENGTH * edgeBand(dx);
    float bandY = BAND_TOP_STRENGTH * edgeBand(dy);
    // The reference diagonal tail is the sum of the two adjacent edges.
    float band = clamp(bandX + bandY, 0.0, 1.0);

    // A small, bright oval centred on the nearest intersection. The measured
    // corner falls back to the band level within a few percent of the cell.
    float cx = dx / CORNER_RADIUS;
    float cy = dy / CORNER_RADIUS;
    float corner = exp(-(cx * cx + cy * cy));

    float bleed = clamp(
      (band + CORNER_STRENGTH * corner) * uBleedStrength,
      0.0,
      1.0
    );
    color = mix(color, WARM_WHITE, bleed);

    // A fraction of a code point of dithering keeps the flat fields from
    // banding on 8-bit displays.
    color += (random21(gl_FragCoord.xy) - 0.5) * (1.5 / 255.0);

    gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
  }
`;
