import { useTranslation } from 'next-i18next';
import { FunctionComponent, PropsWithChildren, useEffect } from 'react';
import { useBeforeUnload } from 'react-use';

import CopyMarker from '@/components/atoms/CopyMarker';
import { useContextMenu } from '@/features/browser_core';
import { PageTitleExperienceHost } from '@/features/browser_core';
import useAdblockerDetector from '@/features/gifts/hooks/useAdblockerDetector';
import { NewsletterModalExperienceHost } from '@/features/newsletter';
import { NotificationPermissionExperienceHost } from '@/features/notification';
import { useExperienceFlagsStore } from '@/lib/state/experience_flags';
import { useUserGrantsStore } from '@/lib/state/user_grants';

const ExperienceProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const exitPrompt = useExperienceFlagsStore((state) => state.exitPrompt);
  const clipboardMarker = useExperienceFlagsStore(
    (state) => state.clipboardMarker,
  );
  const syncPermissions = useUserGrantsStore((state) => state.syncPermissions);
  const { t } = useTranslation('common');

  useContextMenu();
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
