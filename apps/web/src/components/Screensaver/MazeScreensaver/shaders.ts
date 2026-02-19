export const texturedVertex = `
  attribute vec3 position;
  attribute vec2 uv;

  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;

  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const texturedFragment = `
  precision highp float;

  uniform sampler2D tMap;
  varying vec2 vUv;

  void main() {
    gl_FragColor = texture2D(tMap, vUv);
  }
`;
