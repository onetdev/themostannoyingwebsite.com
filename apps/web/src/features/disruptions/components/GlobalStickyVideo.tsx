'use client';

import { Button, Icon } from '@maw/ui-lib';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { useAppConfigContext } from '@/core/config/react-app-config';
import { useUserGrantsStore } from '@/stores';

export function GlobalStickyVideo() {
  const allowed = useUserGrantsStore((state) => state.reviewCompleted);
  const [mounted, setMounted] = useState(false);
  const [closed, setClosed] = useState(false);
  const locale = useLocale();
  const t = useTranslations();
  const $playerRef = useRef<HTMLIFrameElement | null>(null);
  const config = useAppConfigContext();

  useEffect(() => setMounted(true), []);

  if (!mounted || closed || !allowed) {
    return null;
  }

  return (
    <div className="sticky inset-inline-end-2 bottom-2 flex justify-end md:fixed mx-3 my-1">
      <Button
        type="button"
        variant="destructive"
        className="absolute top-1 inset-inline-end-2 cursor-pointer rounded-full m-2 text-xs p-1"
        aria-label={t('common.action.close')}
        onClick={() => setClosed(true)}
      >
        <Icon icon="close" />
      </Button>
      <iframe
        className="aspect-video max-h-56 w-full overflow-hidden rounded-lg md:max-h-96"
        ref={$playerRef}
        src={`${config.disruptions.stickyVideoPlayer.videoUrl}&hl=${locale}`}
        title={t('disruptions.stickyVideoPlayer.videoTitle')}
      />
    </div>
  );
}
