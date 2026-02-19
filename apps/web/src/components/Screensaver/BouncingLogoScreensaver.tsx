'use client';

import React, { useEffect, useRef, useState } from 'react';

const COLORS = [
  '#ff0000',
  '#00ff00',
  '#0000ff',
  '#ffff00',
  '#ff00ff',
  '#00ffff',
  '#ffffff',
];

export function BouncingLogoScreensaver() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [color, setColor] = useState(COLORS[0]);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    let currentX = Math.random() * (window.innerWidth - 200);
    let currentY = Math.random() * (window.innerHeight - 100);
    let velX = 3;
    let velY = 3;

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
        setColor((prev) => {
          const nextIndex = (COLORS.indexOf(prev) + 1) % COLORS.length;
          return COLORS[nextIndex];
        });
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
        color: color,
      }}
      className="pointer-events-none transition-colors duration-200 select-none">
      <div className="text-5xl font-bold tracking-tighter whitespace-nowrap">
        <span style={{ color: color }}>MAW</span>
      </div>
    </div>
  );
}
