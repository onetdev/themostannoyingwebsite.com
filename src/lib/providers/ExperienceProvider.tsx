import { useTranslation } from 'next-i18next';
import { FunctionComponent, PropsWithChildren, useEffect } from 'react';
import { useBeforeUnload } from 'react-use';

import { useContextMenu } from '@/features/context_menu';
import useAdblockerDetector from '@/features/gifts/hooks/useAdblockerDetector';
import { NewsletterModalExperienceHost } from '@/features/newsletter';
import { NotificationPermissionExperienceHost } from '@/features/notification';
import { PageTitleExperienceHost } from '@/features/page_title';
import { useExperienceFlagsStore } from '@/lib/state/experience_flags';
import { useUserGrantsStore } from '@/lib/state/user_grants';

const ExperienceProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const exitPrompt = useExperienceFlagsStore((state) => state.exitPrompt);
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
      {children}
    </>
  );
};

export default ExperienceProvider;
