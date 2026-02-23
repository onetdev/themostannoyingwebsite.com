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
import { useAdblockerDetector } from '@/features/promotions';
import { NewsletterModalHost } from '@/features/newsletter';
import { NotificationPermissionHost } from '@/features/notification';
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
      <NotificationPermissionHost />
      <CopyMarker enabled={clipboardMarker} text={copyMarkerText}>
        {children}
      </CopyMarker>
    </>
  );
}
