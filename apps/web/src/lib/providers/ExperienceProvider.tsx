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
  const exitPrompt = useExperienceFlagsStore((state) => state.exitPrompt);
  const clipboardMarker = useExperienceFlagsStore(
    (state) => state.clipboardMarker,
  );
  const syncPermissions = useUserGrantsStore((state) => state.syncPermissions);
  const t = useTranslations();

  useDisableNavigationPop();
  useDisableContextMenu();
  useAdblockerDetector();
  useBeforeUnload(exitPrompt, t('app.exitPrompt'));

  useEffect(() => {
    syncPermissions();
  }, [syncPermissions]);

  return (
    <>
      <PageTitleExperienceHost />
      <NewsletterModalExperienceHost />
      <NotificationPermissionExperienceHost />
      <CopyMarker enabled={clipboardMarker}>{children}</CopyMarker>
    </>
  );
};

export default ExperienceProvider;
