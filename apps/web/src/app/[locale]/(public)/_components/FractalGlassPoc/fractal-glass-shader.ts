export const VERTEX_SHADER = `#version 300 es
in vec2 aPosition;
out vec2 vUv;

void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

export const FRAGMENT_SHADER = `#version 300 es
precision highp float;

in vec2 vUv;
out vec4 fragColor;

uniform float uTime;
uniform vec2 uGrid;
uniform vec2 uResolution;
uniform float uRefraction;
uniform float uExposure;
uniform float uGrain;
uniform float uDispersion;
uniform float uBevel;
uniform float uOutline;
uniform float uOutlineSize;
uniform float uEdgeSpeed;
uniform float uEdgeGlow;
uniform float uStreakLength;
uniform float uDetail;
uniform float uWarpScale;
uniform float uWarpStrength;
uniform float uBlobSpread;
uniform vec3 uC1;
uniform vec3 uC2;
uniform vec3 uC3;
uniform vec3 uC4;
uniform vec3 uC5;

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

  vec3 color = vec3(0.015, 0.020, 0.050);
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

void main() {
  vec2 gridUv = vUv * uGrid;
  vec2 local = fract(gridUv) - 0.5;
  float radius = dot(local, local);

  // Beveled glass block: push the sample outwards more towards the tile rim.
  vec2 offset = local / uGrid * uRefraction * (0.5 + 2.4 * radius);
  vec2 refracted = vUv + offset;

  // Compress the vertical field range so the blobs fill a wide footer band.
  vec2 fieldP = (refracted * 2.0 - 1.0) * vec2(1.0, 0.72);
  vec3 color = lightField(fieldP, vUv);

  // Chromatic dispersion near the rim where the refraction is strongest.
  float fringe =
    smoothstep(0.30, 0.5, max(abs(local.x), abs(local.y))) * uDispersion;
  color.r *= 1.0 + fringe * 0.08;
  color.b *= 1.0 - fringe * 0.08;
  color += vec3(0.05, 0.0, 0.07) * fringe;

  // Inner bevel: darker on the far side, lit on the near side.
  float edge =
    smoothstep(0.44, 0.5, max(abs(local.x), abs(local.y))) * uBevel;
  vec2 normal = normalize(local + 1e-5);
  float facing = clamp(dot(normal, normalize(vec2(-0.55, 0.84))), 0.0, 1.0);
  color *= 1.0 - edge * (0.28 - facing * 0.20);
  color += vec3(0.14, 0.12, 0.10) * edge * facing;

  // Pixel-accurate grout distances so the outline stays 1-2px wide.
  vec2 cellSizePx = uResolution / uGrid;
  float lineDistX = abs(fract(gridUv.x + 0.5) - 0.5) * cellSizePx.x;
  float lineDistY = abs(fract(gridUv.y + 0.5) - 0.5) * cellSizePx.y;
  float outlineWidth = max(uOutlineSize, 0.5);
  float outlineH = 1.0 - smoothstep(outlineWidth * 0.5, outlineWidth, lineDistY);
  float outlineV = 1.0 - smoothstep(outlineWidth * 0.5, outlineWidth, lineDistX);

  // Exponential tone mapping keeps the overbright blob cores creamy.
  color = 1.0 - exp(-color * uExposure);

  // Thin perimeter highlight instead of corner pinpoints.
  float outline = max(outlineH, outlineV) * uOutline;

  // Steal the dash colour from the blob field before the white outline is
  // added, so the dashes stay saturated instead of washing out.
  float dashPeak = max(color.r, max(color.g, color.b));
  vec3 dashTint = color / max(dashPeak, 0.3);

  color += vec3(1.0, 0.98, 0.94) * outline * 0.3;

  // Elongated highlights sliding along each grout line.
  float lineH = floor(gridUv.y + 0.5);
  float lineV = floor(gridUv.x + 0.5);
  float phaseH = hash21(vec2(lineH, 13.7));
  float dirH = hash21(vec2(lineH, 7.1)) > 0.5 ? 1.0 : -1.0;
  float phaseV = hash21(vec2(lineV, 3.9));
  float dirV = hash21(vec2(lineV, 9.3)) > 0.5 ? 1.0 : -1.0;
  float travelH = fract(dirH * uTime * 0.6 * uEdgeSpeed + phaseH);
  float travelV = fract(dirV * uTime * 0.6 * uEdgeSpeed + phaseV);
  // Circular distance so a dash wraps around instead of leaving the canvas.
  float rawDistH = abs(gridUv.x - travelH * uGrid.x);
  float rawDistV = abs(gridUv.y - travelV * uGrid.y);
  float distH = min(rawDistH, uGrid.x - rawDistH);
  float distV = min(rawDistV, uGrid.y - rawDistV);
  float streakLength = max(uStreakLength, 0.25);
  // The streaks are wider than the outline, so they read as soft dashes.
  float streakBandH = 1.0 - smoothstep(0.0, outlineWidth * 3.5, lineDistY);
  float streakBandV = 1.0 - smoothstep(0.0, outlineWidth * 3.5, lineDistX);
  float streakH = exp(-pow(distH / streakLength, 2.0) * 3.0) * streakBandH;
  float streakV = exp(-pow(distV / streakLength, 2.0) * 3.0) * streakBandV;
  float edgeGlow = max(streakH, streakV) * uEdgeGlow;
  color += dashTint * edgeGlow * 0.85;

  float grain = hash21(gl_FragCoord.xy + uTime * 60.0) - 0.5;
  color += grain * uGrain * max(color.r, max(color.g, color.b));

  fragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}
`;
