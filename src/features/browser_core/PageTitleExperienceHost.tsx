'use client';

import { FunctionComponent } from 'react';

import ArrayPagedTitle from './components/ArrayPagedTitle';
import GlitchyTitle from './components/GlitchyTitle';
import MarqueeTitle from './components/MarqueeTitle';

import { useExperienceFlagsStore } from '@/lib/state/experience_flags';
import { useRuntimeStore } from '@/lib/state/runtime';
import { useMessages, useTranslations } from 'next-intl';

/**
 * Experience of manipulating the page title. Unfortunatelly the refresh rate
 * is quite low and the title is not updated as frequently as I would like.
 */
const PageTitleExperienceHost: FunctionComponent = () => {
  const pageTitleExperience = useExperienceFlagsStore(
    (state) => state.pageTitle,
  );
  const isVisible = useRuntimeStore((state) => state.document.isVisible);
  const hasInteracted = useRuntimeStore((state) => state.interactionUnlocked);
  const t = useTranslations();
  const messages = useMessages();

  const marqueeVariants = Object
    .keys(messages.titleExperience.marqueeVariants)
    .map((key) => t(`titleExperience.marqueeVariants.${key}`));

  const arrayPagedVariants = Object
    .keys(messages.titleExperience.arrayPagedVariants)
    .map((key) => t(`titleExperience.arrayPagedVariants.${key}`))

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

export default PageTitleExperienceHost;
