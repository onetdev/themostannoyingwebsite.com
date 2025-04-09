'use client';

import { FunctionComponent, PropsWithChildren, useEffect } from 'react';
import { useBeforeUnload } from 'react-use';

import { CopyMarker } from '@maw/ui';
import {
  useDisableContextMenu,
  useDisableNavigationPop,
} from '@/features/browser_core';
import { PageTitleExperienceHost } from '@/features/browser_core';
import useAdblockerDetector from '@/features/gifts/hooks/useAdblockerDetector';
import { NewsletterModalExperienceHost } from '@/features/newsletter';
import { NotificationPermissionExperienceHost } from '@/features/notification';
import { useExperienceFlagsStore } from '@/lib/state/experience_flags';
import { useUserGrantsStore } from '@/lib/state/user_grants';
import { useTranslations } from 'next-intl';

const ExperienceProvider: FunctionComponent<PropsWithChildren> = ({
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
    readMoreAt: t('app.readMoreAt')
  }

  return (
    <>
      <PageTitleExperienceHost />
      <NewsletterModalExperienceHost />
      <NotificationPermissionExperienceHost />
      <CopyMarker enabled={clipboardMarker} text={copyMarkerText}>{children}</CopyMarker>
    </>
  );
};

export default ExperienceProvider;
