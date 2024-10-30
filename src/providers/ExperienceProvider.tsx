import { useTranslation } from 'next-i18next';
import { FunctionComponent, PropsWithChildren } from 'react';
import { useBeforeUnload } from 'react-use';

import { NewsletterModalExperienceHost } from '@/features/newsletter';
import { NotificationPermissionExperienceHost } from '@/features/notification';
import { PageTitleExperienceHost } from '@/features/page_title';
import useDocumentVisibilityListener from '@/hooks/useDocumentVisibilityListener';
import useFirstInteractionListener from '@/hooks/useFirstInteractionListener';
import useNavigationStats from '@/hooks/useNavigationStats';
import { useExperienceFlagsStore } from '@/state/experience_flags';

const ExperienceProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const exitPrompt = useExperienceFlagsStore((state) => state.exitPrompt);
  const { t } = useTranslation('common');

  useFirstInteractionListener();
  useDocumentVisibilityListener();
  useNavigationStats();

  useBeforeUnload(exitPrompt, t('experiences.exitPrompt'));

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
