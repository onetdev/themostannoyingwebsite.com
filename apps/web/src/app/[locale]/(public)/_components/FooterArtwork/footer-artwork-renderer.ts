import { Mesh, Program, Renderer, Texture, Triangle, Vec2 } from 'ogl';
import {
  createFooterArtworkBleedTexture,
  EDGE_BLEED_TEXTURE_WIDTH,
} from './footer-artwork-bleed';
import { getFooterArtworkGrid } from './footer-artwork-geometry';
import {
  CPG_COUNT,
  CPG_TEXTURE_WIDTH,
  createFooterArtworkCpgTexture,
} from './footer-artwork-palette';
import {
  footerArtworkFragmentShader,
  footerArtworkVertexShader,
} from './footer-artwork-shaders';

/**
 * OGL renderer for the footer wall.
 *
 * Kept out of the React component (and imported dynamically) so the WebGL
 * library never participates in the initial page load or in server rendering.
 * The caller owns the frame loop; this module only knows how to size itself and
 * draw one frame for a given loop position.
 */

export const FOOTER_ARTWORK_MAX_DPR = 2;

export type FooterArtworkBleedMode = 'analytic' | 'lut';

export interface FooterArtworkRenderer {
  /** Re-reads the stage size and the device pixel ratio. */
  resize: () => void;
  /** Draws one frame. `time` is the loop position in the 0 … 1 range. */
  render: (time: number) => void;
  /** Updates the edge-light strength without recreating the renderer. */
  setBleedStrength: (strength: number) => void;
  /** Releases every GPU object owned by the renderer. */
  destroy: () => void;
}

export interface FooterArtworkRendererOptions {
  canvas: HTMLCanvasElement;
  stage: HTMLElement;
  bleedMode?: FooterArtworkBleedMode;
  bleedStrength?: number;
  onFirstFrame?: () => void;
  onFailure?: () => void;
}

const clampBleedStrength = (value: number) => Math.min(3, Math.max(0, value));

export const createFooterArtworkRenderer = ({
  canvas,
  stage,
  bleedMode = 'analytic',
  bleedStrength = 1,
  onFirstFrame,
  onFailure,
}: FooterArtworkRendererOptions): FooterArtworkRenderer => {
  const renderer = new Renderer({
    canvas,
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    preserveDrawingBuffer: false,
    powerPreference: 'low-power',
    dpr: Math.min(window.devicePixelRatio || 1, FOOTER_ARTWORK_MAX_DPR),
  });
  const gl = renderer.gl;
  const palette = new Texture(gl, {
    image: createFooterArtworkCpgTexture(),
    width: CPG_TEXTURE_WIDTH,
    height: CPG_COUNT,
    format: gl.RGBA,
    internalFormat: gl.RGBA,
    type: gl.UNSIGNED_BYTE,
    minFilter: gl.LINEAR,
    magFilter: gl.LINEAR,
    wrapS: gl.REPEAT,
    wrapT: gl.CLAMP_TO_EDGE,
    generateMipmaps: false,
    flipY: false,
    unpackAlignment: 4,
  });
  const bleedLut = new Texture(gl, {
    image: createFooterArtworkBleedTexture(),
    width: EDGE_BLEED_TEXTURE_WIDTH,
    height: 1,
    format: gl.RGBA,
    internalFormat: gl.RGBA,
    type: gl.UNSIGNED_BYTE,
    minFilter: gl.LINEAR,
    magFilter: gl.LINEAR,
    wrapS: gl.CLAMP_TO_EDGE,
    wrapT: gl.CLAMP_TO_EDGE,
    generateMipmaps: false,
    flipY: false,
    unpackAlignment: 4,
  });
  const program = new Program(gl, {
    vertex: footerArtworkVertexShader,
    fragment: footerArtworkFragmentShader,
    depthTest: false,
    depthWrite: false,
    cullFace: false,
    uniforms: {
      uTime: { value: 0 },
      uResolution: { value: new Vec2(1, 1) },
      uGrid: { value: new Vec2(1, 1) },
      uCpgCount: { value: CPG_COUNT },
      uBleedMode: { value: bleedMode === 'lut' ? 1 : 0 },
      uBleedStrength: { value: clampBleedStrength(bleedStrength) },
      uPaletteAtlas: { value: palette },
      uBleedLut: { value: bleedLut },
    },
  });
  const geometry = new Triangle(gl);
  const mesh = new Mesh(gl, { geometry, program });

  let firstFrameSent = false;
  let disposed = false;

  gl.clearColor(0, 0, 0, 1);

  const onContextLost = (event: Event) => {
    event.preventDefault();
    onFailure?.();
  };
  canvas.addEventListener('webglcontextlost', onContextLost, false);

  const resize = () => {
    if (disposed) {
      return;
    }

    const bounds = stage.getBoundingClientRect();
    const width = Math.max(1, bounds.width);
    const height = Math.max(1, bounds.height);
    const dpr = Math.min(window.devicePixelRatio || 1, FOOTER_ARTWORK_MAX_DPR);
    const grid = getFooterArtworkGrid(width, height);

    renderer.dpr = dpr;
    renderer.setSize(width, height);

    program.uniforms.uResolution.value.set(
      renderer.gl.canvas.width,
      renderer.gl.canvas.height,
    );
    program.uniforms.uGrid.value.set(grid.columns, grid.rows);
  };

  const render = (time: number) => {
    if (disposed) {
      return;
    }

    program.uniforms.uTime.value = Math.min(1, Math.max(0, time));
    renderer.render({ scene: mesh });

    if (!firstFrameSent) {
      firstFrameSent = true;
      onFirstFrame?.();
    }
  };

  const setBleedStrength = (strength: number) => {
    if (disposed) {
      return;
    }

    program.uniforms.uBleedStrength.value = clampBleedStrength(strength);
  };

  const destroy = () => {
    if (disposed) {
      return;
    }

    disposed = true;
    canvas.removeEventListener('webglcontextlost', onContextLost, false);
    gl.deleteTexture(palette.texture);
    gl.deleteTexture(bleedLut.texture);
    program.remove();
    geometry.remove();
    gl.getExtension('WEBGL_lose_context')?.loseContext();
  };

  resize();

  return { resize, render, setBleedStrength, destroy };
};
