'use client';

import { useTranslations } from 'next-intl';

import { AuthErrorType } from '../../domain';

export function useAuthError() {
  const t = useTranslations('form.validation.error');

  const errorTranslations: Record<AuthErrorType, string> = {
    IMPOSSIBLE_PATH: t('impossiblePath'),
    UNKNOWN_ERROR: t('unknownError'),
  };

  function translate(errorCode?: AuthErrorType) {
    return (
      (errorCode ? errorTranslations[errorCode] : null) || t('unknownError')
    );
  }

  return {
    translate,
  };
}
