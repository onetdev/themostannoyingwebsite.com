'use client';

import { Button, Icon } from '@maw/ui-lib';
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
      className="flex h-20 w-full max-w-[300px] items-center justify-between p-3 shadow-sm select-none cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center gap-3 shrink">
        <div className="border-input flex size-7 items-center justify-center rounded-sm border shrink-0">
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
        <span className="text-sm font-medium text-wrap shrink">{label}</span>
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
