import { FunctionComponent, PropsWithChildren } from 'react';
import { useBeforeUnload } from 'react-use';

import useFirstInteractionListener from '@/hooks/useFirstInteractionListener';
import useDocumentVisibilityListener from '@/hooks/useDocumentVisibilityListener';
import { selectExitPrompt } from '@/redux/selectors/experience';
import { useAppSelector } from '@/redux/hooks';
import PageTitleExperience from '@/features/page_title/components/PageTitleExperience';

const ExperienceProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const exitPrompt = useAppSelector(selectExitPrompt);

  useFirstInteractionListener();
  useDocumentVisibilityListener();

  useBeforeUnload(
    exitPrompt,
    `I'd reconsider leaving before some bad things happend to you. Are you sure?`,
  );

  return (
    <>
      <PageTitleExperience />
      {children}
    </>
  );
};

export default ExperienceProvider;
