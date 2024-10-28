import { useTranslation } from 'next-i18next';
import { FunctionComponent, PropsWithChildren } from 'react';
import { useBeforeUnload } from 'react-use';

import { NewsletterModalExperienceHost } from '@/features/newsletter';
import { NotificationPermissionExperienceHost } from '@/features/notification';
import { PageTitleExperienceHost } from '@/features/page_title';
import useDocumentVisibilityListener from '@/hooks/useDocumentVisibilityListener';
import useFirstInteractionListener from '@/hooks/useFirstInteractionListener';
import { useExperienceFlagsStore } from '@/state/experience_flags';

const ExperienceProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const { exitPrompt, newsletterModal, notifications } =
    useExperienceFlagsStore();
  const { t } = useTranslation('common');

  useFirstInteractionListener();
  useDocumentVisibilityListener();

  useBeforeUnload(exitPrompt, t('experiences.exitPrompt'));

  return (
    <>
      <PageTitleExperienceHost />
      {newsletterModal && <NewsletterModalExperienceHost />}
      {notifications && <NotificationPermissionExperienceHost />}
      {children}
    </>
  );
};

export default ExperienceProvider;
