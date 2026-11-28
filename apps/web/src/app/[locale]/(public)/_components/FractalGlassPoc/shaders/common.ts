/**
 * Hash-based value noise and fbm shared by the blob field.
 *
 * This is plain source text: it is concatenated into the single fragment
 * shader at build time, so splitting it out costs nothing at runtime.
 */
export const COMMON_SHADER = `
float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float valueNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));

  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float total = 0.0;
  float amplitude = 0.5;

  for (int i = 0; i < 4; i++) {
    total += amplitude * valueNoise(p);
    p = p * 2.03 + 17.0;
    amplitude *= 0.5;
  }

  return total;
}
`;
