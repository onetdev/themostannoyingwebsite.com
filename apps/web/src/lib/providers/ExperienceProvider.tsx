'use client';

import { FunctionComponent, PropsWithChildren, useEffect } from 'react';
import { useBeforeUnload } from 'react-use';

import CopyMarker from '@/root/apps/web/src/components/atoms/CopyMarker';
import {
  useDisableContextMenu,
  useDisableNavigationPop,
} from '@/root/apps/web/src/features/browser_core';
import { PageTitleExperienceHost } from '@/root/apps/web/src/features/browser_core';
import useAdblockerDetector from '@/root/apps/web/src/features/gifts/hooks/useAdblockerDetector';
import { NewsletterModalExperienceHost } from '@/root/apps/web/src/features/newsletter';
import { NotificationPermissionExperienceHost } from '@/root/apps/web/src/features/notification';
import { useExperienceFlagsStore } from '@/root/apps/web/src/lib/state/experience_flags';
import { useUserGrantsStore } from '@/root/apps/web/src/lib/state/user_grants';
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
