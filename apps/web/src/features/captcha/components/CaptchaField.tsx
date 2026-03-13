'use client';

import { Field, FieldContent, FieldError, FieldLabel } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { useCallback, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useAppConfigContext } from '@/core/config/react/AppConfig';
import type { ChallengeStatus } from '../types';
import { CaptchaDialog } from './CaptchaDialog';
import { CaptchaTrigger } from './CaptchaTrigger';

export type CaptchaFieldProps = {
  fieldName?: string;
  required?: boolean;
};

export function CaptchaField({
  fieldName = 'captcha',
  required = true,
}: CaptchaFieldProps) {
  const t = useTranslations();
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();
  const [status, setStatus] = useState<ChallengeStatus>('idle');
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);
  const {
    captcha: { challengeTriggerTimeoutMs },
  } = useAppConfigContext();

  const onResolved = () => {
    setStatus('resolved');
    setValue(fieldName, 'true');
  };
  const onFailed = () => {
    setStatus('failed');
    setValue(fieldName, '');
  };

  const handleTriggerClick = useCallback(() => {
    if (status === 'challenge' || status === 'loading') {
      return;
    }

    setStatus('loading');
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setStatus('challenge');
    }, challengeTriggerTimeoutMs);
  }, [status, challengeTriggerTimeoutMs]);

  return (
    <Field>
      <FieldLabel required={required}>
        {t('humanVerification.captcha.field')}
      </FieldLabel>
      <FieldContent>
        <div className="my-3 flex items-center">
          <CaptchaTrigger
            status={status}
            onClick={handleTriggerClick}
            label={t('humanVerification.captcha.proveYouAreRobot')}
          />
          <CaptchaDialog
            isOpen={status === 'challenge'}
            onResolved={onResolved}
            onFailed={onFailed}
          />
        </div>
        <input
          type="hidden"
          {...register(fieldName, {
            required: t('common.validation.error.captchaInvalid'),
          })}
        />
        <FieldError errors={[errors[fieldName]]} />
      </FieldContent>
    </Field>
  );
}
