'use client';

import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { useBeforeUnload } from 'react-use';

import { useEventBus } from '@/contexts/EventBusContext';
import { usePainPreferencesStore } from '@/stores';

export function usePreventLeaving() {
  const t = useTranslations();
  const { dispatch } = useEventBus();
  const exitPrompt = usePainPreferencesStore((state) => state.flags.exitPrompt);

  useBeforeUnload(exitPrompt, t('app.exitPrompt'));

  useEffect(() => {
    if (exitPrompt) {
      const handleBeforeUnload = () => {
        dispatch('EXIT_PROMPT_TRIGGERED');
      };
      window.addEventListener('beforeunload', handleBeforeUnload);
      return () =>
        window.removeEventListener('beforeunload', handleBeforeUnload);
    }
  }, [dispatch, exitPrompt]);
}
