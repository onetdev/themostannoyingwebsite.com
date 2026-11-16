'use client';

import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { FRAGMENT_SHADER, VERTEX_SHADER } from './fractal-glass-shader';

const ASPECT = 9 / 4;
const DPR_CAP = 1.5;

type Rgb = readonly [number, number, number];

const PALETTES = {
  'Neon Flux': [
    [0.02, 0.18, 0.75],
    [0.78, 0.04, 0.55],
    [0.95, 0.08, 0.14],
    [0.98, 0.46, 0.07],
    [0.22, 0.62, 0.88],
  ],
  Sunset: [
    [0.95, 0.25, 0.05],
    [0.85, 0.08, 0.35],
    [1.0, 0.6, 0.0],
    [0.55, 0.05, 0.5],
    [1.0, 0.85, 0.2],
  ],
  Aurora: [
    [0.0, 0.75, 0.45],
    [0.05, 0.45, 0.95],
    [0.55, 0.05, 0.85],
    [0.0, 0.9, 0.7],
    [0.3, 0.0, 0.65],
  ],
  Ember: [
    [0.9, 0.06, 0.05],
    [1.0, 0.35, 0.02],
    [1.0, 0.7, 0.08],
    [0.55, 0.02, 0.08],
    [0.35, 0.05, 0.3],
  ],
  Ice: [
    [0.03, 0.15, 0.6],
    [0.1, 0.55, 0.9],
    [0.55, 0.85, 0.98],
    [0.05, 0.4, 0.5],
    [0.5, 0.3, 0.85],
  ],
} satisfies Record<string, readonly [Rgb, Rgb, Rgb, Rgb, Rgb]>;

type PaletteName = keyof typeof PALETTES;

const PALETTE_NAMES = Object.keys(PALETTES) as PaletteName[];

interface GlassSettings {
  readonly fps: number;
  readonly renderScale: number;
  readonly columns: number;
  readonly palette: PaletteName;
  readonly warpScale: number;
  readonly warpStrength: number;
  readonly blobSpread: number;
  readonly speed: number;
  readonly paused: boolean;
  readonly refraction: number;
  readonly dispersion: number;
  readonly bevel: number;
  readonly highlight: number;
  readonly grain: number;
  readonly exposure: number;
}

const DEFAULT_SETTINGS: GlassSettings = {
  fps: 30,
  renderScale: 1,
  columns: 18,
  palette: 'Neon Flux',
  warpScale: 2.2,
  warpStrength: 0.5,
  blobSpread: 1,
  speed: 1,
  paused: false,
  refraction: 2.3,
  dispersion: 0.6,
  bevel: 0.6,
  highlight: 0.8,
  grain: 0.02,
  exposure: 1.45,
};

const rowsFor = (columns: number) => Math.max(1, Math.round(columns / ASPECT));

const compileShader = (
  gl: WebGL2RenderingContext,
  type: number,
  source: string,
) => {
  const shader = gl.createShader(type);

  if (!shader) {
    return null;
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }

  return shader;
};

const createProgram = (
  gl: WebGL2RenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader,
) => {
  const program = gl.createProgram();

  if (!program) {
    return null;
  }

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }

  return program;
};

interface RangeControlProps {
  readonly label: string;
  readonly value: number;
  readonly min: number;
  readonly max: number;
  readonly step: number;
  readonly display: string;
  readonly onChange: (value: number) => void;
}

function RangeControl({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: RangeControlProps) {
  return (
    <label className="flex flex-col gap-1 text-[11px] text-white/60">
      <span className="flex items-center justify-between gap-2">
        <span>{label}</span>
        <span className="font-mono text-white/35">{display}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-1 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-white"
      />
    </label>
  );
}

interface ControlGroupProps {
  readonly title: string;
  readonly children: ReactNode;
}

function ControlGroup({ title, children }: ControlGroupProps) {
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-white/5 bg-black/20 p-3">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/35">
        {title}
      </p>
      {children}
    </div>
  );
}

