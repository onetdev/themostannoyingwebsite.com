import { useAppSelector } from '@/redux/hooks';
import {
  selectInteractionUnlocked,
  selectIsDocumentVisible,
} from '@/redux/selectors/runtime';

import GlitchyTitle from './GlitchyTitle';
import MarqueeTitle from './MarqueeTitle';

/**
 * Experiments on manipulating the page title. Unfortunatelly the refresh rate
 * is quite low and the title is not updated as frequently as I would like.
 */
const PageTitleExperiment = () => {
  const isVisible = useAppSelector(selectIsDocumentVisible);
  const hasInteracted = useAppSelector(selectInteractionUnlocked);

  return (
    <>
      <MarqueeTitle
        enabled={hasInteracted && !isVisible}
        text="📣 Come back please 🏃‍♀️🏃 We have candy!! 🚐"
      />
      <GlitchyTitle enabled={hasInteracted && isVisible} />
    </>
  );
};

export default PageTitleExperiment;
