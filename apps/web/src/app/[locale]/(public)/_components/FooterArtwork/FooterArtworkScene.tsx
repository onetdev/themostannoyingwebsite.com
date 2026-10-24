'use client';

import {
  type MotionValue,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { type CSSProperties, useRef } from 'react';
import type { PanelLayer } from './footer-artwork-tiles';

interface FooterArtworkSceneProps {
  layers: readonly PanelLayer[];
}

/**
 * Vertical glass seams. They sit on the front plane and drift with it, which is
 * what sells the "we are looking through a facade" read in the reference
 * footage.
 */
const MULLION_POSITIONS = ['14%', '38%', '63%', '86%'] as const;

/** Pixels the scroll coupling moves a plane at depth `1`. */
const PARALLAX_DISTANCE = 34;

interface ParallaxPlaneProps {
  layer: PanelLayer;
  progress: MotionValue<number>;
  isStatic: boolean;
}

function ParallaxPlane({ layer, progress, isStatic }: ParallaxPlaneProps) {
  const travel = layer.depth * PARALLAX_DISTANCE;
  const y = useTransform(progress, [0, 0.5, 1], [travel, 0, -travel]);
  const style = {
    backgroundImage: `url("${layer.dataUri}")`,
    opacity: layer.opacity,
    '--panel-duration': `${layer.duration}s`,
    '--panel-amplitude': `${layer.amplitude}%`,
    '--panel-blur': `${layer.blur}px`,
  } as CSSProperties;

  return (
    <motion.div className="absolute inset-0" style={{ y: isStatic ? 0 : y }}>
      <div className="panel-plane" style={style} />
    </motion.div>
  );
}

/**
 * Client-side layer of the footer artwork.
 *
 * Ambient drift lives in CSS (`panel-drift`) and needs no JavaScript at all.
 * This component only adds the scroll coupling the reference footage gets from
 * its camera: as the band enters the viewport the planes flatten out of a
 * slight tilt, spread at different depths, and travel through the spectrum by
 * `--scene-hue` — the angle-dependent colour shift of dichroic film.
 *
 * Reduced-motion visitors keep the static mosaic: the drift is disabled in CSS
 * and every scroll-driven value is pinned to its resting pose.
 */
export function FooterArtworkScene({ layers }: FooterArtworkSceneProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isStatic = prefersReducedMotion === true;

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ['start end', 'end end'],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 22,
    restDelta: 0.001,
  });

  const rotateX = useTransform(progress, [0, 0.5, 1], [14, 0, -4]);
  const scale = useTransform(progress, [0, 0.5, 1], [0.9, 1, 1.03]);
  const hue = useTransform(progress, [0, 1], [0, 20]);

  useMotionValueEvent(hue, 'change', (value) => {
    if (isStatic) {
      return;
    }
    sceneRef.current?.style.setProperty(
      '--scene-hue',
      `${value.toFixed(2)}deg`,
    );
  });

  return (
    <motion.div
      ref={sceneRef}
      data-testid="footer-artwork-scene"
      className="relative h-full w-full"
      style={{
        rotateX: isStatic ? 0 : rotateX,
        scale: isStatic ? 1 : scale,
        transformPerspective: 1200,
      }}
    >
      {layers.map((layer) => (
        <ParallaxPlane
          key={layer.id}
          layer={layer}
          progress={progress}
          isStatic={isStatic}
        />
      ))}

      {MULLION_POSITIONS.map((left) => (
        <div
          key={left}
          className="panel-mullion"
          style={
            {
              left,
              '--panel-duration': '28s',
              '--panel-amplitude': '11%',
            } as CSSProperties
          }
        />
      ))}

      <div className="panel-sweep" />
    </motion.div>
  );
}
