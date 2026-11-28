'use client';

import { useEffect, useRef, useState } from 'react';
import type { NormalizedPoint } from '../../utils';

const FRAME_COUNT = 8;
const FRAME_INTERVAL_MS = 75;
const TOTAL_LIFETIME_MS = 700;

const CLOUD_ANGLES = [0, 54, 118, 178, 236, 300];
const CLOUD_SCALES = [1, 0.9, 1.05, 0.95, 1.1, 0.85];

const FRAMES = [
  { radius: 8, scale: 0.22, opacity: 0.65, spin: 0 },
  { radius: 16, scale: 0.34, opacity: 0.9, spin: 2 },
  { radius: 26, scale: 0.45, opacity: 1, spin: 4 },
  { radius: 34, scale: 0.52, opacity: 1, spin: 6 },
  { radius: 42, scale: 0.56, opacity: 1, spin: 8 },
  { radius: 50, scale: 0.55, opacity: 0.9, spin: 10 },
  { radius: 58, scale: 0.46, opacity: 0.55, spin: 12 },
  { radius: 66, scale: 0.34, opacity: 0.2, spin: 14 },
] as const;

const CANVAS_SIZE = 220;
const CENTER = CANVAS_SIZE / 2;

export interface CaughtPuffProps {
  id: number;
  point: NormalizedPoint;
  onDone: (id: number) => void;
}

export function CaughtPuff({ id, point, onDone }: CaughtPuffProps) {
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => onDoneRef.current(id), TOTAL_LIFETIME_MS);
    return () => clearTimeout(timer);
  }, [id]);

  useEffect(() => {
    if (frameIndex >= FRAME_COUNT - 1) {
      return;
    }

    const timer = setTimeout(
      () => setFrameIndex((current) => current + 1),
      FRAME_INTERVAL_MS,
    );
    return () => clearTimeout(timer);
  }, [frameIndex]);

  const frame = FRAMES[frameIndex] ?? FRAMES[0];
  const symbolId = `puff-cloud-${id}`;
  const shadowId = `puff-shadow-${id}`;
  const debrisOpacity = Math.max(0, (frameIndex - 4) / (FRAME_COUNT - 4));

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
            const scale = frame.scale * (CLOUD_SCALES[index] ?? 1);
            const x = CENTER + Math.cos(angle) * frame.radius;
            const y = CENTER + Math.sin(angle) * frame.radius * 0.9;
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

        {frameIndex >= 5 &&
          CLOUD_ANGLES.map((baseAngle, index) => {
            const angle = ((baseAngle + 22 + frame.spin) * Math.PI) / 180;
            const radius = frame.radius + 14 + (index % 3) * 7;
            return (
              <circle
                key={`debris-${baseAngle}`}
                cx={CENTER + Math.cos(angle) * radius}
                cy={CENTER + Math.sin(angle) * radius * 0.9}
                r={index % 2 === 0 ? 2.4 : 1.6}
                fill="#c9cdd3"
                opacity={debrisOpacity * 0.8}
              />
            );
          })}
      </svg>
    </div>
  );
}
