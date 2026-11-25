/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import type { ShortVideoListItem } from '@maw/content-sdk';
import { TooltipProvider } from '@maw/ui-lib';
import { fireEvent, render, screen } from '@testing-library/react';

import type { ShortsPlayerProps } from './ShortsPlayer';
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

jest.mock('@/features/comments/components', () => ({
  ShortsCommentsPanel: ({ comments }: { comments: unknown[] }) => (
    <div data-testid="shorts-comments-panel">{comments.length}</div>
  ),
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

function renderPlayer(props: Partial<ShortsPlayerProps> = {}) {
  return render(
    <TooltipProvider>
      <ShortsPlayer shorts={shorts} initialIndex={0} {...props} />
    </TooltipProvider>,
  );
}

const originalMatchMedia = window.matchMedia;

describe('ShortsPlayer', () => {
  beforeEach(() => {
    window.matchMedia = jest.fn(() => ({
      matches: true,
      media: '(min-width: 1024px)',
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      addListener: jest.fn(),
      removeListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })) as unknown as typeof window.matchMedia;
  });

  afterEach(() => {
    document.body.style.overflow = '';
    delete document.body.dataset.shortsPlayer;
  });

  afterAll(() => {
    window.matchMedia = originalMatchMedia;
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

  it('animates the desktop comments panel open beside the feed', () => {
    renderPlayer({ commentsByShortId: { a: [] } });

    const desktopPanel = screen.getByTestId('shorts-comments-desktop');
    expect(desktopPanel).toHaveClass('w-0');

    fireEvent.click(screen.getByRole('button', { name: 'comments.open' }));

    expect(desktopPanel).toHaveClass('w-[380px]');
    expect(screen.getByTestId('shorts-comments-panel')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'comments.close' }),
    ).toHaveAttribute('aria-expanded', 'true');
  });

  it('shows the total comment count under the comments toggle', () => {
    renderPlayer({
      commentsByShortId: {
        a: [
          {
            id: 'root',
            name: 'Tester',
            content: 'Root',
            time: 0,
            likes: 0,
            replies: [
              {
                id: 'reply',
                name: 'Tester',
                content: 'Reply',
                time: 0,
                likes: 0,
              },
            ],
          },
        ],
      },
    });

    expect(screen.getByTestId('short-comments-count')).toHaveTextContent('2');
  });

  it('renders the compact brand logo in the responsive slot', () => {
    renderPlayer();

    expect(screen.getByTestId('shorts-logo')).toHaveAttribute('href', '/');
    expect(screen.getByTestId('shorts-logo-slot')).toHaveClass(
      'justify-center',
      'lg:justify-start',
    );
  });
});
