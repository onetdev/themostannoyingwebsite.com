'use client';

import type { ShortVideoListItem } from '@maw/content-sdk';
import { cn } from 'cn';
import { useTranslations } from 'next-intl';
import { useShareAction } from '@/features/share/hooks';

import { ShortPlayerActionButton } from './ShortPlayerActionButton';

export interface ShortPlayerActionRailProps {
  short: ShortVideoListItem;
  hasCaptions: boolean;
  showCaptions: boolean;
  liked: boolean;
  isFullscreen: boolean;
  commentsOpen: boolean;
  onToggleComments: () => void;
  onToggleCaptions: () => void;
  onToggleFullscreen: () => void;
  onToggleLike: () => void;
}

/**
 * Vertical action rail, mirroring the TikTok layout: like, comments, share,
 * captions and fullscreen. Play/pause is intentionally not here — it is the
 * only transient control.
 */
export function ShortPlayerActionRail({
  short,
  hasCaptions,
  showCaptions,
  liked,
  isFullscreen,
  commentsOpen,
  onToggleComments,
  onToggleCaptions,
  onToggleFullscreen,
  onToggleLike,
}: ShortPlayerActionRailProps) {
  const t = useTranslations('content.shorts');
  const tCommon = useTranslations();
  const share = useShareAction();

  return (
    <div
      className="pointer-events-auto absolute right-3 bottom-20 z-30 flex flex-col items-center gap-2"
      data-player-control
    >
      <ShortPlayerActionButton
        icon="heart"
        label={liked ? t('unlike') : t('like')}
        tooltip={liked ? t('unlike') : t('like')}
        iconClassName={cn(liked && 'text-red-500')}
        onClick={onToggleLike}
        aria-pressed={liked}
        data-track="shorts:like"
      />
      <ShortPlayerActionButton
        icon="commentDots"
        label={
          commentsOpen ? tCommon('comments.close') : tCommon('comments.open')
        }
        tooltip={
          commentsOpen ? tCommon('comments.close') : tCommon('comments.open')
        }
        onClick={onToggleComments}
        aria-expanded={commentsOpen}
        data-track="shorts:comments"
      />
      <ShortPlayerActionButton
        icon="share"
        label={tCommon('common.action.share')}
        tooltip={tCommon('common.action.share')}
        onClick={() =>
          void share({
            title: short.title,
            surface: 'content:shorts:player',
          })
        }
        data-track="common:share"
        data-track-section="content:shorts:player"
      />
      {hasCaptions && (
        <ShortPlayerActionButton
          icon="captions"
          label={showCaptions ? t('captionsOff') : t('captionsOn')}
          tooltip={showCaptions ? t('captionsOff') : t('captionsOn')}
          onClick={onToggleCaptions}
          aria-pressed={showCaptions}
          data-track="shorts:captions"
        />
      )}
      <ShortPlayerActionButton
        icon={isFullscreen ? 'compress' : 'expand'}
        label={isFullscreen ? t('exitFullscreen') : t('enterFullscreen')}
        tooltip={isFullscreen ? t('exitFullscreen') : t('enterFullscreen')}
        onClick={onToggleFullscreen}
        aria-pressed={isFullscreen}
        data-track="shorts:fullscreen"
      />
    </div>
  );
}
