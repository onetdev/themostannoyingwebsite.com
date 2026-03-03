'use client';

import { Field, FieldContent, FieldError, FieldLabel } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';

import { useCaptchaChallenge } from '../hooks/useCaptchaChallenge';
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

  const captchaText = {
    label: t('verification.captcha.field'),
    proveYouAreRobot: t('verification.captcha.proveYouAreRobot'),
    emojiHint: t('verification.captcha.emojiHint'),
    tilePuzzleHint: t('verification.captcha.tilePuzzleHint'),
    gridSelectHint: t('verification.captcha.gridSelectHint'),
    gridSelectPrompts: t.raw('verification.captcha.gridSelectPrompts'),
    invalid: t('form.validation.error.captchaInvalid'),
  };

  const {
    status,
    challengeType,
    progress,
    handleCheckboxClick,
    handleChallengeResolved,
    handleReset,
    handleDismiss,
  } = useCaptchaChallenge({
    onResolved: () => setValue(fieldName, 'true'),
    onFailed: () => setValue(fieldName, ''),
  });

  return (
    <Field>
      <FieldLabel required={required}>{captchaText.label}</FieldLabel>
      <FieldContent>
        <div className="my-3 flex items-center">
          <CaptchaTrigger
            status={status}
            onClick={handleCheckboxClick}
            label={captchaText.proveYouAreRobot}
          />

          <CaptchaDialog
            isOpen={status === 'challenge'}
            type={challengeType}
            onResolved={handleChallengeResolved}
            onReset={handleReset}
            onDismiss={handleDismiss}
            progress={progress}
          />
        </div>
        <input
          type="hidden"
          {...register(fieldName, {
            required: captchaText.invalid,
          })}
        />
        <FieldError errors={[errors[fieldName]]} />
      </FieldContent>
    </Field>
  );
}
