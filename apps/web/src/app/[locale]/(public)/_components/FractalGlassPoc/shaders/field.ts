/**
 * The animated colour field: eleven additive Gaussian blobs plus a broad
 * palette wash, warped by fbm noise. This is the "background generator"
 * layer, evaluated analytically for every fragment.
 */
export const FIELD_SHADER = `
// Low-frequency field of additive Gaussian blobs, sampled in [-1, 1] space.
vec3 lightField(vec2 p, vec2 warpUv) {
  float t = uTime * 0.22;
  float spread = uBlobSpread;

  vec2 p1 = vec2(-0.82 + sin(t * 0.7 + 0.5) * 0.28, -0.35 + cos(t * 0.5) * 0.18);
  vec2 p2 = vec2(-0.36 + sin(t * 0.4 + 1.2) * 0.32, 0.08 + cos(t * 0.6) * 0.22);
  vec2 p3 = vec2(0.02 + sin(t * 0.5 + 3.4) * 0.34, -0.10 + cos(t * 0.4) * 0.20);
  vec2 p4 = vec2(0.48 + sin(t * 0.3 + 2.3) * 0.32, 0.34 + cos(t * 0.7) * 0.18);
  vec2 p5 = vec2(0.90 + sin(t * 0.6 + 1.1) * 0.26, -0.28 + cos(t * 0.4) * 0.20);
  vec2 p6 = vec2(-0.15 + sin(t * 0.5 + 2.0) * 0.30, 0.48 + cos(t * 0.6 + 0.4) * 0.16);
  vec2 p7 = vec2(0.62 + sin(t * 0.45 + 4.0) * 0.28, -0.48 + cos(t * 0.5 + 1.9) * 0.16);

  // Smaller, faster blobs layered on top by the detail control.
  vec2 p8 = vec2(-0.64 + sin(t * 0.9 + 2.6) * 0.22, 0.28 + cos(t * 0.8 + 1.1) * 0.16);
  vec2 p9 = vec2(0.24 + sin(t * 0.7 + 5.1) * 0.24, -0.34 + cos(t * 0.9 + 3.3) * 0.16);
  vec2 p10 = vec2(0.78 + sin(t * 0.8 + 0.9) * 0.20, 0.42 + cos(t * 0.7 + 2.4) * 0.14);
  vec2 p11 = vec2(-0.05 + sin(t * 1.1 + 4.4) * 0.20, -0.52 + cos(t * 0.6 + 0.8) * 0.12);

  vec2 warp =
    vec2(
      fbm(warpUv * uWarpScale + t),
      fbm(warpUv * uWarpScale + 11.7 - t)
    ) - 0.5;
  vec2 q = p + warp * uWarpStrength;

  // Broad palette wash so the band always carries colour, even between blobs.
  float washX = smoothstep(-1.1, 1.1, q.x);
  float washY = smoothstep(-0.8, 0.8, q.y);
  vec3 wash = mix(mix(uC1, uC2, washX), mix(uC3, uC4, washX), washY);
  vec3 color = wash * 0.5;

  color += uC1 * exp(-dot(q - p1 * spread, q - p1 * spread) * 11.0) * 1.6;
  color += uC2 * exp(-dot(q - p2 * spread, q - p2 * spread) * 17.0) * 1.9;
  color += uC3 * exp(-dot(q - p3 * spread, q - p3 * spread) * 9.0) * 1.7;
  color += uC4 * exp(-dot(q - p4 * spread, q - p4 * spread) * 13.0) * 1.5;
  color += uC5 * exp(-dot(q - p5 * spread, q - p5 * spread) * 21.0) * 1.1;
  color += uC2 * exp(-dot(q - p6 * spread, q - p6 * spread) * 16.0) * 1.4;
  color += uC4 * exp(-dot(q - p7 * spread, q - p7 * spread) * 15.0) * 1.3;

  color += uC3 * exp(-dot(q - p8 * spread, q - p8 * spread) * 26.0) * 1.1 * uDetail;
  color += uC5 * exp(-dot(q - p9 * spread, q - p9 * spread) * 30.0) * 1.0 * uDetail;
  color += uC2 * exp(-dot(q - p10 * spread, q - p10 * spread) * 24.0) * 1.2 * uDetail;
  color += uC1 * exp(-dot(q - p11 * spread, q - p11 * spread) * 28.0) * 1.0 * uDetail;

  return color;
}
`;
