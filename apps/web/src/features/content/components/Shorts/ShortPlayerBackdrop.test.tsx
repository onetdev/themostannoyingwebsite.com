/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import type { ShortListItem } from '@maw/content-sdk';
import { act, render, screen } from '@testing-library/react';

import { ShortPlayerBackdrop } from './ShortPlayerBackdrop';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, className }: { src: string; className?: string }) => (
    // biome-ignore lint/performance/noImgElement: test double for next/image
    <img src={src} className={className} alt="" />
  ),
}));

const makeShort = (id: string, url: string) =>
  ({
    id,
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
        url,
      },
    ],
  }) as unknown as ShortListItem;

const first = makeShort('a', 'https://media.example.com/a.webp');
const second = makeShort('b', 'https://media.example.com/b.webp');

describe('ShortPlayerBackdrop', () => {
  it('keeps the previous layer while the new layer fades in', () => {
    const { container, rerender } = render(
      <ShortPlayerBackdrop short={first} />,
    );

    expect(container.querySelectorAll('img')).toHaveLength(1);

    act(() => rerender(<ShortPlayerBackdrop short={second} />));

    expect(container.querySelectorAll('img')).toHaveLength(2);
    expect(screen.getByTestId('short-backdrop-current')).toHaveClass(
      'animate-in',
    );
    expect(container.querySelectorAll('img')[1]).toHaveAttribute(
      'src',
      'https://media.example.com/b.webp',
    );
  });
});
