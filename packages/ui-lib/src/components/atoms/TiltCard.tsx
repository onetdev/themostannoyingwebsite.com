'use client';

import type {
  ComponentProps,
  CSSProperties,
  PointerEvent as ReactPointerEvent,
} from 'react';
import { useRef } from 'react';

import { cn } from '../../utils';

export interface TiltCardProps extends ComponentProps<'div'> {
  /**
   * Maximum rotation reached at the edges, in degrees. The centre stays flat and
   * the angle ramps up toward the corners.
   */
  maxAngle?: number;
  /**
   * Scale applied to the plane while the pointer is over the card. `1` keeps the
   * plane at its natural size.
   */
  scale?: number;
  /**
   * Perspective distance in pixels. Lower values exaggerate the depth of the
   * tilt.
   */
  perspective?: number;
  /**
   * Classes for the transformed plane. Visual styling (background, rounding,
   * clipping) belongs here so it moves with the tilt; {@link TiltCardProps.className}
   * styles the static wrapper that defines the hover area and sizing.
   */
  planeClassName?: string;
  /**
   * Renders a holographic foil over the plane: a spectral band that sweeps
   * left-to-right as the pointer moves horizontally. Off by default.
   *
   * Because the foil is a blend-mode layer it inherently reacts to the artwork
   * underneath (light/dark/saturated areas). Override `--holo-blend` to change
   * *which* pixels it takes on and `--holo-opacity` for strength.
   */
  holographic?: boolean;
}

/**
 * Mouse-reactive 3D tilt.
 *
 * Two layers do the work: a static wrapper tracks the pointer and keeps the
 * original footprint (so the hover target never moves — no edge flicker), while
 * an inner plane carries the CSS transform. The wrapper owns sizing via
 * `className`; the plane owns the look via `planeClassName`.
 *
 * Rotation and scale are written to CSS custom properties and turned into a
 * transform by the `tilt-card` utility, so the easing stays purely CSS. Devices
 * without a hover pointer and users who prefer reduced motion get a flat plane —
 * the utility neutralises the transform under `(hover: none)` and
 * `prefers-reduced-motion: reduce`.
 */
export function TiltCard({
  maxAngle = 10,
  scale = 1,
  perspective = 800,
  className,
  planeClassName,
  style,
  children,
  holographic = false,
  onPointerMove,
  onPointerLeave,
  onPointerCancel,
  ...rest
}: TiltCardProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);

  const reset = () => {
    const plane = planeRef.current;
    if (!plane) {
      return;
    }
    plane.style.setProperty('--tilt-rx', '0deg');
    plane.style.setProperty('--tilt-ry', '0deg');
    plane.style.setProperty('--tilt-scale', '1');
    plane.removeAttribute('data-tilt-active');
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const wrapper = wrapperRef.current;
    const plane = planeRef.current;
    const isMouse = !event.pointerType || event.pointerType === 'mouse';
    if (wrapper && plane && isMouse) {
      const rect = wrapper.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        const ratioX = (event.clientX - rect.left) / rect.width;
        const ratioY = (event.clientY - rect.top) / rect.height;
        plane.style.setProperty(
          '--tilt-rx',
          `${((0.5 - ratioY) * 2 * maxAngle).toFixed(2)}deg`,
        );
        plane.style.setProperty(
          '--tilt-ry',
          `${((ratioX - 0.5) * 2 * maxAngle).toFixed(2)}deg`,
        );
        plane.style.setProperty('--tilt-scale', `${scale}`);
        if (holographic) {
          plane.style.setProperty('--holo-x', `${(ratioX * 100).toFixed(2)}%`);
        }
        plane.setAttribute('data-tilt-active', '');
      }
    }
    onPointerMove?.(event);
  };

  const handlePointerLeave = (event: ReactPointerEvent<HTMLDivElement>) => {
    reset();
    onPointerLeave?.(event);
  };

  const handlePointerCancel = (event: ReactPointerEvent<HTMLDivElement>) => {
    reset();
    onPointerCancel?.(event);
  };

  return (
    <div
      ref={wrapperRef}
      data-slot="tilt-card"
      className={className}
      style={style}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerCancel={handlePointerCancel}
      {...rest}
    >
      <div
        ref={planeRef}
        data-slot="tilt-card-plane"
        className={cn('tilt-card relative h-full w-full', planeClassName)}
        style={{ '--tilt-perspective': `${perspective}px` } as CSSProperties}
      >
        {children}
        {holographic && (
          <span
            aria-hidden="true"
            data-slot="tilt-card-holo"
            className="tilt-holo-layer"
          />
        )}
      </div>
    </div>
  );
}
