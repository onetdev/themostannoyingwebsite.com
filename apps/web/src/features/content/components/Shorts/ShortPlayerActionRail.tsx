'use client';

import type { ShortListItem } from '@maw/content-sdk';
import { Button, Icon } from '@maw/ui-lib';
import { cn } from 'cn';
import { useTranslations } from 'next-intl';
import { ShareButton } from '@/features/share/components';

export interface ShortPlayerActionRailProps {
  short: ShortListItem;
  hasCaptions: boolean;
  showCaptions: boolean;
  liked: boolean;
  isFullscreen: boolean;
  onToggleCaptions: () => void;
  onToggleFullscreen: () => void;
  onToggleLike: () => void;
}

const WHITE_CONTROL_CLASS =
  'text-white hover:bg-white/15 hover:text-white focus-visible:border-white focus-visible:ring-white/40';
const CONTROL_ICON_CLASS = 'text-xl';

/**
 * Vertical action rail, mirroring the TikTok layout: like, share, captions and
 * fullscreen. Play/pause is intentionally not here — it is the only transient
 * control.
 */
export function ShortPlayerActionRail({
  short,
  hasCaptions,
  showCaptions,
  liked,
  isFullscreen,
  onToggleCaptions,
  onToggleFullscreen,
  onToggleLike,
}: ShortPlayerActionRailProps) {
  const t = useTranslations('content.shorts');

  return (
    <div
      className="pointer-events-auto absolute right-3 bottom-44 z-30 flex flex-col items-center gap-3"
      data-player-control
    >
      <Button
        type="button"
        variant="ghost"
        size="icon-lg"
        className={cn(
          WHITE_CONTROL_CLASS,
          liked && 'text-red-500 hover:text-red-400',
        )}
        onClick={onToggleLike}
        aria-pressed={liked}
        aria-label={liked ? t('unlike') : t('like')}
        data-track="shorts:like"
      >
        <Icon icon="heart" className={CONTROL_ICON_CLASS} aria-hidden />
      </Button>
      <ShareButton
        title={short.title}
        size="icon-lg"
        iconClassName={CONTROL_ICON_CLASS}
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
          <Icon icon="captions" className={CONTROL_ICON_CLASS} aria-hidden />
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
        <Icon
          icon={isFullscreen ? 'compress' : 'expand'}
          className={CONTROL_ICON_CLASS}
          aria-hidden
        />
      </Button>
    </div>
  );
}
