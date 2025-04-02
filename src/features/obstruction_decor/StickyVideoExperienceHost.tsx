'use client';

import { FunctionComponent, useEffect, useRef, useState } from 'react';

import Icon from '@/components/atoms/Icon';
import { useExperienceFlagsStore } from '@/lib/state/experience_flags';
import { useUserGrantsStore } from '@/lib/state/user_grants';
import { useTranslations } from 'next-intl';

const StickyVideoExperienceHost: FunctionComponent = () => {
  const stickyVideo = useExperienceFlagsStore((state) => state.stickyVideo);
  const allowed = useUserGrantsStore((state) => state.reviewCompleted);
  const [mounted, setMounted] = useState(false);
  const [closed, setClosed] = useState(false);
  const t = useTranslations('common');
  const $playerRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => setMounted(true), []);

  if (!stickyVideo || !mounted || closed || !allowed) {
    return null;
  }

  return (
    <>
      <div className="sticky bottom-2 right-2 flex justify-end md:fixed">
        <button
          className="absolute right-2 top-1"
          aria-label={t('common.close')}
          onClick={() => setClosed(true)}>
          <Icon icon="close" />
        </button>
        <iframe
          className="aspect-video max-h-56 overflow-hidden rounded-lg md:max-h-96"
          ref={$playerRef}
          src="https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&controls=2&loop=1&mute=1"
        />
      </div>
    </>
  );
};

export default StickyVideoExperienceHost;
