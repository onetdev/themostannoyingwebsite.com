'use client';

import { CopyMarker } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { FunctionComponent, PropsWithChildren, useEffect } from 'react';
import { useBeforeUnload } from 'react-use';

import {
  PageTitleExperienceHost,
  useDisableContextMenu,
  useDisableNavigationPop,
} from '@/features/browser_core';
import useAdblockerDetector from '@/features/gifts/hooks/useAdblockerDetector';
import { NewsletterModalExperienceHost } from '@/features/newsletter';
import { NotificationPermissionExperienceHost } from '@/features/notification';
import { useExperienceFlagsStore } from '@/state/experience_flags';
import { useUserGrantsStore } from '@/state/user_grants';

export const ExperienceProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const t = useTranslations();
  const exitPrompt = useExperienceFlagsStore((state) => state.exitPrompt);
  const clipboardMarker = useExperienceFlagsStore(
    (state) => state.clipboardMarker,
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
      <PageTitleExperienceHost />
      <NewsletterModalExperienceHost />
      <NotificationPermissionExperienceHost />
      <CopyMarker enabled={clipboardMarker} text={copyMarkerText}>
        {children}
      </CopyMarker>
    </>
  );
};
