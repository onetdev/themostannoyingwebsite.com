'use client';

import { useTranslations } from 'next-intl';

import { SliderRail } from './SliderRail';

import { usePainPreferencesStore } from '@/kernel';

export interface PainLevelSelectorProps {
  className?: string;
}

export function PainLevelSelector({ className }: PainLevelSelectorProps) {
  const { publicLevel, setLevel } = usePainPreferencesStore();
  const t = useTranslations();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setLevel(value);
  };

  return (
    <div
      className={`flex flex-col gap-2 overflow-hidden px-5 py-2 xl:px-8 ${className}`}>
      <div className="text-on-surface flex items-center justify-between text-xs font-bold tracking-wider uppercase opacity-60">
        <span>Pain level</span>
        <span>
          {publicLevel.current} / {publicLevel.max}
        </span>
      </div>
      <SliderRail />
      <input
        type="range"
        min="0"
        max={publicLevel.max}
        value={publicLevel.current}
        onChange={handleChange}
        className="accent-primary bg-surface-alt h-1.5 w-full cursor-pointer appearance-none rounded-lg"
      />
    </div>
  );
}
