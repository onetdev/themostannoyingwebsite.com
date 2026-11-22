/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import type { ShortListItem } from '@maw/content-sdk';
import { TooltipProvider } from '@maw/ui-lib';
import { fireEvent, render, screen } from '@testing-library/react';

import { ShortPlayerOverlay } from './ShortPlayerOverlay';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string, values?: { name?: string }) =>
    values?.name ? `${key}:${values.name}` : key,
}));

jest.mock('@/core/i18n/navigation', () => ({
  Link: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

jest.mock('@/features/share/hooks', () => ({
  useShareAction: () => jest.fn(),
}));

jest.mock('./ShortPlayerProgress', () => ({
  ShortPlayerProgress: () => null,
}));

const short = {
  id: 'short-1',
  slug: 'gummy-bear-fork',
  lang: 'en',
  title: 'The Gummy Bears Were Warned',
  summary: 'The fork is not cutlery. It is a verdict.',
  author: {
    id: 'author-1',
    slug: 'old-world-connoisseur',
    name: 'Countess Beatrix von Harten',
    persona: 'The old-world connaisseur',
  },
  duration_ms: 8042,
  width: 720,
  height: 1280,
  has_audio: true,
  ai_assisted: true,
  categories: [{ id: 'humor', label: 'Humor' }],
  subtitle_url: 'https://media.example.com/en.vtt',
  cues: [],
} as unknown as ShortListItem;

function renderOverlay(
  overrides: Partial<Parameters<typeof ShortPlayerOverlay>[0]> = {},
) {
  const handlers = {
    onTogglePlay: jest.fn(),
    onToggleMute: jest.fn(),
    onToggleCaptions: jest.fn(),
    onToggleFullscreen: jest.fn(),
    onToggleLike: jest.fn(),
    onClose: jest.fn(),
  };

  render(
    <TooltipProvider>
      <ShortPlayerOverlay
        short={short}
        video={null}
        muted={false}
        showCaptions={false}
        liked={false}
        isPlaying
        isFullscreen={false}
        autoplayBlocked={false}
        showPlayPause
        hasAudio
        hasCaptions
        {...handlers}
        {...overrides}
      />
    </TooltipProvider>,
  );

  return handlers;
}

describe('ShortPlayerOverlay', () => {
  it('renders the TikTok-style info, author link and AI disclosure', () => {
    renderOverlay();

    expect(screen.getByRole('heading', { name: short.title })).toBeVisible();
    expect(screen.getByText(short.summary)).toBeVisible();
    expect(screen.getByText('@Countess Beatrix von Harten')).toHaveAttribute(
      'href',
      '/authors/old-world-connoisseur',
    );
    expect(screen.getByTestId('short-ai-badge')).toBeVisible();
    expect(screen.getByText('Humor')).toBeVisible();
    expect(screen.getByTestId('short-like-count')).toHaveTextContent('0');
  });

  it('keeps the overlay frame transparent so the active clip stays visible', () => {
    renderOverlay();

    expect(screen.getByTestId('short-player-overlay-frame')).not.toHaveClass(
      'bg-black',
    );
  });

  it('keeps the persistent controls mounted and wires their handlers', () => {
    const handlers = renderOverlay();

    fireEvent.click(screen.getByRole('button', { name: 'mute' }));
    fireEvent.click(screen.getByRole('button', { name: 'captionsOn' }));
    fireEvent.click(screen.getByRole('button', { name: 'enterFullscreen' }));
    fireEvent.click(screen.getByRole('button', { name: 'like' }));
    fireEvent.click(screen.getByRole('button', { name: 'closePlayer' }));

    expect(handlers.onToggleMute).toHaveBeenCalledTimes(1);
    expect(handlers.onToggleCaptions).toHaveBeenCalledTimes(1);
    expect(handlers.onToggleFullscreen).toHaveBeenCalledTimes(1);
    expect(handlers.onToggleLike).toHaveBeenCalledTimes(1);
    expect(handlers.onClose).toHaveBeenCalledTimes(1);
  });

  it('marks the heart as pressed when the clip is liked', () => {
    renderOverlay({ liked: true });

    const like = screen.getByRole('button', { name: 'unlike' });
    expect(like).toHaveAttribute('aria-pressed', 'true');
  });

  it('shows the unmute prompt only after autoplay was blocked', () => {
    renderOverlay({ autoplayBlocked: true, muted: true });

    expect(screen.getByRole('button', { name: /tapToUnmute/ })).toBeVisible();
  });
});
