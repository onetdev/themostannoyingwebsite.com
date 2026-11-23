/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import type { ShortListItem } from '@maw/content-sdk';
import { fireEvent, render, screen } from '@testing-library/react';

import { ShortCard } from './ShortCard';

let mockReducedMotion = false;

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

describe('ShortCard', () => {
  beforeEach(() => {
    mockReducedMotion = false;
    Object.defineProperty(HTMLMediaElement.prototype, 'play', {
      configurable: true,
      value: jest.fn().mockResolvedValue(undefined),
    });
  });

  it('links to the player and shows type, duration and AI metadata', () => {
    render(<ShortCard short={short} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/shorts/gummy-bear-fork');
    expect(link).toHaveAttribute(
      'aria-label',
      'playLabel:The Gummy Bears Were Warned',
    );
    expect(screen.getByTestId('short-type-badge')).toHaveTextContent(
      'shortLabel',
    );
    expect(screen.getByText('0:09')).toBeVisible();
    expect(screen.getByTestId('short-card-ai-badge')).toHaveTextContent(
      'aiBadge',
    );
  });

  it('mounts a muted looping preview only while hovered', () => {
    const { container } = render(<ShortCard short={short} />);
    const card = screen.getByTestId('short-card');

    expect(container.querySelector('video')).not.toBeInTheDocument();

    fireEvent.mouseEnter(card);
    const video = container.querySelector('video');
    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute('src', 'https://media.example.com/video.mp4');
    expect(video).toHaveAttribute('loop');
    expect(video?.muted).toBe(true);

    fireEvent.mouseLeave(card);
    expect(container.querySelector('video')).not.toBeInTheDocument();
  });

  it('does not mount a preview when reduced motion is requested', () => {
    mockReducedMotion = true;
    const { container } = render(<ShortCard short={short} />);

    fireEvent.mouseEnter(screen.getByTestId('short-card'));

    expect(container.querySelector('video')).not.toBeInTheDocument();
  });
});
