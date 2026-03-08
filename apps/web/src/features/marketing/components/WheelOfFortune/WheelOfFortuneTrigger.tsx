'use client';

import { Icon } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';

export interface WheelOfFortuneTriggerProps {
  onClick: () => void;
}

export function WheelOfFortuneTrigger({ onClick }: WheelOfFortuneTriggerProps) {
  const t = useTranslations();

  return (
    <button
      type="button"
      className="animate-wiggle-8deg bg-error text-on-error -ml-8 cursor-pointer py-3 pr-6 pl-10 text-2xl opacity-80 transition-all duration-200 ease-in-out hover:-ml-4 hover:opacity-100"
      onClick={onClick}
      aria-label={t('marketing.wheelOfFortune.title')}
    >
      <Icon icon="tags" />
    </button>
  );
}
