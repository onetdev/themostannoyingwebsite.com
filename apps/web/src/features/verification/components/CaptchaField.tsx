'use client';

import { useTranslations } from 'next-intl';

import config from '@/core/config';
import { CaptchaCheckboxChallengeField } from './CaptchaCheckboxChallengeField';

export function CaptchaField() {
  const t = useTranslations();

  const captchaText = {
    label: t('form.captcha.field'),
    proveYouAreRobot: t('form.captcha.proveYouAreRobot'),
    emojiHint: t('form.captcha.captchaEmojiHint'),
    tilePuzzleHint: t('form.captcha.captchaTilePuzzleHint'),
    gridSelectHint: t('form.captcha.captchaGridSelectHint'),
    gridSelectPrompts: t.raw('form.captcha.captchaGridSelectPrompts'),
    invalid: t('form.validation.error.captchaInvalid'),
  };

  return (
    <CaptchaCheckboxChallengeField
      text={captchaText}
      assets={config.auth.assets}
    />
  );
}
