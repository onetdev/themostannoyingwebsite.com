'use client';

import {
  Icon,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { type ChangeEvent, useMemo } from 'react';
import { usePainPreferencesStore } from '@/stores';
import { SliderRail } from './SliderRail';

export interface PainLevelSelectorProps {
  className?: string;
}

export function PainLevelSelector({ className }: PainLevelSelectorProps) {
  const { publicLevel, setLevel } = usePainPreferencesStore();
  const t = useTranslations('user.painPreferences');

  const percentage = (publicLevel.current / publicLevel.max) * 100;
  const percentageClampMap = useMemo(
    () => [
      { value: 100, label: t('levelSettings.clamps.from_100') },
      { value: 90, label: t('levelSettings.clamps.from_90') },
      { value: 80, label: t('levelSettings.clamps.from_80') },
      { value: 70, label: t('levelSettings.clamps.from_70') },
      { value: 60, label: t('levelSettings.clamps.from_60') },
      { value: 50, label: t('levelSettings.clamps.from_50') },
      { value: 40, label: t('levelSettings.clamps.from_40') },
      { value: 30, label: t('levelSettings.clamps.from_30') },
      { value: 20, label: t('levelSettings.clamps.from_20') },
      { value: 10, label: t('levelSettings.clamps.from_10') },
      { value: 0, label: t('levelSettings.clamps.from_0') },
    ],
    [t],
  );
  const percentageClamp =
    percentageClampMap.find((label) => label.value <= Math.floor(percentage)) ??
    percentageClampMap[percentageClampMap.length - 1];

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setLevel(value);
  };

  return (
    <div
      className={`flex flex-col gap-2 overflow-hidden px-5 py-2 pt-2 pb-4 xl:px-8 ${className}`}
    >
      <div className="text-card-foreground flex items-center justify-between text-xs font-bold tracking-wider uppercase opacity-60">
        <span>{t('levelSettings.label')}</span>

        <div className="flex items-center gap-1.5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="md:hidden"
                  aria-label={t('levelSettings.rating')}
                  title={t('levelSettings.rating')}
                >
                  <Icon icon="infoCircle" className="size-3.5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" align="start">
                {t('levelSettings.label')}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <span className="hidden md:inline">
            {percentageClamp.label} / {Math.floor(percentage)}%
          </span>
          <span className="md:hidden">{Math.floor(percentage)}%</span>
        </div>
      </div>
      <div className="relative">
        <SliderRail percentage={percentage} />
        <input
          type="range"
          min="0"
          max={publicLevel.max}
          value={publicLevel.current}
          onChange={handleChange}
          aria-label={t('levelSettings.rating')}
          className="accent-primary absolute top-1/2 inset-s-0 z-20 w-full -translate-y-1/2 cursor-pointer appearance-none bg-transparent"
        />
      </div>
    </div>
  );
}