interface GlassUniforms {
  readonly time: WebGLUniformLocation | null;
  readonly grid: WebGLUniformLocation | null;
  readonly refraction: WebGLUniformLocation | null;
  readonly exposure: WebGLUniformLocation | null;
  readonly grain: WebGLUniformLocation | null;
  readonly dispersion: WebGLUniformLocation | null;
  readonly bevel: WebGLUniformLocation | null;
  readonly highlight: WebGLUniformLocation | null;
  readonly warpScale: WebGLUniformLocation | null;
  readonly warpStrength: WebGLUniformLocation | null;
  readonly blobSpread: WebGLUniformLocation | null;
  readonly c1: WebGLUniformLocation | null;
  readonly c2: WebGLUniformLocation | null;
  readonly c3: WebGLUniformLocation | null;
  readonly c4: WebGLUniformLocation | null;
  readonly c5: WebGLUniformLocation | null;
}

interface GlassRenderer {
  readonly paint: (settings: GlassSettings, elapsed: number) => void;
  readonly resize: (settings: GlassSettings, bounds: DOMRect) => void;
  readonly dispose: () => void;
}

const createRenderer = (canvas: HTMLCanvasElement): GlassRenderer | null => {
  const gl = canvas.getContext('webgl2', {
    alpha: false,
    antialias: false,
    depth: false,
    powerPreference: 'high-performance',
    preserveDrawingBuffer: false,
    stencil: false,
  });

  if (!gl) {
    return null;
  }

  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);

  if (!vertexShader || !fragmentShader) {
    return null;
  }

  const program = createProgram(gl, vertexShader, fragmentShader);

  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  if (!program) {
    return null;
  }

  const bindProgram = gl.useProgram.bind(gl);
  bindProgram(program);

  const buffer = gl.createBuffer();

  if (!buffer) {
    gl.deleteProgram(program);
    return null;
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
    gl.STATIC_DRAW,
  );

  const position = gl.getAttribLocation(program, 'aPosition');

  if (position < 0) {
    gl.deleteBuffer(buffer);
    gl.deleteProgram(program);
    return null;
  }

  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  const uniforms: GlassUniforms = {
    time: gl.getUniformLocation(program, 'uTime'),
    grid: gl.getUniformLocation(program, 'uGrid'),
    refraction: gl.getUniformLocation(program, 'uRefraction'),
    exposure: gl.getUniformLocation(program, 'uExposure'),
    grain: gl.getUniformLocation(program, 'uGrain'),
    dispersion: gl.getUniformLocation(program, 'uDispersion'),
    bevel: gl.getUniformLocation(program, 'uBevel'),
    highlight: gl.getUniformLocation(program, 'uHighlight'),
    warpScale: gl.getUniformLocation(program, 'uWarpScale'),
    warpStrength: gl.getUniformLocation(program, 'uWarpStrength'),
    blobSpread: gl.getUniformLocation(program, 'uBlobSpread'),
    c1: gl.getUniformLocation(program, 'uC1'),
    c2: gl.getUniformLocation(program, 'uC2'),
    c3: gl.getUniformLocation(program, 'uC3'),
    c4: gl.getUniformLocation(program, 'uC4'),
    c5: gl.getUniformLocation(program, 'uC5'),
  };

  const applyPalette = (paletteName: PaletteName) => {
    const palette = PALETTES[paletteName];

    gl.uniform3f(uniforms.c1, ...palette[0]);
    gl.uniform3f(uniforms.c2, ...palette[1]);
    gl.uniform3f(uniforms.c3, ...palette[2]);
    gl.uniform3f(uniforms.c4, ...palette[3]);
    gl.uniform3f(uniforms.c5, ...palette[4]);
  };

  return {
    resize: (settings, bounds) => {
      const dpr =
        Math.min(window.devicePixelRatio || 1, DPR_CAP) * settings.renderScale;
      const width = Math.max(1, Math.round(bounds.width * dpr));
      const height = Math.max(1, Math.round(bounds.height * dpr));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    },
    paint: (settings, elapsed) => {
      gl.uniform1f(uniforms.time, elapsed);
      gl.uniform2f(uniforms.grid, settings.columns, rowsFor(settings.columns));
      gl.uniform1f(uniforms.refraction, settings.refraction);
      gl.uniform1f(uniforms.exposure, settings.exposure);
      gl.uniform1f(uniforms.grain, settings.grain);
      gl.uniform1f(uniforms.dispersion, settings.dispersion);
      gl.uniform1f(uniforms.bevel, settings.bevel);
      gl.uniform1f(uniforms.highlight, settings.highlight);
      gl.uniform1f(uniforms.warpScale, settings.warpScale);
      gl.uniform1f(uniforms.warpStrength, settings.warpStrength);
      gl.uniform1f(uniforms.blobSpread, settings.blobSpread);
      applyPalette(settings.palette);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    },
    dispose: () => {
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    },
  };
};

