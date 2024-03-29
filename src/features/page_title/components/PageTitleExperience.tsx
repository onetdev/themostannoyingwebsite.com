import { useTranslation } from 'next-i18next';

import { useAppSelector } from '@/redux/hooks';
import {
  selectInteractionUnlocked,
  selectIsDocumentVisible,
} from '@/redux/selectors/runtime';
import { selectPageTitle } from '@/redux/selectors/experience';

import ArrayPagedTitle from './ArrayPagedTitle';
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
  const { t } = useTranslation('common');

  // Using arrays in language might be stretching how i18n should be used 😰
  // Anyways, in case of returnObjects being true we need to first convert
  // the magic object into an array.
  const marqueeVariants = Array.from(
    t('experiences.marquee_variants', {
      returnObjects: true,
      defaultValue: [],
    }),
  ) as string[];
  const arrayPagedVariants = Array.from(
    t('experiences.array_paged_variants', {
      returnObjects: true,
      defaultValue: [],
    }),
  ) as string[];

  return (
    <>
      {pageTitleExperience.inactiveMarquee && marqueeVariants.length > 0 && (
        <MarqueeTitle
          enabled={hasInteracted && !isVisible}
          text={marqueeVariants[0]}
        />
      )}
      {pageTitleExperience.randomGlitch && (
        <GlitchyTitle enabled={hasInteracted && isVisible} />
      )}
      {pageTitleExperience.inactiveArrayPaged && (
        <ArrayPagedTitle
          enabled={hasInteracted && !isVisible}
          texts={arrayPagedVariants}
        />
      )}
    </>
  );
};

export default PageTitleExperience;
