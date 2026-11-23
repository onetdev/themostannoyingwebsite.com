'use client';

import type { ShortVideoListItem } from '@maw/content-sdk';
import { Badge, Icon } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { Link } from '@/core/i18n/navigation';
import { ShortPlayerProgress } from './ShortPlayerProgress';
import { formatShortDuration } from './short-duration';

export interface ShortPlayerInfoProps {
  short: ShortVideoListItem;
  video: HTMLVideoElement | null;
}

/**
 * TikTok-style lower third: author, title, summary, categories and the
 * AI-assistance disclosure, with the seek bar pinned to the bottom edge.
 */
export function ShortPlayerInfo({ short, video }: ShortPlayerInfoProps) {
  const t = useTranslations('content.shorts');
  const hasCategories = short.categories.length > 0;

  return (
    <div className="pointer-events-auto absolute inset-x-0 bottom-0 z-20 bg-linear-to-t from-black/90 via-black/60 to-transparent px-4 pt-12 pb-[max(1rem,env(safe-area-inset-bottom))] text-white">
      <div className="pe-16">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
          <Link
            href={`/authors/${short.author.slug}`}
            className="font-semibold hover:underline"
            data-track="shorts:author"
            data-track-key={short.author.slug}
          >
            @{short.author.name}
          </Link>
          <span aria-hidden="true" className="opacity-60">
            ·
          </span>
          <span className="text-white/70 tabular-nums">
            {formatShortDuration(short.duration_ms)}
          </span>
        </div>
        <h1 className="mt-1 text-base leading-tight font-semibold md:text-lg">
          {short.title}
        </h1>
        <p className="mt-1 line-clamp-3 max-w-[60ch] text-sm text-white/90">
          {short.summary}
        </p>
        {(hasCategories || short.ai_assisted) && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {hasCategories &&
              short.categories.map((category) => (
                <Badge
                  key={category.id}
                  variant="secondary"
                  className="border-transparent bg-white/20 text-white"
                >
                  {category.label}
                </Badge>
              ))}
            {short.ai_assisted && (
              <Badge
                variant="secondary"
                className="border-transparent bg-white/20 text-white"
                data-testid="short-ai-badge"
              >
                <Icon icon="brain" aria-hidden />
                {t('aiAssisted')}
              </Badge>
            )}
          </div>
        )}
      </div>
      <div className="mt-3" data-player-control>
        <ShortPlayerProgress video={video} durationMs={short.duration_ms} />
      </div>
    </div>
  );
}
