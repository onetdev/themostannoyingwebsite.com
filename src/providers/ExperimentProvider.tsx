import { FunctionComponent, PropsWithChildren } from 'react';
import { useBeforeUnload } from 'react-use';

import useFirstInteraction from '@/hooks/useFirstInteraction';
import useInFocusMeter from '@/hooks/useInFocusMeter';
import { selectExitPrompt } from '@/redux/selectors/experience';
import { useAppSelector } from '@/redux/hooks';

const ExperimentProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const exitPrompt = useAppSelector(selectExitPrompt);

  useFirstInteraction();
  useInFocusMeter();

  useBeforeUnload(
    exitPrompt,
    `I'd reconsider leaving before some bad things happend to you. Are you sure?`,
  );

  return children;
};

export default ExperimentProvider;
