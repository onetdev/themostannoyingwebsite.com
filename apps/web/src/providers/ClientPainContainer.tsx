'use client';

import { CopyMarker } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { PropsWithChildren, useEffect } from 'react';
import { useBeforeUnload } from 'react-use';

import { usePainPreferencesStore, useUserGrantsStore } from '@/kernel';
import {
  PageTitleHost,
  useDisableContextMenu,
  useDisableNavigationPop,
} from '@/modules/browser-core';
import { useAdblockerDetector } from '@/modules/gift';
import { NewsletterModalHost } from '@/modules/newsletter';
import { NotificationPermissionHost } from '@/modules/notification';

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
