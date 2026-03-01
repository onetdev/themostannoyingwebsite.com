'use client';

import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { useBeforeUnload } from 'react-use';
import { emit } from '@/eventBus';
import { usePainPreferencesStore } from '@/stores';

export function usePreventLeaving() {
  const t = useTranslations();
  const exitPrompt = usePainPreferencesStore((state) => state.flags.exitPrompt);

  useBeforeUnload(exitPrompt, t('app.exitPrompt'));

  useEffect(() => {
    if (exitPrompt) {
      const handleBeforeUnload = () => {
        emit('EXIT_PROMPT_TRIGGERED');
      };
      window.addEventListener('beforeunload', handleBeforeUnload);
      return () =>
        window.removeEventListener('beforeunload', handleBeforeUnload);
    }
  }, [exitPrompt]);
}
