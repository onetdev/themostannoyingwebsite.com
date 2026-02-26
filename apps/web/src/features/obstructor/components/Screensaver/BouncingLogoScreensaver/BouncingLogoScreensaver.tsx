'use client';

import { clsx } from '@maw/ui-lib/utils';
import { randomInt } from '@maw/utils/math';
import { useEffect, useRef, useState } from 'react';

import { BouncyLogo } from './BouncyLogo';

const HUE_ROTATION_CHANCE = 0.1;
const VELOCITY = 3;
const COLORS = [
  '#ff0000', // Red
  '#00ff00', // Lime
  '#0000ff', // Blue
  '#ffff00', // Yellow
  '#ff00ff', // Magenta
  '#00ffff', // Cyan
  '#ffffff', // White
  '#ffa500', // Orange
  '#ffc0cb', // Pink
  '#800080', // Purple
  '#008000', // Green
  '#800000', // Maroon
  '#008080', // Teal
  '#000080', // Navy
  '#ffd700', // Gold
  '#ff4500', // OrangeRed
  '#da70d6', // Orchid
  '#adff2f', // GreenYellow
  '#ff69b4', // HotPink
  '#00ced1', // DarkTurquoise
];

export function BouncingLogoScreensaver() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHueRotating, setIsHueRotating] = useState(false);
  const [colors, setColors] = useState(() => {
    const logoIndex = randomInt(0, COLORS.length);
    let arrowIndex = randomInt(0, COLORS.length);
    while (arrowIndex === logoIndex) {
      arrowIndex = randomInt(0, COLORS.length);
    }
    return {
      arrow: COLORS[arrowIndex],
      logo: COLORS[logoIndex],
    };
  });
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    let currentX = Math.random() * (window.innerWidth - 200);
    let currentY = Math.random() * (window.innerHeight - 100);
    let velX = VELOCITY;
    let velY = VELOCITY;

    const animate = () => {
      const logoWidth = logoRef.current?.offsetWidth || 150;
      const logoHeight = logoRef.current?.offsetHeight || 50;
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      currentX += velX;
      currentY += velY;

      let hit = false;
      if (currentX <= 0 || currentX + logoWidth >= screenWidth) {
        velX = -velX;
        currentX = Math.max(0, Math.min(currentX, screenWidth - logoWidth));
        hit = true;
      }
      if (currentY <= 0 || currentY + logoHeight >= screenHeight) {
        velY = -velY;
        currentY = Math.max(0, Math.min(currentY, screenHeight - logoHeight));
        hit = true;
      }

      if (hit) {
        setColors((prev) => {
          const nextIndex = randomInt(0, COLORS.length);
          return {
            arrow: prev.logo,
            logo: COLORS[nextIndex],
          };
        });
        setIsHueRotating(Math.random() < HUE_ROTATION_CHANCE);
      }

      setPosition({ x: currentX, y: currentY });
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={logoRef}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        position: 'absolute',
        top: 0,
        left: 0,
      }}
      className={clsx(
        'pointer-events-none transition-colors select-none',
        isHueRotating && 'animate-hue-full-rotate duration-100',
      )}
    >
      <BouncyLogo
        fill={colors.logo}
        arrowFill={colors.arrow}
        className="w-50 lg:w-75"
      />
    </div>
  );
}
