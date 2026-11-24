/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import type { ShortVideoListItem } from '@maw/content-sdk';
import { TooltipProvider } from '@maw/ui-lib';
import { fireEvent, render, screen } from '@testing-library/react';

import { ShortsPlayer } from './ShortsPlayer';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en',
}));

jest.mock('@/core/i18n/navigation', () => ({
  useRouter: () => ({ back: jest.fn(), push: jest.fn() }),
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

jest.mock('@/stores', () => ({
  useUserPreferencesStore: (
    selector: (state: { enableSound: boolean }) => unknown,
  ) => selector({ enableSound: false }),
  useRuntimeStore: (
    selector: (state: {
      systemReducedMotion: boolean;
      document: { isVisible: boolean; hasEverBeenVisible: boolean };
    }) => unknown,
  ) =>
    selector({
      systemReducedMotion: false,
      document: { isVisible: true, hasEverBeenVisible: true },
    }),
}));

// Embla needs layout measurements that jsdom does not provide; the player test
// only asserts composition, so the carousel containers become plain wrappers.
jest.mock('@maw/ui-lib', () => {
  const actual = jest.requireActual('@maw/ui-lib');
  const Frame = ({ children }: { children?: React.ReactNode }) => (
    <div>{children}</div>
  );

  return {
    ...actual,
    Carousel: Frame,
    CarouselContent: Frame,
    CarouselItem: Frame,
  };
});

const makeShort = (id: string, slug: string, title: string) =>
  ({
    id,
    slug,
    title,
    summary: 'The fork is not cutlery. It is a verdict.',
    lang: 'en',
    author: {
      id: 'author-1',
      slug: 'old-world-connoisseur',
      name: 'Countess Beatrix von Harten',
    },
    duration_ms: 8042,
    width: 720,
    height: 1280,
    has_audio: true,
    is_featured: false,
    ai_assisted: false,
    categories: [],
    cues: [],
    media: [],
    subtitle_url: 'https://media.example.com/en.vtt',
    published_at: '2026-11-21',
    created_at: '2026-11-21',
    updated_at: '2026-11-21',
  }) as unknown as ShortVideoListItem;

const shorts = [
  makeShort('a', 'first', 'First'),
  makeShort('b', 'second', 'Second'),
  makeShort('c', 'third', 'Third'),
];

function renderPlayer() {
  return render(
    <TooltipProvider>
      <ShortsPlayer shorts={shorts} initialIndex={0} />
    </TooltipProvider>,
  );
}

describe('ShortsPlayer', () => {
  afterEach(() => {
    document.body.style.overflow = '';
    delete document.body.dataset.shortsPlayer;
  });

  it('locks the document while the player is mounted', () => {
    const { unmount } = renderPlayer();

    expect(document.body.style.overflow).toBe('hidden');
    expect(document.body.dataset.shortsPlayer).toBe('true');

    unmount();

    expect(document.body.style.overflow).toBe('');
    expect(document.body.dataset.shortsPlayer).toBeUndefined();
  });

  it('renders the controls once, for the active clip only', () => {
    renderPlayer();

    expect(screen.getByTestId('shorts-player')).toBeInTheDocument();
    expect(screen.getAllByTestId('short-player-slide')).toHaveLength(3);
    expect(screen.getAllByTestId('short-player-overlay')).toHaveLength(1);
  });

  it('toggles the like state of the active clip', () => {
    renderPlayer();

    const like = screen.getByRole('button', { name: 'like' });
    expect(like).toHaveAttribute('aria-pressed', 'false');

    fireEvent.click(like);
    expect(screen.getByRole('button', { name: 'unlike' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );

    fireEvent.click(screen.getByRole('button', { name: 'unlike' }));
    expect(screen.getByRole('button', { name: 'like' })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
  });
});
