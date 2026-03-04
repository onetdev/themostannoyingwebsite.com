'use client';

import { Button, Icon } from '@maw/ui-lib';
import { clsx } from '@maw/ui-lib/utils';
import { useTranslations } from 'next-intl';
import type { ChallengeStatus } from '../types';

export interface CaptchaTriggerProps {
  status: ChallengeStatus;
  onClick: () => void;
  label: string;
}

export function CaptchaTrigger({
  status,
  onClick,
  label,
}: CaptchaTriggerProps) {
  const t = useTranslations();

  return (
    <Button
      type="button"
      variant="outline"
      className={clsx(
        'flex h-20 w-full max-w-[300px] items-center justify-between p-3 shadow-sm select-none cursor-pointer',
        status === 'failed' && 'border-destructive ring-1 ring-destructive',
      )}
      onClick={onClick}
    >
      <div className="flex items-center gap-3 shrink">
        <div
          className={clsx(
            'border-input flex size-7 items-center justify-center rounded-sm border shrink-0',
            status === 'failed' && 'border-destructive bg-destructive/10',
          )}
        >
          {status === 'resolved' && (
            <Icon icon="checkCircle" className="text-success" />
          )}
          {(status === 'loading' || status === 'challenge') && (
            <Icon icon="spinner" className="text-primary animate-spin" />
          )}
          {status === 'failed' && (
            <Icon icon="xmarkCircle" className="text-destructive" />
          )}
        </div>
        <span
          className={clsx(
            'text-sm font-medium text-wrap shrink',
            status === 'failed' && 'text-destructive',
          )}
        >
          {label}
        </span>
      </div>
      <div className="flex flex-col gap-1 items-center opacity-50">
        <Icon icon="lock" className="text-2xl" />
        <span className="text-[8px]">
          <div>{t('verification.captcha.roboCop')}</div>
          <div>{t('verification.captcha.protected')}</div>
        </span>
      </div>
    </Button>
  );
}
