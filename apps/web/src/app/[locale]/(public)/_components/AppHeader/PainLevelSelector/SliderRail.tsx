'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import {
  FIREFLY_PARTICLE_COLORS,
  FireflyParticle,
  type FireflyParticleProps,
} from './FireFlyParticle';

export interface SliderRailProps {
  className?: string;
  percentage?: number;
}

export function SliderRail({
  className = '',
  percentage = 100,
}: SliderRailProps) {
  const [particles, setParticles] = useState<FireflyParticleProps[]>([]);
  const t = useTranslations('painPreferences.levelSettings');

  useEffect(() => {
    const interval = setInterval(() => {
      const newParticle: FireflyParticleProps = {
        createdAt: Date.now(),
        // Skew distribution to the right
        x: Math.random() ** 0.5 * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 2 + 1.5,
        color:
          FIREFLY_PARTICLE_COLORS[
            Math.floor(Math.random() * FIREFLY_PARTICLE_COLORS.length)
          ],
      };

      setParticles((prev) => [
        ...prev.filter(
          ({ createdAt, duration }) =>
            createdAt + duration * 1000 - Date.now() >= 0,
        ),
        newParticle,
      ]);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-0 overflow-visible">
        {particles.map((particle) => (
          <FireflyParticle
            key={`particle-${particle.createdAt}`}
            {...particle}
            percentage={percentage}
          />
        ))}
      </div>
      <svg
        viewBox="0 0 100 6"
        preserveAspectRatio="none"
        className={`relative z-10 h-1 w-full ${className}`}
        role="img"
      >
        <title>{t('railTitle')}</title>
        <defs>
          <linearGradient id="railGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="25%" stopColor="#22c55e" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="75%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
          <filter id="grayscale">
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <clipPath id="railClip">
            <rect x="0" y="0" width={percentage} height="6" />
          </clipPath>
        </defs>
        <path
          d="M 0 4 L 100 6 L 100 0 L 0 2 Z"
          fill="url(#railGradient)"
          filter="url(#grayscale)"
          className="opacity-20"
        />
        <path
          d="M 0 4 L 100 6 L 100 0 L 0 2 Z"
          fill="url(#railGradient)"
          clipPath="url(#railClip)"
        />
      </svg>
    </div>
  );
}
