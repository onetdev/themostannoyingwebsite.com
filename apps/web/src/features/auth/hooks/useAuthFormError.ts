'use client';

import { useTranslations } from 'next-intl';

import { AuthError } from '../schemas';

export function useAuthFormError() {
  const t = useTranslations('form.validation.error');

  const errorTranslations: Record<AuthError, string> = {
    IMPOSSIBLE_PATH: t('impossiblePath'),
    UNKNOWN_ERROR: t('unknownError'),
  };

  function translate(errorCode?: AuthError) {
    return (
      (errorCode ? errorTranslations[errorCode] : null) || t('unknownError')
    );
  }

  return {
    translate,
  };
}
