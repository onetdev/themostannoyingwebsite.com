/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import type { ShortListItem } from '@maw/content-sdk';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { SHORTS_ENTRY_STORAGE_KEY } from '@/features/content/shorts-entry';
import { ShortCard } from './ShortCard';

let mockReducedMotion = false;
let observerCallback: IntersectionObserverCallback | undefined;

class MockIntersectionObserver implements IntersectionObserver {
  public readonly root = null;
  public readonly rootMargin = '';
  public readonly scrollMargin = '';
  public readonly thresholds = [];

  constructor(callback: IntersectionObserverCallback) {
    observerCallback = callback;
  }

  public disconnect() {}
  public observe() {}
  public takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
  public unobserve() {}
}

class MockPointerEvent extends MouseEvent {
  public readonly pointerType: string;

  constructor(type: string, init: PointerEventInit = {}) {
    super(type, init);
    this.pointerType = init.pointerType ?? '';
  }
}

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string, values?: { title?: string }) =>
    values?.title ? `${key}:${values.title}` : key,
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, className }: { src: string; className?: string }) => (
    // biome-ignore lint/performance/noImgElement: test double for next/image
    <img src={src} className={className} alt="" />
  ),
}));

jest.mock('@/core/i18n/navigation', () => ({
  Link: ({
    href,
    children,
    prefetch: _prefetch,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
    prefetch?: boolean;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
  usePathname: () => '/shorts/',
}));

jest.mock('@/stores', () => ({
  useRuntimeStore: (
    selector: (state: { systemReducedMotion: boolean }) => unknown,
  ) => selector({ systemReducedMotion: mockReducedMotion }),
}));

const short = {
  id: 'short-1',
  slug: 'gummy-bear-fork',
  title: 'The Gummy Bears Were Warned',
  duration_ms: 8042,
  ai_assisted: true,
  categories: [],
  media: [
    {
      kind: 'thumbnail',
      variant: 'lg',
      format: 'webp',
      width: 720,
      height: 1280,
      duration_ms: null,
      file_size_bytes: 1,
      default: true,
      url: 'https://media.example.com/poster.webp',
    },
    {
      kind: 'video',
      variant: '720p',
      format: 'mp4',
      width: 720,
      height: 1280,
      duration_ms: 8042,
      file_size_bytes: 1,
      default: true,
      url: 'https://media.example.com/video.mp4',
    },
  ],
} as unknown as ShortListItem;

function hoverCard(card: HTMLElement) {
  fireEvent.pointerMove(card, {
    pointerType: 'mouse',
    relatedTarget: document.body,
  });
}

function leaveCard(card: HTMLElement) {
  fireEvent.pointerOut(card, {
    pointerType: 'mouse',
    relatedTarget: document.body,
  });
}

describe('ShortCard', () => {
  beforeEach(() => {
    mockReducedMotion = false;
    observerCallback = undefined;
    window.sessionStorage.clear();
    global.IntersectionObserver =
      MockIntersectionObserver as unknown as typeof IntersectionObserver;
    global.PointerEvent = MockPointerEvent as unknown as typeof PointerEvent;
    Object.defineProperty(HTMLMediaElement.prototype, 'play', {
      configurable: true,
      value: jest.fn().mockResolvedValue(undefined),
    });
  });

  afterEach(() => {
    delete (global as { IntersectionObserver?: typeof IntersectionObserver })
      .IntersectionObserver;
    delete (global as { PointerEvent?: typeof PointerEvent }).PointerEvent;
  });

  it('links to the player and shows type, duration and AI metadata', () => {
    render(<ShortCard short={short} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/shorts/gummy-bear-fork');
    expect(link).toHaveAttribute(
      'aria-label',
      'playLabel:The Gummy Bears Were Warned — shortLabel, aiAssisted',
    );
    expect(screen.getByTestId('short-type-badge')).toHaveTextContent(
      'shortLabel',
    );
    expect(screen.getByText('0:09')).toBeVisible();
    expect(screen.getByTestId('short-card-ai-badge')).toHaveTextContent(
      'aiBadge',
    );
  });

  it('records the current page as the player entry point', () => {
    render(<ShortCard short={short} />);

    fireEvent.click(screen.getByRole('link'));

    expect(window.sessionStorage.getItem(SHORTS_ENTRY_STORAGE_KEY)).toBe(
      '/shorts/',
    );
  });

  it('mounts a muted looping preview for mouse hover and removes it on leave', () => {
    const { container } = render(<ShortCard short={short} />);
    const card = screen.getByTestId('short-card');

    expect(container.querySelector('video')).not.toBeInTheDocument();

    hoverCard(card);
    const video = container.querySelector('video');
    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute('src', 'https://media.example.com/video.mp4');
    expect(video).toHaveAttribute('loop');
    expect(video?.muted).toBe(true);

    leaveCard(card);
    expect(container.querySelector('video')).not.toBeInTheDocument();
  });

  it('does not start a preview from a touch pointer', () => {
    const { container } = render(<ShortCard short={short} />);

    fireEvent.pointerMove(screen.getByTestId('short-card'), {
      pointerType: 'touch',
      relatedTarget: document.body,
    });

    expect(container.querySelector('video')).not.toBeInTheDocument();
  });

  it('removes the preview when the card leaves the viewport', () => {
    const { container } = render(<ShortCard short={short} />);
    const card = screen.getByTestId('short-card');

    hoverCard(card);
    expect(container.querySelector('video')).toBeInTheDocument();

    act(() => {
      observerCallback?.(
        [{ isIntersecting: false } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });

    expect(container.querySelector('video')).not.toBeInTheDocument();
  });

  it('hides the play affordance once the preview can play', () => {
    const { container } = render(<ShortCard short={short} />);

    hoverCard(screen.getByTestId('short-card'));
    const video = container.querySelector('video');
    expect(video).toBeInTheDocument();

    fireEvent.canPlay(video as HTMLVideoElement);

    expect(screen.getByTestId('short-card-play-icon')).toHaveClass('opacity-0');

    hoverCard(screen.getByTestId('short-card'));

    expect(screen.getByTestId('short-card-play-icon')).toHaveClass('opacity-0');
  });

  it('does not mount a preview when reduced motion is requested', () => {
    mockReducedMotion = true;
    const { container } = render(<ShortCard short={short} />);

    hoverCard(screen.getByTestId('short-card'));

    expect(container.querySelector('video')).not.toBeInTheDocument();
  });
});
