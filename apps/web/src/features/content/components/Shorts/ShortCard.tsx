'use client';

import type { ShortListItem } from '@maw/content-sdk';
import { Badge, Icon } from '@maw/ui-lib';
import { cn } from 'cn';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { ComponentProps, ElementType } from 'react';
import { useState } from 'react';
import { Link } from '@/core/i18n/navigation';
import { useRuntimeStore } from '@/stores';

import { formatShortDuration } from './short-duration';
import { selectShortMedia } from './short-media';

export type ShortCardProps = Omit<ComponentProps<'article'>, 'children'> & {
  short: ShortListItem;
  /** Heading level for the overlaid title. Defaults to `2`. */
  headingLevel?: 2 | 3 | 4;
};

/**
 * Dense 9:16 archive tile.
 *
 * The poster stays in place and a muted, looping preview mounts only while the
 * pointer is over the card. Clicking still opens the dedicated player.
 */
export function ShortCard({
  short,
  headingLevel = 2,
  className,
  ...rest
}: ShortCardProps) {
  const t = useTranslations('content.shorts');
  const systemReducedMotion = useRuntimeStore(
    (state) => state.systemReducedMotion,
  );
  const { video, poster } = selectShortMedia(short);
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const showVideo = isHovered && !systemReducedMotion && Boolean(video);
  const TitleTag: ElementType = `h${headingLevel}`;
  return (
    <article
      {...rest}
      className={cn('group relative', className)}
      data-testid="short-card"
      data-track-impression="shorts:card"
      data-track-key={short.id}
      onMouseEnter={() => {
        setIsHovered(true);
        setIsVideoReady(false);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsVideoReady(false);
      }}
    >
      <Link
        href={`/shorts/${short.slug}`}
        prefetch={false}
        className="block overflow-hidden rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        aria-label={t('playLabel', { title: short.title })}
        data-track="shorts:open"
        data-track-key={short.id}
      >
        <div className="relative aspect-[9/16] w-full overflow-hidden rounded-md bg-black">
          {poster && (
            <Image
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              src={poster.url}
              alt=""
              fill
              sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            />
          )}

          {showVideo && video && (
            <video
              key={video.url}
              className={cn(
                'absolute inset-0 h-full w-full object-cover transition-opacity duration-300',
                isVideoReady ? 'opacity-100' : 'opacity-0',
              )}
              src={video.url}
              poster={poster?.url}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              onCanPlay={() => setIsVideoReady(true)}
            />
          )}

          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

          <div
            className={cn(
              'pointer-events-none absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-300',
              showVideo ? 'opacity-0' : 'opacity-100',
            )}
          >
            <span className="flex size-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm">
              <Icon icon="playSolid" className="size-4 ps-0.5" aria-hidden />
            </span>
          </div>

          <Badge
            variant="secondary"
            className="absolute top-2 left-2 z-20 border-transparent bg-black/65 text-white backdrop-blur-sm"
            data-testid="short-type-badge"
          >
            <Icon icon="clapperboard" className="size-3" aria-hidden />
            {t('shortLabel')}
          </Badge>

          <span className="absolute top-2 right-2 z-20 rounded-full bg-black/65 px-2 py-0.5 text-[11px] font-medium text-white tabular-nums backdrop-blur-sm">
            {formatShortDuration(short.duration_ms)}
          </span>

          <div className="absolute inset-x-0 bottom-0 z-20 p-2 pt-8">
            {short.ai_assisted && (
              <Badge
                variant="secondary"
                className="mb-1 border-transparent bg-black/65 text-white backdrop-blur-sm"
                data-testid="short-card-ai-badge"
              >
                <Icon icon="brain" className="size-3" aria-hidden />
                {t('aiBadge')}
              </Badge>
            )}
            <TitleTag
              className="line-clamp-2 text-sm font-semibold leading-tight text-balance text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.8)]"
              title={short.title}
            >
              {short.title}
            </TitleTag>
          </div>
        </div>
      </Link>
    </article>
  );
}
