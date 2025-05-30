'use client';

import { Icon } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { FunctionComponent, useEffect, useRef, useState } from 'react';

import { useUserGrantsStore } from '@/state/user_grants';

const StickyVideoExperienceHost: FunctionComponent = () => {
  const allowed = useUserGrantsStore((state) => state.reviewCompleted);
  const [mounted, setMounted] = useState(false);
  const [closed, setClosed] = useState(false);
  const t = useTranslations();
  const $playerRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => setMounted(true), []);

  if (!mounted || closed || !allowed) {
    return null;
  }

  return (
    <>
      <div className="sticky right-2 bottom-2 flex justify-end md:fixed">
        <button
          className="absolute top-1 right-2"
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
