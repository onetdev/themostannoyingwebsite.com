'use client';

import { CopyMarker } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { PropsWithChildren, useEffect } from 'react';
import { useBeforeUnload } from 'react-use';

import {
  PageTitleHost,
  useDisableContextMenu,
  useDisableNavigationPop,
} from '@/features/browser-core';
import { NewsletterModalHost } from '@/features/newsletter';
import { useAdblockerDetector } from '@/features/promotion/hooks';
import { NotificationRequestTrigger } from '@/features/user/components/NotificationRequesterTigger';
import { usePainPreferencesStore, useUserGrantsStore } from '@/stores';

export function ClientPainContainer({ children }: PropsWithChildren) {
  const t = useTranslations();
  const exitPrompt = usePainPreferencesStore((state) => state.flags.exitPrompt);
  const clipboardMarker = usePainPreferencesStore(
    (state) => state.flags.clipboardMarker,
  );

  const syncPermissions = useUserGrantsStore((state) => state.syncPermissions);

  useDisableNavigationPop();
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
      <PageTitleHost />
      <NewsletterModalHost />
      <NotificationRequestTrigger />
      <CopyMarker enabled={clipboardMarker} text={copyMarkerText}>
        {children}
      </CopyMarker>
    </>
  );
}
