'use client';

import { Field, FieldContent, FieldError, FieldLabel } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';

import config from '@/core/config';
import { useCaptchaChallenge } from '../hooks/use-captcha-challenge';
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
    label: t('form.captcha.field'),
    proveYouAreRobot: t('form.captcha.proveYouAreRobot'),
    emojiHint: t('form.captcha.captchaEmojiHint'),
    tilePuzzleHint: t('form.captcha.captchaTilePuzzleHint'),
    gridSelectHint: t('form.captcha.captchaGridSelectHint'),
    gridSelectPrompts: t.raw('form.captcha.captchaGridSelectPrompts'),
    invalid: t('form.validation.error.captchaInvalid'),
  };

  const assets = config.verification.assets;

  const {
    status,
    challengeType,
    gridPrompt,
    gridImage,
    progress,
    handleCheckboxClick,
    handleChallengeResolved,
    handleReset,
    handleDismiss,
  } = useCaptchaChallenge({
    onResolved: () => setValue(fieldName, 'true'),
    onFailed: () => setValue(fieldName, ''),
    gridSelectPrompts: captchaText.gridSelectPrompts,
    captchaRandom: assets.captchaRandom,
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
            gridPrompt={gridPrompt}
            gridImage={gridImage}
            progress={progress}
            text={captchaText}
            assets={assets}
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
