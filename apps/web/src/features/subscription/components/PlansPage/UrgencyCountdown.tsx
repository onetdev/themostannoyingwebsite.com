'use client';

import { cn } from '@maw/ui-lib/utils';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { useRuntimeStore } from '@/stores';

export interface UrgencyCountdownProps {
  className?: string;
  discountPercentage: number;
  onTick?: (timeLeft: number) => void;
  timeoutSeconds: number;
}

export function UrgencyCountdown({
  className,
  discountPercentage,
  onTick,
  timeoutSeconds,
}: UrgencyCountdownProps) {
  const t = useTranslations();
  const { startedAt } = useRuntimeStore();
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const discount = Math.round(discountPercentage * 100);

  useEffect(() => {
    if (!startedAt) return;

    const startTime = new Date(startedAt).getTime();
    const duration = timeoutSeconds * 1000;
    const endTime = startTime + duration;

    const updateTimer = () => {
      const now = Date.now();
      const diff = Math.max(0, endTime - now);
      setTimeLeft(diff);
      onTick?.(diff);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [startedAt, timeoutSeconds, onTick]);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (timeLeft === null) return null;

  const isExpired = timeLeft <= 0;

  return (
    <div
      data-testid="urgency-countdown"
      className={cn(
        'bg-destructive text-destructive-foreground rounded-full px-4 py-1.5 text-sm font-bold shadow-lg',
        !isExpired && 'animate-pulse',
        className,
      )}>
      {isExpired
        ? t('plansPage.urgency.expired')
        : t('plansPage.urgency.compact', {
            timer: formatTime(timeLeft),
            discount: discount ?? 0,
          })}
    </div>
  );
}
