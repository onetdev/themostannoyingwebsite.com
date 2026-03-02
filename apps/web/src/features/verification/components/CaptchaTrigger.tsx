'use client';

import { Button, Icon } from '@maw/ui-lib';
import type { CaptchaStatus } from '../hooks/use-captcha-challenge';

export interface CaptchaTriggerProps {
  status: CaptchaStatus;
  onClick: () => void;
  label: string;
}

export function CaptchaTrigger({
  status,
  onClick,
  label,
}: CaptchaTriggerProps) {
  return (
    <Button
      variant="outline"
      className="flex h-20 w-full max-w-[300px] items-center justify-between p-3 shadow-sm select-none cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className="border-input flex size-7 items-center justify-center rounded-sm border bg-white">
          {(status === 'loading' || status === 'challenge') && (
            <Icon icon="spinner" className="text-primary animate-spin" />
          )}
          {status === 'failed' && (
            <Icon icon="xmarkCircle" className="text-red-500" />
          )}
        </div>
        <span className="text-sm font-medium">{label}</span>
      </div>
      <div className="flex flex-col gap-1 items-center opacity-50">
        <Icon icon="checkCircle" className="text-2xl" />
        <span className="text-[8px]">
          <div>roboCOP</div>
          <div>protected</div>
        </span>
      </div>
    </Button>
  );
}
