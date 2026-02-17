'use client';

import { cn } from '@maw/ui-lib/utils';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { useRuntimeStore } from '@/kernel';

interface UrgencyCountdownProps {
  timerSeconds?: number;
  discount?: number;
  onTick?: (timeLeft: number) => void;
  className?: string;
}

export function UrgencyCountdown({
  timerSeconds = 600,
  discount,
  onTick,
  className,
}: UrgencyCountdownProps) {
  const t = useTranslations();
  const { startedAt } = useRuntimeStore();
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    if (!startedAt) return;

    const startTime = new Date(startedAt).getTime();
    const duration = timerSeconds * 1000;
    const endTime = startTime + duration;

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = Math.max(0, endTime - now);
      setTimeLeft(diff);
      onTick?.(diff);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [startedAt, timerSeconds, onTick]);

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
