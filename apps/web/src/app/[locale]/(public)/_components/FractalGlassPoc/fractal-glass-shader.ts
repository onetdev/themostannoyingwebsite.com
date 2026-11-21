import { COMMON_SHADER } from './shaders/common';
import { FIELD_SHADER } from './shaders/field';
import { SURFACE_SHADER } from './shaders/surface';

export const VERTEX_SHADER = `#version 300 es
in vec2 aPosition;
out vec2 vUv;

void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

/**
 * Declarations shared by every shader chunk. The chunks are concatenated into
 * one program, so this stays a single draw call with no extra GPU passes.
 */
const FRAGMENT_HEADER = `#version 300 es
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
`;

export const FRAGMENT_SHADER = [
  FRAGMENT_HEADER,
  COMMON_SHADER,
  FIELD_SHADER,
  SURFACE_SHADER,
].join('\n');
