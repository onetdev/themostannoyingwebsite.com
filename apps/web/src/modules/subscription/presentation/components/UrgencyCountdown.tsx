'use client';

import { Alert, AlertDescription, AlertTitle, Icon } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { useRuntimeStore } from '@/kernel';

interface UrgencyCountdownProps {
  timerSeconds?: number;
  onTick?: (timeLeft: number) => void;
}

export function UrgencyCountdown({
  timerSeconds = 600,
  onTick,
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

  return (
    <Alert variant={timeLeft > 0 ? 'info' : 'destructive'} className="mb-10">
      <Icon
        icon={timeLeft > 0 ? 'info' : 'failed'}
        className={timeLeft > 0 ? 'animate-pulse' : ''}
      />
      <AlertTitle className="font-bold">
        {t('plansPage.urgency.title')}
      </AlertTitle>
      <AlertDescription className="text-lg">
        {timeLeft > 0
          ? t('plansPage.urgency.description', {
              timer: formatTime(timeLeft),
            })
          : t('plansPage.urgency.expired')}
      </AlertDescription>
    </Alert>
  );
}
