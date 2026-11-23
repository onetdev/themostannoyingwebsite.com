'use client';

import { Badge, Button, Icon } from '@maw/ui-lib';
import { cn } from 'cn';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Link } from '@/core/i18n/navigation';
import { EGG_TOWER_PROMO } from '@/features/marketing/egg-tower';
import { usePainPreferencesStore, useRuntimeStore } from '@/stores';

/**
 * Sticky teaser for the Egg Tower game.
 *
 * Loads a checked-in 4:3 clip, so it has no dependency on the Content API and
 * never embeds a third-party player. It is hidden when the `stickyVideo` pain
 * flag is off, when closed, or when the clip cannot play.
 */
export function GlobalStickyVideo() {
  const systemReducedMotion = useRuntimeStore(
    (state) => state.systemReducedMotion,
  );
  const chatBubble = usePainPreferencesStore((state) => state.flags.mockChat);
  const [mounted, setMounted] = useState(false);
  const [closed, setClosed] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const t = useTranslations();

  useEffect(() => setMounted(true), []);

  if (!mounted || closed || videoFailed) {
    return null;
  }

  return (
    <div
      className={cn(
        'sticky start-2 bottom-2 mx-3 my-1 flex justify-start md:fixed md:m-0',
        chatBubble && 'ms-20 md:ms-0 md:start-20',
      )}
      data-testid="sticky-short"
      data-track-section="disruptions:sticky-video"
    >
      <div className="relative w-48 overflow-hidden rounded-lg border bg-black shadow-lg md:w-56">
        <Link
          href={EGG_TOWER_PROMO.href}
          prefetch={false}
          className="relative block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label={t('disruptions.stickyVideoPlayer.openLabel')}
          data-track="disruptions:sticky-video:open"
          data-track-impression="disruptions:sticky-video:impression"
        >
          <video
            className="aspect-[4/3] w-full object-cover"
            src={EGG_TOWER_PROMO.videoSrc}
            poster={EGG_TOWER_PROMO.posterSrc}
            autoPlay={!systemReducedMotion}
            muted
            loop
            playsInline
            preload="metadata"
            onError={() => setVideoFailed(true)}
          />
          <Badge
            variant="secondary"
            className="pointer-events-none absolute bottom-2 start-2 border-transparent bg-black/65 text-white backdrop-blur-sm"
          >
            {t('disruptions.stickyVideoPlayer.promoLabel')}
          </Badge>
        </Link>
        <Button
          type="button"
          variant="destructive"
          size="icon-xs"
          className="absolute end-1 top-1 z-10"
          aria-label={t('common.action.close')}
          data-track="disruptions:sticky-video:close"
          onClick={() => setClosed(true)}
        >
          <Icon icon="close" />
        </Button>
      </div>
    </div>
  );
}
