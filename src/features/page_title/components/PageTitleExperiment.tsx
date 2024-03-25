import { useAppSelector } from '@/redux/hooks';
import {
  selectInteractionUnlocked,
  selectIsDocumentVisible,
} from '@/redux/selectors/runtime';

import GlitchyTitle from './GlitchyTitle';
import ArrayPagedTitle from './PagedTitle';

/**
 * Experiments on manipulating the page title. Unfortunatelly the refresh rate
 * is quite low and the title is not updated as frequently as I would like.
 */
const PageTitleExperiment = () => {
  const isVisible = useAppSelector(selectIsDocumentVisible);
  const hasInteracted = useAppSelector(selectInteractionUnlocked);

  return (
    <>
      {/* It works but with the current browser landscape it is super slow. */}
      {/* <MarqueeTitle
        enabled={hasInteracted && !isVisible}
        text="📣 Come back please 🏃‍♀️🏃 We have candy!! 🚐"
      /> */}
      <ArrayPagedTitle
        enabled={hasInteracted && !isVisible}
        texts={['⭐️ HEY YOU 🫵', '😜 YES YOU 😱', '📣 COME BACK 🏃']}
      />
      <GlitchyTitle enabled={hasInteracted && isVisible} />
    </>
  );
};

export default PageTitleExperiment;
