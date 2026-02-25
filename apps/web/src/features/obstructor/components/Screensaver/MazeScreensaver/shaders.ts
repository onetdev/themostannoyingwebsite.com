// GLSL blocks
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
  uniform sampler2D tOverlay;

  uniform float uOverlayEnabled;
  uniform float uOverlayOpacity;
  uniform float uOverlayScale;

  varying vec2 vUv;

  void main() {
    vec4 baseColor = texture2D(tMap, vUv);

    vec4 finalColor = baseColor;

    if (uOverlayEnabled > 0.5) {
      vec2 overlayUv = vUv * uOverlayScale;
      vec4 overlayColor = texture2D(tOverlay, overlayUv);

      float alpha = overlayColor.a * uOverlayOpacity;

      finalColor.rgb = mix(baseColor.rgb, overlayColor.rgb, alpha);
    }

    gl_FragColor = finalColor;
  }
`;