/**
 * Dev-only 2D cellular refraction grid.
 *
 * A full-screen WebGL2 quad renders a grid of pillowed glass blocks over a
 * slow colour field of additive Gaussian blobs. Every cell refracts the field
 * outwards towards its rim, adds a bevel and a four-way specular pinpoint, and
 * the whole scene is tone-mapped with a touch of grain.
 */
export function FractalGlassPoc() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fpsRef = useRef<HTMLSpanElement>(null);
  const [settings, setSettings] = useState<GlassSettings>(DEFAULT_SETTINGS);
  const settingsRef = useRef(settings);

  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      return;
    }

    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const renderer = createRenderer(canvas);

    if (!renderer) {
      return;
    }

    let bounds = canvas.getBoundingClientRect();

    const resizeObserver = new ResizeObserver(() => {
      bounds = canvas.getBoundingClientRect();
    });
    resizeObserver.observe(canvas);

    let visible = true;

    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
      },
      { rootMargin: '200px' },
    );
    visibilityObserver.observe(canvas);

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (reducedMotion) {
      renderer.resize(settingsRef.current, bounds);
      renderer.paint(settingsRef.current, 1.7);

      if (fpsRef.current) {
        fpsRef.current.textContent = 'static';
      }

      return () => {
        resizeObserver.disconnect();
        visibilityObserver.disconnect();
        renderer.dispose();
      };
    }

    let animationTime = 1.7;
    let lastPaint = 0;
    let paintedFrames = 0;
    let fpsWindowStart = performance.now();
    let frame = 0;

    const renderFrame = (now: number, current: GlassSettings) => {
      const delta =
        lastPaint === 0 ? 0 : Math.min(0.1, (now - lastPaint) / 1000);

      lastPaint = now;

      if (!current.paused) {
        animationTime += delta * current.speed;
      }

      renderer.resize(current, bounds);
      renderer.paint(current, animationTime);
      paintedFrames += 1;

      const windowMs = now - fpsWindowStart;

      if (windowMs >= 1000) {
        if (fpsRef.current) {
          fpsRef.current.textContent = `${((paintedFrames * 1000) / windowMs).toFixed(1)} fps`;
        }

        paintedFrames = 0;
        fpsWindowStart = now;
      }
    };

    const draw = (now: number) => {
      if (!visible) {
        lastPaint = now;
        frame = window.requestAnimationFrame(draw);
        return;
      }

      const current = settingsRef.current;

      if (now - lastPaint >= 1000 / Math.max(1, current.fps)) {
        renderFrame(now, current);
      }

      frame = window.requestAnimationFrame(draw);
    };

    frame = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      renderer.dispose();
    };
  }, []);

  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  const rows = rowsFor(settings.columns);

  const update = <Key extends keyof GlassSettings>(
    key: Key,
    value: GlassSettings[Key],
  ) => {
    setSettings((current) => ({ ...current, [key]: value }));
  };

  return (
    <section
      className="w-full bg-[#0b0f19] py-8"
      data-testid="fractal-glass-poc"
    >
      <div className="flex flex-col items-center gap-4 px-4">
        <p className="text-xs font-semibold text-white/70">
          Fractal glass — {settings.columns}×{rows}
        </p>
        <div className="relative aspect-[9/4] w-full overflow-hidden rounded-2xl ring-1 ring-white/10">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 block h-full w-full"
          />
          <span
            ref={fpsRef}
            data-testid="fractal-glass-fps"
            className="pointer-events-none absolute left-2 top-2 z-10 rounded bg-black/60 px-1.5 py-0.5 font-mono text-[10px] text-white/80"
          >
            — fps
          </span>
        </div>

        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <ControlGroup title="Render">
            <RangeControl
              label="FPS cap"
              value={settings.fps}
              min={10}
              max={60}
              step={5}
              display={`${settings.fps} fps`}
              onChange={(value) => update('fps', value)}
            />
            <RangeControl
              label="Render scale"
              value={settings.renderScale}
              min={0.5}
              max={1.5}
              step={0.05}
              display={`${settings.renderScale.toFixed(2)}×`}
              onChange={(value) => update('renderScale', value)}
            />
          </ControlGroup>

          <ControlGroup title="Generator">
            <label className="flex flex-col gap-1 text-[11px] text-white/60">
              <span>Palette</span>
              <select
                value={settings.palette}
                onChange={(event) =>
                  update('palette', event.target.value as PaletteName)
                }
                className="rounded-md border border-white/10 bg-[#11162a] px-2 py-1 text-xs text-white/80 outline-none"
              >
                {PALETTE_NAMES.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </label>
            <RangeControl
              label="Grid columns"
              value={settings.columns}
              min={6}
              max={32}
              step={1}
              display={`${settings.columns}`}
              onChange={(value) => update('columns', value)}
            />
            <RangeControl
              label="Warp scale"
              value={settings.warpScale}
              min={0}
              max={4}
              step={0.05}
              display={settings.warpScale.toFixed(2)}
              onChange={(value) => update('warpScale', value)}
            />
            <RangeControl
              label="Warp strength"
              value={settings.warpStrength}
              min={0}
              max={1.5}
              step={0.01}
              display={settings.warpStrength.toFixed(2)}
              onChange={(value) => update('warpStrength', value)}
            />
            <RangeControl
              label="Blob spread"
              value={settings.blobSpread}
              min={0.5}
              max={2}
              step={0.01}
              display={settings.blobSpread.toFixed(2)}
              onChange={(value) => update('blobSpread', value)}
            />
          </ControlGroup>

          <ControlGroup title="Animator">
            <RangeControl
              label="Speed"
              value={settings.speed}
              min={0}
              max={2}
              step={0.01}
              display={`${settings.speed.toFixed(2)}×`}
              onChange={(value) => update('speed', value)}
            />
            <button
              type="button"
              onClick={() => update('paused', !settings.paused)}
              aria-pressed={settings.paused}
              className="mt-1 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[11px] font-semibold text-white/70 transition-colors hover:bg-white/10"
            >
              {settings.paused ? 'Resume' : 'Pause'}
            </button>
          </ControlGroup>

          <ControlGroup title="Effect">
            <RangeControl
              label="Refraction"
              value={settings.refraction}
              min={0}
              max={3}
              step={0.01}
              display={settings.refraction.toFixed(2)}
              onChange={(value) => update('refraction', value)}
            />
            <RangeControl
              label="Dispersion"
              value={settings.dispersion}
              min={0}
              max={1}
              step={0.01}
              display={settings.dispersion.toFixed(2)}
              onChange={(value) => update('dispersion', value)}
            />
            <RangeControl
              label="Bevel"
              value={settings.bevel}
              min={0}
              max={1}
              step={0.01}
              display={settings.bevel.toFixed(2)}
              onChange={(value) => update('bevel', value)}
            />
            <RangeControl
              label="Highlights"
              value={settings.highlight}
              min={0}
              max={1}
              step={0.01}
              display={settings.highlight.toFixed(2)}
              onChange={(value) => update('highlight', value)}
            />
            <RangeControl
              label="Grain"
              value={settings.grain}
              min={0}
              max={0.2}
              step={0.005}
              display={settings.grain.toFixed(3)}
              onChange={(value) => update('grain', value)}
            />
            <RangeControl
              label="Exposure"
              value={settings.exposure}
              min={0.1}
              max={2}
              step={0.01}
              display={settings.exposure.toFixed(2)}
              onChange={(value) => update('exposure', value)}
            />
          </ControlGroup>
        </div>
      </div>
    </section>
  );
}
