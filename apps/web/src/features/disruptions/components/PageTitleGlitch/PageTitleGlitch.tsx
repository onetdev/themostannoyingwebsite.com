'use client';

import { useMessages } from 'next-intl';
import { useMemo } from 'react';
import { usePainPreferencesStore, useRuntimeStore } from '@/stores';
import {
  useArrayPagedTitle,
  useGlitchyTitle,
  useMarqueeTitle,
} from '../../hooks';

/**
 * Pain point of manipulating the page title. Unfortunatelly the refresh rate
 * is quite low and the title is not updated as frequently as I would like.
 */
export function PageTitleGlitch() {
  const messages = useMessages() as AppTranslationShape;
  const isVisible = useRuntimeStore((state) => state.document.isVisible);
  const inactiveMarquee = usePainPreferencesStore(
    (state) => state.flags['pageTitle.inactiveMarquee'],
  );
  const randomGlitch = usePainPreferencesStore(
    (state) => state.flags['pageTitle.randomGlitch'],
  );
  const inactiveArrayPaged = usePainPreferencesStore(
    (state) => state.flags['pageTitle.inactiveArrayPaged'],
  );
  const hasInteracted = useRuntimeStore(
    (state) => state.userActivation.unlocked,
  );

  const marqueeVariants = useMemo(
    () => Object.values(messages.disruptions.titleExperience.marqueeVariants),
    [messages.disruptions.titleExperience.marqueeVariants],
  );

  const arrayPagedVariants = useMemo(
    () =>
      Object.values(messages.disruptions.titleExperience.arrayPagedVariants),
    [messages.disruptions.titleExperience.arrayPagedVariants],
  );

  useMarqueeTitle({
    enabled: !!(
      inactiveMarquee &&
      marqueeVariants.length > 0 &&
      hasInteracted &&
      !isVisible
    ),
    text: marqueeVariants[0],
  });

  useGlitchyTitle({
    enabled: !!(randomGlitch && hasInteracted && isVisible),
  });

  useArrayPagedTitle({
    enabled: !!(inactiveArrayPaged && hasInteracted && !isVisible),
    texts: arrayPagedVariants,
  });

  return null;
}
