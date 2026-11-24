'use client';

import type { ShortVideoListItem } from '@maw/content-sdk';
import { Badge, Icon } from '@maw/ui-lib';
import { cn } from 'cn';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { ComponentProps } from 'react';
import { useRef, useState } from 'react';
import { Link, usePathname } from '@/core/i18n/navigation';
import { rememberShortsEntry } from '@/features/content/shorts-entry';
import { useCanHover } from '@/hooks/useCanHover';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useRuntimeStore } from '@/stores';

import { formatShortDuration } from './short-duration';
import { selectShortMedia } from './short-media';

export type ShortCardProps = Omit<ComponentProps<'article'>, 'children'> & {
  short: ShortVideoListItem;
  /** Smaller tile for dense surfaces such as author profiles. */
  compact?: boolean;
};

interface ShortCardChromeProps {
  compact: boolean;
  isVideoReady: boolean;
  durationMs: number;
  aiAssisted: boolean;
  title: string;
  shortLabel: string;
  aiLabel: string;
}

/**
 * Poster overlays: play affordance, type badge, duration, AI disclosure and
 * title. Split out so the compact and full tile share one implementation.
 */
function ShortCardChrome({
  compact,
  isVideoReady,
  durationMs,
  aiAssisted,
  title,
  shortLabel,
  aiLabel,
}: ShortCardChromeProps) {
  return (
    <>
      <div
        className={cn(
          'pointer-events-none absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-300',
          isVideoReady ? 'opacity-0' : 'opacity-100',
        )}
        data-testid="short-card-play-icon"
      >
        <span
          className={cn(
            'flex items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm',
            compact ? 'size-7' : 'size-10',
          )}
        >
          <Icon
            icon="playSolid"
            className={cn('ps-0.5', compact ? 'size-3' : 'size-4')}
            aria-hidden
          />
        </span>
      </div>

      <Badge
        variant="secondary"
        title={compact ? shortLabel : undefined}
        className={cn(
          'absolute z-20 border-transparent bg-black/65 text-white backdrop-blur-sm',
          compact ? 'top-1 left-1 px-1.5 py-0 text-[10px]' : 'top-2 left-2',
        )}
        data-testid="short-type-badge"
      >
        <Icon
          icon="clapperboard"
          className={compact ? 'size-2.5' : 'size-3'}
          aria-hidden
        />
        {!compact && shortLabel}
      </Badge>

      <span
        className={cn(
          'absolute z-20 rounded-full bg-black/65 font-medium text-white tabular-nums backdrop-blur-sm',
          compact
            ? 'top-1 right-1 px-1.5 py-0 text-[10px]'
            : 'top-2 right-2 px-2 py-0.5 text-[11px]',
        )}
      >
        {formatShortDuration(durationMs)}
      </span>

      <div
        className={cn(
          'absolute inset-x-0 bottom-0 z-20',
          compact ? 'p-1.5 pt-5' : 'p-2 pt-8',
        )}
      >
        {aiAssisted && (
          <Badge
            variant="secondary"
            className={cn(
              'border-transparent bg-black/65 text-white backdrop-blur-sm',
              compact ? 'mb-0.5 px-1.5 py-0 text-[10px]' : 'mb-1',
            )}
            data-testid="short-card-ai-badge"
          >
            <Icon
              icon="brain"
              className={compact ? 'size-2.5' : 'size-3'}
              aria-hidden
            />
            {aiLabel}
          </Badge>
        )}
        <h2
          className={cn(
            'line-clamp-2 font-semibold leading-tight text-balance text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.8)]',
            compact ? 'text-xs' : 'text-sm',
          )}
          title={title}
        >
          {title}
        </h2>
      </div>
    </>
  );
}

/**
 * Dense 9:16 archive tile.
 *
 * The poster stays in place and a muted, looping preview mounts only for a
 * mouse hover while the card is on screen. Touch users open the player
 * directly; scrolling a hovered card out of view stops the preview.
 */
export function ShortCard({
  short,
  compact = false,
  className,
  ...rest
}: ShortCardProps) {
  const t = useTranslations('content.shorts');
  const pathname = usePathname();
  const systemReducedMotion = useRuntimeStore(
    (state) => state.systemReducedMotion,
  );
  const { video, poster } = selectShortMedia(short);
  const cardRef = useRef<HTMLElement>(null);
  const canHover = useCanHover();
  const [isPointerOver, setIsPointerOver] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const showVideo =
    isPointerOver && isInView && !systemReducedMotion && Boolean(video);
  const aiDisclosure = short.ai_assisted ? `, ${t('aiAssisted')}` : '';
  const accessibleLabel = `${t('playLabel', { title: short.title })} — ${t('shortLabel')}${aiDisclosure}`;
  const imageSizes = compact
    ? '(min-width: 640px) 12vw, 25vw'
    : '(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw';

  useIntersectionObserver({
    $ref: cardRef,
    onIntersect: (entry) => {
      setIsInView(entry.isIntersecting);

      if (!entry.isIntersecting) {
        setIsVideoReady(false);
      }
    },
  });

  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType === 'mouse' && canHover && !isPointerOver) {
      setIsPointerOver(true);
      setIsVideoReady(false);
    }

    rest.onPointerMove?.(event);
  };

  const onPointerLeave = (event: React.PointerEvent<HTMLElement>) => {
    setIsPointerOver(false);
    setIsVideoReady(false);
    rest.onPointerLeave?.(event);
  };

  return (
    <article
      {...rest}
      ref={cardRef}
      className={cn('group relative', className)}
      data-testid="short-card"
      data-track-impression="shorts:card"
      data-track-key={short.id}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <Link
        href={`/shorts/${short.slug}`}
        prefetch={false}
        className="block overflow-hidden rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        aria-label={accessibleLabel}
        data-track="shorts:open"
        data-track-key={short.id}
        onClick={() => rememberShortsEntry(pathname || '/')}
      >
        <div className="relative aspect-[9/16] w-full overflow-hidden rounded-md bg-black">
          {poster && (
            <Image
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              src={poster.url}
              alt=""
              fill
              sizes={imageSizes}
            />
          )}

          {showVideo && video && (
            <video
              className={cn(
                'absolute inset-0 h-full w-full object-cover transition-opacity duration-300',
                isVideoReady ? 'opacity-100' : 'opacity-0',
              )}
              src={video.url}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              onCanPlay={() => setIsVideoReady(true)}
              onError={() => setIsVideoReady(false)}
            />
          )}

          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

          <ShortCardChrome
            compact={compact}
            isVideoReady={isVideoReady}
            durationMs={short.duration_ms}
            aiAssisted={short.ai_assisted}
            title={short.title}
            shortLabel={t('shortLabel')}
            aiLabel={t('aiBadge')}
          />
        </div>
      </Link>
    </article>
  );
}
