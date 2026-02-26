'use client';

import { CopyMarker } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { type PropsWithChildren, useEffect } from 'react';
import { useBeforeUnload } from 'react-use';

import { PageTitleGlitch } from '@/features/interferrer/components';
import {
  useDisableContextMenu,
  useNavigationHistoryClutter,
} from '@/features/interferrer/hooks';
import { NewsletterModalTrigger } from '@/features/newsletter/components';
import { useAdblockerDetector } from '@/features/promotion/hooks';
import { NotificationPromptTrigger } from '@/features/user/components';
import { usePainPreferencesStore, useUserGrantsStore } from '@/stores';

export function ClientPainContainer({ children }: PropsWithChildren) {
  const t = useTranslations();
  const exitPrompt = usePainPreferencesStore((state) => state.flags.exitPrompt);
  const clipboardMarker = usePainPreferencesStore(
    (state) => state.flags.clipboardMarker,
  );

  const syncPermissions = useUserGrantsStore((state) => state.syncPermissions);

  useNavigationHistoryClutter();
  useDisableContextMenu();
  useAdblockerDetector();
  useBeforeUnload(exitPrompt, t('app.exitPrompt'));

  useEffect(() => {
    syncPermissions();
  }, [syncPermissions]);

  const copyMarkerText = {
    readMoreAt: t('app.readMoreAt'),
  };

  return (
    <>
      <PageTitleGlitch />
      <NewsletterModalTrigger />
      <NotificationPromptTrigger />
      <CopyMarker enabled={clipboardMarker} text={copyMarkerText}>
        {children}
      </CopyMarker>
    </>
  );
}
