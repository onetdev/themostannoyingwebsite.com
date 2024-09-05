import { FunctionComponent, PropsWithChildren } from 'react';
import { useBeforeUnload } from 'react-use';
import { useTranslation } from 'next-i18next';

import useFirstInteractionListener from '@/hooks/useFirstInteractionListener';
import useDocumentVisibilityListener from '@/hooks/useDocumentVisibilityListener';
import PageTitleExperience from '@/features/page_title/components/PageTitleExperience';
import NotificationPermissionExperience from '@/features/notification/components/NotificationPermissionEperience';
import { useExperienceFlagsStore } from '@/state/experience_flags';

const ExperienceProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const exitPrompt = useExperienceFlagsStore((state) => state.exitPrompt);
  const { t } = useTranslation('common');

  useFirstInteractionListener();
  useDocumentVisibilityListener();

  useBeforeUnload(exitPrompt, t('experiences.exit_prompt'));

  return (
    <>
      <PageTitleExperience />
      <NotificationPermissionExperience />
      {children}
    </>
  );
};

export default ExperienceProvider;
