/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { GlobalStickyVideo } from './GlobalStickyVideo';

let mockReducedMotion = false;
let mockChat = false;

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
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
}));

jest.mock('@/stores', () => ({
  useRuntimeStore: (
    selector: (state: { systemReducedMotion: boolean }) => unknown,
  ) => selector({ systemReducedMotion: mockReducedMotion }),
  usePainPreferencesStore: (
    selector: (state: { flags: { mockChat: boolean } }) => unknown,
  ) => selector({ flags: { mockChat } }),
}));

describe('GlobalStickyVideo', () => {
  beforeEach(() => {
    mockReducedMotion = false;
    mockChat = false;
  });

  it('renders the local Egg Tower teaser and links to the game page', async () => {
    const { container } = render(<GlobalStickyVideo />);

    const widget = await screen.findByTestId('sticky-short');
    const link = screen.getByRole('link');
    const video = container.querySelector('video');

    expect(widget).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/games/egg-tower');
    expect(link).toHaveAttribute(
      'aria-label',
      'disruptions.stickyVideoPlayer.openLabel',
    );
    expect(video).toHaveAttribute('src', '/assets/egg-tower/teaser-4x3.mp4');
    expect(video).toHaveAttribute(
      'poster',
      '/assets/egg-tower/teaser-4x3.webp',
    );
    expect(video?.muted).toBe(true);
    expect(video?.autoplay).toBe(true);
    expect(video).toHaveAttribute('loop');
  });

  it('offsets beside the chat bubble when it is enabled', async () => {
    mockChat = true;
    render(<GlobalStickyVideo />);

    const widget = await screen.findByTestId('sticky-short');

    expect(widget).toHaveClass('ms-20', 'md:ms-0', 'md:start-20');
  });

  it('keeps the teaser on the poster when reduced motion is requested', async () => {
    mockReducedMotion = true;
    const { container } = render(<GlobalStickyVideo />);

    await screen.findByTestId('sticky-short');

    expect(container.querySelector('video')?.autoplay).toBe(false);
  });

  it('hides when the clip fails to load', async () => {
    const { container } = render(<GlobalStickyVideo />);
    await screen.findByTestId('sticky-short');

    fireEvent.error(container.querySelector('video') as HTMLVideoElement);

    await waitFor(() => {
      expect(screen.queryByTestId('sticky-short')).not.toBeInTheDocument();
    });
  });

  it('hides after the close button is pressed', async () => {
    render(<GlobalStickyVideo />);
    await screen.findByTestId('sticky-short');

    fireEvent.click(
      screen.getByRole('button', { name: 'common.action.close' }),
    );

    expect(screen.queryByTestId('sticky-short')).not.toBeInTheDocument();
  });
});
