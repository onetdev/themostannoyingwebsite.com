'use client';

import type { ShortVideoListItem } from '@maw/content-sdk';
import { Button, Icon } from '@maw/ui-lib';
import { cn } from 'cn';
import { useTranslations } from 'next-intl';

import { ShortPlayerActionRail } from './ShortPlayerActionRail';
import { ShortPlayerCaptions } from './ShortPlayerCaptions';
import { ShortPlayerIconButton } from './ShortPlayerIconButton';
import { ShortPlayerInfo } from './ShortPlayerInfo';
import {
  buildShortFrameStyle,
  SHORT_PLAYER_FRAME_CLASS,
} from './short-player-frame';

export interface ShortPlayerOverlayProps {
  short: ShortVideoListItem;
  video: HTMLVideoElement | null;
  muted: boolean;
  showCaptions: boolean;
  liked: boolean;
  commentsOpen: boolean;
  commentCount: number;
  isPlaying: boolean;
  isFullscreen: boolean;
  autoplayBlocked: boolean;
  showPlayPause: boolean;
  onTogglePlay: () => void;
  onToggleMute: () => void;
  onToggleComments: () => void;
  onToggleCaptions: () => void;
  onToggleFullscreen: () => void;
  onToggleLike: () => void;
  onClose: () => void;
}

/**
 * Controls for the active clip.
 *
 * Rendered inside the active slide so the chrome moves with the clip during a
 * swipe. Everything except play/pause stays visible; play/pause only flashes
 * after a tap and remains visible while paused.
 */
export function ShortPlayerOverlay({
  short,
  video,
  muted,
  showCaptions,
  liked,
  commentsOpen,
  commentCount,
  isPlaying,
  isFullscreen,
  autoplayBlocked,
  showPlayPause,
  onTogglePlay,
  onToggleMute,
  onToggleComments,
  onToggleCaptions,
  onToggleFullscreen,
  onToggleLike,
  onClose,
}: ShortPlayerOverlayProps) {
  const t = useTranslations('content.shorts');
  const hasAudio = short.has_audio;
  const hasCaptions = short.cues.length > 0;
  const showPlayPauseButton = showPlayPause || !isPlaying;
  const showUnmutePrompt = autoplayBlocked && muted && hasAudio;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
      data-testid="short-player-overlay"
    >
      <div
        className={cn(SHORT_PLAYER_FRAME_CLASS, 'pointer-events-none')}
        style={buildShortFrameStyle(short)}
        data-testid="short-player-overlay-frame"
      >
        <div
          className="pointer-events-auto absolute inset-x-0 top-0 z-30 flex items-start justify-between p-3 pt-[max(0.75rem,env(safe-area-inset-top))]"
          data-player-control
        >
          <ShortPlayerIconButton
            icon="close"
            onClick={onClose}
            aria-label={t('closePlayer')}
            data-track="shorts:close"
          />
          {hasAudio && (
            <ShortPlayerIconButton
              icon={muted ? 'volumeMute' : 'volumeHigh'}
              onClick={onToggleMute}
              aria-pressed={!muted}
              aria-label={muted ? t('unmute') : t('mute')}
              data-track="shorts:mute"
            />
          )}
        </div>

        {showUnmutePrompt && (
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="pointer-events-auto absolute inset-x-0 top-20 z-30 mx-auto w-fit shadow-lg"
            onClick={onToggleMute}
            data-player-control
            data-track="shorts:unmute-prompt"
          >
            <Icon icon="volumeMute" className="size-4" aria-hidden />
            {t('tapToUnmute')}
          </Button>
        )}

        <ShortPlayerActionRail
          short={short}
          hasCaptions={hasCaptions}
          showCaptions={showCaptions}
          liked={liked}
          isFullscreen={isFullscreen}
          commentsOpen={commentsOpen}
          commentCount={commentCount}
          onToggleComments={onToggleComments}
          onToggleCaptions={onToggleCaptions}
          onToggleFullscreen={onToggleFullscreen}
          onToggleLike={onToggleLike}
        />

        <ShortPlayerCaptions
          cues={short.cues}
          video={video}
          visible={showCaptions}
        />

        <Button
          type="button"
          variant="ghost"
          size="icon-lg"
          className={cn(
            'pointer-events-auto absolute top-1/2 left-1/2 z-30 size-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/50 text-white transition-opacity duration-200 hover:bg-black/70 hover:text-white focus-visible:ring-white/60',
            showPlayPauseButton
              ? 'opacity-100'
              : 'pointer-events-none opacity-0',
          )}
          onClick={onTogglePlay}
          aria-label={isPlaying ? t('pause') : t('play')}
          aria-hidden={!showPlayPauseButton}
          tabIndex={showPlayPauseButton ? 0 : -1}
          data-track={isPlaying ? 'shorts:pause' : 'shorts:play'}
          data-player-control
        >
          <Icon
            icon={isPlaying ? 'pause' : 'playSolid'}
            className="text-3xl"
            aria-hidden
          />
        </Button>

        <ShortPlayerInfo short={short} video={video} />
      </div>
    </div>
  );
}
