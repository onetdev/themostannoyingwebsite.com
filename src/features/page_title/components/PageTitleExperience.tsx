import { useAppSelector } from '@/redux/hooks';
import {
  selectInteractionUnlocked,
  selectIsDocumentVisible,
} from '@/redux/selectors/runtime';
import { selectPageTitle } from '@/redux/selectors/experience';

import ArrayPagedTitle from './PagedTitle';
import MarqueeTitle from './MarqueeTitle';
import GlitchyTitle from './GlitchyTitle';

/**
 * Experiments on manipulating the page title. Unfortunatelly the refresh rate
 * is quite low and the title is not updated as frequently as I would like.
 */
const PageTitleExperience = () => {
  const pageTitleExperience = useAppSelector(selectPageTitle);
  const isVisible = useAppSelector(selectIsDocumentVisible);
  const hasInteracted = useAppSelector(selectInteractionUnlocked);

  return (
    <>
      {pageTitleExperience.inactiveMarquee && (
        <MarqueeTitle
          enabled={hasInteracted && !isVisible}
          text="📣 Come back please 🏃‍♀️🏃 We have candy!! 🚐"
        />
      )}
      {pageTitleExperience.randomGlitch && (
        <GlitchyTitle enabled={hasInteracted && isVisible} />
      )}
      {pageTitleExperience.inactiveArrayPaged && (
        <ArrayPagedTitle
          enabled={hasInteracted && !isVisible}
          texts={['⭐️ HEY YOU 🫵', '😜 YES YOU 😱', '📣 COME BACK 🏃']}
        />
      )}
    </>
  );
};

export default PageTitleExperience;
