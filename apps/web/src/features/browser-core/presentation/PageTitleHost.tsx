'use client';

import { useMessages, useTranslations } from 'next-intl';

import { ArrayPagedTitle } from './components/ArrayPagedTitle';
import { GlitchyTitle } from './components/GlitchyTitle';
import { MarqueeTitle } from './components/MarqueeTitle';

import { usePainPreferencesStore, useRuntimeStore } from '@/stores';

/**
 * Pain point of manipulating the page title. Unfortunatelly the refresh rate
 * is quite low and the title is not updated as frequently as I would like.
 */
export function PageTitleHost() {
  const inactiveMarquee = usePainPreferencesStore(
    (state) => state.flags['pageTitle.inactiveMarquee'],
  );
  const randomGlitch = usePainPreferencesStore(
    (state) => state.flags['pageTitle.randomGlitch'],
  );
  const inactiveArrayPaged = usePainPreferencesStore(
    (state) => state.flags['pageTitle.inactiveArrayPaged'],
  );
  const isVisible = useRuntimeStore((state) => state.document.isVisible);
  const hasInteracted = useRuntimeStore(
    (state) => state.userActivation.unlocked,
  );
  const t = useTranslations();
  const messages = useMessages();

  const marqueeVariants = Object.keys(
    messages.titleExperience.marqueeVariants,
  ).map((key) => t(`titleExperience.marqueeVariants.${key}`));

  const arrayPagedVariants = Object.keys(
    messages.titleExperience.arrayPagedVariants,
  ).map((key) => t(`titleExperience.arrayPagedVariants.${key}`));

  return (
    <>
      {inactiveMarquee && marqueeVariants.length > 0 && (
        <MarqueeTitle
          enabled={hasInteracted && !isVisible}
          text={marqueeVariants[0]}
        />
      )}
      {randomGlitch && <GlitchyTitle enabled={hasInteracted && isVisible} />}
      {inactiveArrayPaged && (
        <ArrayPagedTitle
          enabled={hasInteracted && !isVisible}
          texts={arrayPagedVariants}
        />
      )}
    </>
  );
}
