'use client';

import { Icon } from '@maw/ui-lib';
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
    <button
      type="button"
      className="bg-muted flex h-20 w-full max-w-[300px] items-center justify-between border p-3 shadow-sm select-none cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className="border-input flex size-7 items-center justify-center rounded-sm border bg-white">
          {(status === 'loading' || status === 'challenge') && (
            <Icon icon="spinner" className="text-primary animate-spin" />
          )}
        </div>
        <span className="text-sm font-medium">{label}</span>
      </div>
      <div className="flex flex-col items-center opacity-50">
        <Icon icon="checkCircle" className="text-2xl" />
        <span className="text-[8px] uppercase">reCAPTCHA</span>
        <div className="flex gap-1 text-[8px]">
          <span>Privacy</span>
          <span>Terms</span>
        </div>
      </div>
    </button>
  );
}
