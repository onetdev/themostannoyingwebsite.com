/**
 * The glass surface itself: per-tile refraction, dispersion, bevel, the
 * pixel-accurate outline, the moving edge dashes, tone mapping and grain.
 */
export const SURFACE_SHADER = `
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
