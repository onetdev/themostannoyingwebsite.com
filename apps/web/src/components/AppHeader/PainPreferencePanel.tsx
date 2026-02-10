'use client';

import { useTranslations } from 'next-intl';

import { usePainPreferencesStore } from '@/kernel';

export interface PainPreferencePanelProps {
  className?: string;
}

export function PainPreferencePanel({ className }: PainPreferencePanelProps) {
  const { publicLevel, setLevel } = usePainPreferencesStore();
  const t = useTranslations();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setLevel(value);
  };

  return (
    <div className={`flex flex-col gap-2 px-5 xl:px-8 ${className}`}>
      <div className="text-on-surface flex items-center justify-between text-xs font-bold tracking-wider uppercase opacity-60">
        <span>{t('settings.optionalPainPoints.title')}</span>
        <span>
          {publicLevel.current} / {publicLevel.max}
        </span>
      </div>
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
