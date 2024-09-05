'use client';

import { useTranslation } from 'next-i18next';

import { useExperienceFlagsStore } from '@/state/experience_flags';
import { useRuntimeStore } from '@/state/runtime';

import ArrayPagedTitle from './ArrayPagedTitle';
import MarqueeTitle from './MarqueeTitle';
import GlitchyTitle from './GlitchyTitle';

/**
 * Experiments on manipulating the page title. Unfortunatelly the refresh rate
 * is quite low and the title is not updated as frequently as I would like.
 */
const PageTitleExperience = () => {
  const pageTitleExperience = useExperienceFlagsStore(
    (state) => state.pageTitle,
  );
  const isVisible = useRuntimeStore((state) => state.document.isVisible);
  const hasInteracted = useRuntimeStore((state) => state.interactionUnlocked);
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
