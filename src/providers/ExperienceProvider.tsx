import { FunctionComponent, PropsWithChildren } from 'react';
import { useBeforeUnload } from 'react-use';
import { useTranslation } from 'next-i18next';

import useFirstInteractionListener from '@/hooks/useFirstInteractionListener';
import useDocumentVisibilityListener from '@/hooks/useDocumentVisibilityListener';
import { PageTitleExperienceHost } from '@/features/page_title';
import { NotificationPermissionExperienceHost } from '@/features/notification';
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
      <PageTitleExperienceHost />
      <NotificationPermissionExperienceHost />
      {children}
    </>
  );
};

export default ExperienceProvider;
