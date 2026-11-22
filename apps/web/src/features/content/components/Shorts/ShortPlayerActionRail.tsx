'use client';

import type { ShortListItem } from '@maw/content-sdk';
import { Avatar, AvatarFallback, Button, Icon } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { Link } from '@/core/i18n/navigation';
import { ShareButton } from '@/features/share/components';

export interface ShortPlayerActionRailProps {
  short: ShortListItem;
  hasCaptions: boolean;
  showCaptions: boolean;
  isFullscreen: boolean;
  onToggleCaptions: () => void;
  onToggleFullscreen: () => void;
}
const WHITE_CONTROL_CLASS =
  'text-white hover:bg-white/15 hover:text-white focus-visible:border-white focus-visible:ring-white/40';

/**
 * Vertical action rail, mirroring the TikTok layout: author avatar, share,
 * captions and fullscreen. Play/pause is intentionally not here — it is the
 * only transient control.
 */
export function ShortPlayerActionRail({
  short,
  hasCaptions,
  showCaptions,
  isFullscreen,
  onToggleCaptions,
  onToggleFullscreen,
}: ShortPlayerActionRailProps) {
  const t = useTranslations('content.shorts');
  const initial = short.author.name.charAt(0).toUpperCase();

  return (
    <div
      className="pointer-events-auto absolute right-3 bottom-44 z-30 flex flex-col items-center gap-3"
      data-player-control
    >
      <Link
        href={`/authors/${short.author.slug}`}
        aria-label={t('viewAuthor', { name: short.author.name })}
        data-track="shorts:author-avatar"
        data-track-key={short.author.slug}
      >
        <Avatar size="lg" className="ring-2 ring-white/80">
          <AvatarFallback className="bg-secondary text-secondary-foreground text-sm font-semibold">
            {initial}
          </AvatarFallback>
        </Avatar>
      </Link>
      <ShareButton
        title={short.title}
        section="content:shorts:player"
        className={WHITE_CONTROL_CLASS}
      />
      {hasCaptions && (
        <Button
          type="button"
          variant="ghost"
          size="icon-lg"
          className={WHITE_CONTROL_CLASS}
          onClick={onToggleCaptions}
          aria-pressed={showCaptions}
          aria-label={showCaptions ? t('captionsOff') : t('captionsOn')}
          data-track="shorts:captions"
        >
          <Icon icon="captions" aria-hidden />
        </Button>
      )}
      <Button
        type="button"
        variant="ghost"
        size="icon-lg"
        className={WHITE_CONTROL_CLASS}
        onClick={onToggleFullscreen}
        aria-pressed={isFullscreen}
        aria-label={isFullscreen ? t('exitFullscreen') : t('enterFullscreen')}
        data-track="shorts:fullscreen"
      >
        <Icon icon={isFullscreen ? 'compress' : 'expand'} aria-hidden />
      </Button>
    </div>
  );
}
