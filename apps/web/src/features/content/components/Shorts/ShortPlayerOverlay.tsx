'use client';

import type { ShortListItem } from '@maw/content-sdk';
import { Button, Icon } from '@maw/ui-lib';
import { cn } from 'cn';
import { useTranslations } from 'next-intl';

import { ShortPlayerActionRail } from './ShortPlayerActionRail';
import { ShortPlayerInfo } from './ShortPlayerInfo';
import { SHORT_PLAYER_FRAME_CLASS } from './short-player-frame';

export interface ShortPlayerOverlayProps {
  short: ShortListItem;
  video: HTMLVideoElement | null;
  muted: boolean;
  showCaptions: boolean;
  isPlaying: boolean;
  isFullscreen: boolean;
  autoplayBlocked: boolean;
  showPlayPause: boolean;
  hasAudio: boolean;
  hasCaptions: boolean;
  onTogglePlay: () => void;
  onToggleMute: () => void;
  onToggleCaptions: () => void;
  onToggleFullscreen: () => void;
  onClose: () => void;
}

const WHITE_CONTROL_CLASS =
  'text-white hover:bg-white/15 hover:text-white focus-visible:border-white focus-visible:ring-white/40';

/**
 * Fixed overlay for the active clip. Everything except the play/pause control
 * stays visible; play/pause flashes only after a tap.
 */
export function ShortPlayerOverlay({
  short,
  video,
  muted,
  showCaptions,
  isPlaying,
  isFullscreen,
  autoplayBlocked,
  showPlayPause,
  hasAudio,
  hasCaptions,
  onTogglePlay,
  onToggleMute,
  onToggleCaptions,
  onToggleFullscreen,
  onClose,
}: ShortPlayerOverlayProps) {
  const t = useTranslations('content.shorts');
  const frameStyle = {
    aspectRatio: `${short.width} / ${short.height}`,
  };
  const showPlayPauseButton = showPlayPause || !isPlaying;
  const showUnmutePrompt = autoplayBlocked && muted && hasAudio;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
      data-testid="short-player-overlay"
    >
      <div
        className={cn(SHORT_PLAYER_FRAME_CLASS, 'pointer-events-none')}
        style={frameStyle}
      >
        <div
          className="pointer-events-auto absolute inset-x-0 top-0 z-30 flex items-start justify-between p-3 pt-[max(0.75rem,env(safe-area-inset-top))]"
          data-player-control
        >
          <Button
            type="button"
            variant="ghost"
            size="icon-lg"
            className={WHITE_CONTROL_CLASS}
            onClick={onClose}
            aria-label={t('closePlayer')}
            data-track="shorts:close"
          >
            <Icon icon="chevronDown" aria-hidden />
          </Button>
          {hasAudio && (
            <Button
              type="button"
              variant="ghost"
              size="icon-lg"
              className={WHITE_CONTROL_CLASS}
              onClick={onToggleMute}
              aria-pressed={!muted}
              aria-label={muted ? t('unmute') : t('mute')}
              data-track="shorts:mute"
            >
              <Icon icon={muted ? 'volumeMute' : 'volumeHigh'} aria-hidden />
            </Button>
          )}
        </div>

        {showUnmutePrompt && (
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="pointer-events-auto absolute inset-x-0 top-20 z-30 mx-auto w-fit shadow-lg"
            onClick={onToggleMute}
            data-track="shorts:unmute-prompt"
          >
            <Icon icon="volumeMute" aria-hidden />
            {t('tapToUnmute')}
          </Button>
        )}

        <ShortPlayerActionRail
          short={short}
          hasCaptions={hasCaptions}
          showCaptions={showCaptions}
          isFullscreen={isFullscreen}
          onToggleCaptions={onToggleCaptions}
          onToggleFullscreen={onToggleFullscreen}
        />

        <button
          type="button"
          className={cn(
            'pointer-events-auto absolute top-1/2 left-1/2 z-30 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-opacity duration-200 hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60',
            showPlayPauseButton
              ? 'opacity-100'
              : 'pointer-events-none opacity-0',
          )}
          onClick={onTogglePlay}
          aria-label={isPlaying ? t('pause') : t('play')}
          data-track={isPlaying ? 'shorts:pause' : 'shorts:play'}
          data-player-control
        >
          <Icon
            icon={isPlaying ? 'pause' : 'playSolid'}
            className="text-2xl"
            aria-hidden
          />
        </button>

        <ShortPlayerInfo short={short} video={video} />
      </div>
    </div>
  );
}
