'use client';

import { Field, FieldContent, FieldError, FieldLabel } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { useCallback, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useAppConfigContext } from '@/core/config/react-app-config';
import type { ChallengeStatus } from '../types';
import { CaptchaDialog } from './CaptchaDialog';
import { CaptchaTrigger } from './CaptchaTrigger';

export type CaptchaFieldProps = {
  fieldName?: string;
  required?: boolean;
};

export function CaptchaField({
  fieldName = 'captcha',
  required = false,
}: CaptchaFieldProps) {
  const t = useTranslations();
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();
  const [state, setState] = useState<ChallengeStatus>('idle');
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);
  const {
    verification: { challengeTriggerTimeoutMs },
  } = useAppConfigContext();

  const onResolved = () => {
    setState('resolved');
    setValue(fieldName, 'true');
  };
  const onFailed = () => {
    setState('failed');
    setValue(fieldName, '');
  };

  const handleTriggerClick = useCallback(() => {
    if (state === 'challenge' || state === 'loading') {
      return;
    }

    setState('loading');
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setState('challenge');
    }, challengeTriggerTimeoutMs);
  }, [state, challengeTriggerTimeoutMs]);

  return (
    <Field>
      <FieldLabel required={required}>
        {t('verification.captcha.field')}
      </FieldLabel>
      <FieldContent>
        <div className="my-3 flex items-center">
          <CaptchaTrigger
            status={state}
            onClick={handleTriggerClick}
            label={t('verification.captcha.proveYouAreRobot')}
          />
          <CaptchaDialog
            isOpen={state === 'challenge'}
            onResolved={onResolved}
            onFailed={onFailed}
          />
        </div>
        <input
          type="hidden"
          {...register(fieldName, {
            required: t('form.validation.error.captchaInvalid'),
          })}
        />
        <FieldError errors={[errors[fieldName]]} />
      </FieldContent>
    </Field>
  );
}
