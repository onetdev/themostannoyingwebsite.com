'use client';

import { useEffect, useRef, useState } from 'react';
import type { NormalizedPoint } from '../../utils';

const CLOUD_ANGLES = [0, 54, 118, 178, 236, 300];
const CLOUD_SCALES = [1, 0.9, 1.05, 0.95, 1.1, 0.85];

const FRAMES = [
  { radius: 8, scale: 0.22, opacity: 0.65, spin: 0 },
  { radius: 14, scale: 0.3, opacity: 0.9, spin: 2 },
  { radius: 20, scale: 0.38, opacity: 1, spin: 4 },
  { radius: 26, scale: 0.45, opacity: 1, spin: 6 },
  { radius: 31, scale: 0.48, opacity: 1, spin: 8 },
  { radius: 35, scale: 0.46, opacity: 0.9, spin: 10 },
  { radius: 38, scale: 0.4, opacity: 0.5, spin: 12 },
  { radius: 42, scale: 0.28, opacity: 0, spin: 16 },
] as const;

const CANVAS_SIZE = 220;
const CENTER = CANVAS_SIZE / 2;
const PUFF_SCALE = 0.7;
const FRAME_INTERVAL_MS = 16;
const ANIMATION_DURATION_MS = 420;

const lerp = (from: number, to: number, progress: number): number =>
  from + (to - from) * progress;

const easeOutCubic = (progress: number): number => 1 - (1 - progress) ** 3;

export interface CaughtPuffProps {
  id: number;
  point: NormalizedPoint;
  onDone: (id: number) => void;
}

export function CaughtPuff({ id, point, onDone }: CaughtPuffProps) {
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (elapsed < ANIMATION_DURATION_MS) {
      return;
    }

    onDoneRef.current(id);
  }, [elapsed, id]);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed((current) => {
        if (current >= ANIMATION_DURATION_MS) {
          return current;
        }

        return Math.min(current + FRAME_INTERVAL_MS, ANIMATION_DURATION_MS);
      });
    }, FRAME_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  const progress = Math.min(1, elapsed / ANIMATION_DURATION_MS);
  const easedProgress = easeOutCubic(progress);
  const keyframePosition = easedProgress * (FRAMES.length - 1);
  const lowerIndex = Math.floor(keyframePosition);
  const upperIndex = Math.min(FRAMES.length - 1, lowerIndex + 1);
  const blend = keyframePosition - lowerIndex;
  const from = FRAMES[lowerIndex] ?? FRAMES[0];
  const to = FRAMES[upperIndex] ?? from;
  const frame = {
    radius: lerp(from.radius, to.radius, blend),
    scale: lerp(from.scale, to.scale, blend),
    opacity: lerp(from.opacity, to.opacity, blend),
    spin: lerp(from.spin, to.spin, blend),
  };
  const frameIndex = Math.round(keyframePosition);
  const symbolId = `puff-cloud-${id}`;
  const shadowId = `puff-shadow-${id}`;
  const debrisOpacity =
    Math.max(0, (keyframePosition - 4) / (FRAMES.length - 4)) *
    (1 - easedProgress);

  return (
    <div
      data-testid="possessed-cursor-puff"
      data-puff-frame={frameIndex}
      aria-hidden
      style={{
        position: 'absolute',
        left: `${point.x * 100}%`,
        top: `${point.y * 100}%`,
        width: CANVAS_SIZE,
        height: CANVAS_SIZE,
        marginLeft: -CENTER,
        marginTop: -CENTER,
        pointerEvents: 'none',
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        viewBox={`0 0 ${CANVAS_SIZE} ${CANVAS_SIZE}`}
        overflow="visible"
        aria-hidden
      >
        <defs>
          <g id={symbolId}>
            <g fill="#c9cdd3" transform="translate(2 3)">
              <circle cx="-14" cy="4" r="12" />
              <circle cx="-1" cy="-5" r="14" />
              <circle cx="14" cy="0" r="12" />
              <circle cx="7" cy="9" r="12" />
              <rect x="-22" y="1" width="44" height="18" rx="9" />
            </g>
            <g fill="#ffffff">
              <circle cx="-14" cy="4" r="12" />
              <circle cx="-1" cy="-5" r="14" />
              <circle cx="14" cy="0" r="12" />
              <circle cx="7" cy="9" r="12" />
              <rect x="-22" y="1" width="44" height="18" rx="9" />
            </g>
          </g>
          <filter id={shadowId} x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow
              dx="0"
              dy="2"
              stdDeviation="1.2"
              floodColor="#000000"
              floodOpacity="0.22"
            />
          </filter>
        </defs>

        <g opacity={frame.opacity} filter={`url(#${shadowId})`}>
          {CLOUD_ANGLES.map((baseAngle, index) => {
            const angle = ((baseAngle + frame.spin) * Math.PI) / 180;
            const scale = frame.scale * (CLOUD_SCALES[index] ?? 1) * PUFF_SCALE;
            const x = CENTER + Math.cos(angle) * frame.radius * PUFF_SCALE;
            const y =
              CENTER + Math.sin(angle) * frame.radius * PUFF_SCALE * 0.9;
            const rotation = index % 2 === 0 ? -8 : 8;

            return (
              <use
                key={baseAngle}
                href={`#${symbolId}`}
                transform={`translate(${x} ${y}) rotate(${rotation}) scale(${scale})`}
              />
            );
          })}
        </g>

        {keyframePosition >= 5 &&
          CLOUD_ANGLES.map((baseAngle, index) => {
            const angle = ((baseAngle + 22 + frame.spin) * Math.PI) / 180;
            const radius = (frame.radius + 14 + (index % 3) * 7) * PUFF_SCALE;
            return (
              <circle
                key={`debris-${baseAngle}`}
                cx={CENTER + Math.cos(angle) * radius}
                cy={CENTER + Math.sin(angle) * radius * 0.9}
                r={(index % 2 === 0 ? 2.4 : 1.6) * PUFF_SCALE}
                fill="#c9cdd3"
                opacity={debrisOpacity * 0.8}
              />
            );
          })}
      </svg>
    </div>
  );
}
