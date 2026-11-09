'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  createGradientCss,
  createGradientSteps,
  DEFAULT_GRADIENT_OPACITY,
  GRADIENT_POC_STEP_COUNT,
  type GradientOpacitySettings,
} from './gradient-poc-colors';
import {
  createVerticalFadeMask,
  FALLOFF_CURVES,
  type FalloffCurve,
} from './gradient-poc-fade';

const SEED_RANGE = 0xffffffff;
const DEFAULT_HEIGHT_REM = 6;

const BLEND_MODES = [
  'normal',
  'multiply',
  'screen',
  'overlay',
  'soft-light',
  'hard-light',
  'color-dodge',
  'color-burn',
  'darken',
  'lighten',
  'difference',
  'exclusion',
  'hue',
  'saturation',
  'color',
  'luminosity',
] as const;

type BlendMode = (typeof BLEND_MODES)[number];

/**
 * Dev-only 100-step gradient strip with live controls.
 *
 * A fresh random palette is generated after mount, so the server render and
 * the hydrated page never disagree. The 100 colours become one CSS
 * linear-gradient with hard stops, and every stop gets a sine-driven alpha.
 * The strip is purely decorative and sits at the very bottom of the public
 * page layout.
 */
export function GradientPoc() {
  const [seed, setSeed] = useState<number | null>(null);
  const [minOpacity, setMinOpacity] = useState(DEFAULT_GRADIENT_OPACITY.min);
  const [maxOpacity, setMaxOpacity] = useState(DEFAULT_GRADIENT_OPACITY.max);
  const [amplitude, setAmplitude] = useState(
    DEFAULT_GRADIENT_OPACITY.amplitude,
  );
  const [cycles, setCycles] = useState(DEFAULT_GRADIENT_OPACITY.cycles);
  const [phase, setPhase] = useState(DEFAULT_GRADIENT_OPACITY.phaseDegrees);
  const [stepCount, setStepCount] = useState(GRADIENT_POC_STEP_COUNT);
  const [heightRem, setHeightRem] = useState(DEFAULT_HEIGHT_REM);
  const [verticalFade, setVerticalFade] = useState(100);
  const [backdropColor, setBackdropColor] = useState('#111827');
  const [blendMode, setBlendMode] = useState<BlendMode>('normal');
  const [falloff, setFalloff] = useState<FalloffCurve>('smooth');

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      return;
    }

    setSeed(Math.floor(Math.random() * SEED_RANGE));
  }, []);

  const colors = useMemo(
    () => (seed === null ? null : createGradientSteps(seed, stepCount)),
    [seed, stepCount],
  );

  const settings = useMemo<GradientOpacitySettings>(
    () => ({
      min: minOpacity,
      max: maxOpacity,
      amplitude,
      cycles,
      phaseDegrees: phase,
    }),
    [amplitude, cycles, maxOpacity, minOpacity, phase],
  );

  const backgroundImage = useMemo(
    () => (colors ? createGradientCss(colors, settings) : ''),
    [colors, settings],
  );

  if (!colors) {
    return null;
  }

  const edgeAlpha = 1 - verticalFade / 100;
  const verticalMask = createVerticalFadeMask(falloff, edgeAlpha);

  const shuffle = () => {
    setSeed(Math.floor(Math.random() * SEED_RANGE));
  };

  return (
    <div data-testid="gradient-poc-controls">
      <div className="border-y border-border bg-muted/30 px-4 py-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs font-semibold text-foreground">
            100-step gradient POC
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">Backdrop</span>
              <input
                type="color"
                value={backdropColor}
                onChange={(event) => setBackdropColor(event.target.value)}
                className="h-7 w-10 cursor-pointer rounded border border-border bg-transparent p-0"
                aria-label="Backdrop color"
              />
              <span className="tabular-nums">{backdropColor}</span>
            </label>
            <label className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">Blend</span>
              <select
                value={blendMode}
                onChange={(event) =>
                  setBlendMode(event.target.value as BlendMode)
                }
                className="rounded border border-border bg-background px-2 py-1 text-xs text-foreground"
                aria-label="Blend mode"
              >
                {BLEND_MODES.map((mode) => (
                  <option key={mode} value={mode}>
                    {mode}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">Falloff</span>
              <select
                value={falloff}
                onChange={(event) =>
                  setFalloff(event.target.value as FalloffCurve)
                }
                className="rounded border border-border bg-background px-2 py-1 text-xs text-foreground"
                aria-label="Falloff curve"
              >
                {FALLOFF_CURVES.map((curve) => (
                  <option key={curve} value={curve}>
                    {curve}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="button"
              onClick={shuffle}
              className="rounded-md border border-border px-3 py-1 text-xs font-medium text-foreground hover:bg-muted"
            >
              Shuffle palette
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8">
          <RangeControl
            label="Opacity min"
            value={Math.round(minOpacity * 100)}
            display={`${Math.round(minOpacity * 100)}%`}
            min={0}
            max={Math.round(maxOpacity * 100)}
            step={1}
            onChange={(value) =>
              setMinOpacity(Math.min(value / 100, maxOpacity))
            }
          />
          <RangeControl
            label="Opacity max"
            value={Math.round(maxOpacity * 100)}
            display={`${Math.round(maxOpacity * 100)}%`}
            min={Math.round(minOpacity * 100)}
            max={100}
            step={1}
            onChange={(value) =>
              setMaxOpacity(Math.max(value / 100, minOpacity))
            }
          />
          <RangeControl
            label="Vertical fade"
            value={verticalFade}
            display={`${verticalFade}%`}
            min={0}
            max={100}
            step={1}
            onChange={setVerticalFade}
          />
          <RangeControl
            label="Wave amplitude"
            value={Math.round(amplitude * 100)}
            display={`${Math.round(amplitude * 100)}%`}
            min={0}
            max={100}
            step={1}
            onChange={(value) => setAmplitude(value / 100)}
          />
          <RangeControl
            label="Wave cycles"
            value={cycles}
            display={`${cycles.toFixed(2)}×`}
            min={0.25}
            max={4}
            step={0.25}
            onChange={setCycles}
          />
          <RangeControl
            label="Phase"
            value={phase}
            display={`${Math.round(phase)}°`}
            min={0}
            max={360}
            step={15}
            onChange={setPhase}
          />
          <RangeControl
            label="Steps"
            value={stepCount}
            display={`${stepCount}`}
            min={10}
            max={200}
            step={1}
            onChange={setStepCount}
          />
          <RangeControl
            label="Height"
            value={heightRem}
            display={`${heightRem}rem`}
            min={2}
            max={16}
            step={1}
            onChange={setHeightRem}
          />
        </div>
      </div>

      <div
        className="w-full"
        style={{
          backgroundColor: backdropColor,
          paddingTop: 0,
          paddingBottom: '3rem',
          isolation: 'isolate',
        }}
        data-testid="gradient-poc-backdrop"
      >
        <div
          className="w-full"
          style={{
            backgroundImage,
            height: `${heightRem}rem`,
            maskImage: verticalMask,
            WebkitMaskImage: verticalMask,
            maskMode: 'alpha',
            maskRepeat: 'no-repeat',
            maskSize: '100% 100%',
            mixBlendMode: blendMode,
          }}
          data-testid="gradient-poc"
          data-gradient-stops={colors.length}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

interface RangeControlProps {
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}

function RangeControl({
  label,
  value,
  display,
  min,
  max,
  step,
  onChange,
}: RangeControlProps) {
  return (
    <label className="flex min-w-0 flex-col gap-1 text-xs">
      <span className="flex items-center justify-between gap-2">
        <span className="font-medium text-foreground">{label}</span>
        <span className="tabular-nums text-muted-foreground">{display}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full accent-foreground"
        aria-label={label}
      />
    </label>
  );
}
