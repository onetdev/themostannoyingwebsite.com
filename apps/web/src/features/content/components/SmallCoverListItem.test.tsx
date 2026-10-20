/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import type { ArticleListItem } from '@maw/content-sdk';
import { fireEvent, render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';

import { SmallCoverListItem } from './SmallCoverListItem';

jest.mock('@maw/content-sdk', () => ({
  toCoverImages: () => undefined,
}));

jest.mock('next-intl', () => {
  const translate = Object.assign((key: string) => key, {
    rich: (key: string) => key,
  });

  return {
    useTranslations: () => translate,
    useFormatter: () => ({ dateTime: () => 'Jan 1, 2026' }),
  };
});

jest.mock('@/core/i18n/navigation', () => ({
  Link: ({ href, children }: { href: string; children: ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

const article = {
  id: 'article-1',
  slug: 'hello-world',
  title: 'Hello world',
  summary: 'A very short summary.',
  categories: [],
  author: { id: 'author-1', slug: 'jane-doe', name: 'Jane Doe' },
  published_at: '2026-01-01T00:00:00.000Z',
  reading_time_minutes: 3,
} as unknown as ArticleListItem;

beforeAll(() => {
  // jsdom ships without `PointerEvent`, so `fireEvent` would otherwise drop
  // `pointerType` and the pointer coordinates the tilt handler depends on.
  if (typeof globalThis.PointerEvent === 'undefined') {
    class PointerEventPolyfill extends MouseEvent {
      pointerType: string;

      constructor(type: string, init: PointerEventInit = {}) {
        super(type, init);
        this.pointerType = init.pointerType ?? 'mouse';
      }
    }

    Object.defineProperty(globalThis, 'PointerEvent', {
      configurable: true,
      writable: true,
      value: PointerEventPolyfill,
    });
  }
});

const getWrapper = (container: HTMLElement) =>
  container.querySelector<HTMLElement>(
    '[data-slot="tilt-card"]',
  ) as HTMLElement;

const getPlane = (container: HTMLElement) =>
  container.querySelector<HTMLElement>(
    '[data-slot="tilt-card-plane"]',
  ) as HTMLElement;

const stubRect = (element: HTMLElement) => {
  element.getBoundingClientRect = () =>
    ({
      x: 0,
      y: 0,
      left: 0,
      top: 0,
      right: 200,
      bottom: 100,
      width: 200,
      height: 100,
      toJSON: () => ({}),
    }) as DOMRect;
};

describe('SmallCoverListItem', () => {
  it('renders the article title and summary', () => {
    render(<SmallCoverListItem article={article} />);

    expect(screen.getByText('Hello world')).toBeInTheDocument();
    expect(screen.getByText('A very short summary.')).toBeInTheDocument();
  });

  it('keeps the hover area on a static wrapper, not the transformed plane', () => {
    const { container } = render(<SmallCoverListItem article={article} />);

    const wrapper = getWrapper(container);
    const plane = getPlane(container);

    expect(plane.parentElement).toBe(wrapper);
    expect(wrapper.className).not.toContain('tilt-card');
    expect(plane.className).toContain('tilt-card');
  });

  it('tilts the plane toward the pointer while hovering with a mouse', () => {
    const { container } = render(<SmallCoverListItem article={article} />);
    const wrapper = getWrapper(container);
    const plane = getPlane(container);
    stubRect(wrapper);

    fireEvent.pointerMove(wrapper, {
      clientX: 200,
      clientY: 0,
      pointerType: 'mouse',
    });

    expect(plane).toHaveAttribute('data-tilt-active');
    expect(plane.style.getPropertyValue('--tilt-ry')).toBe('10.00deg');
    expect(plane.style.getPropertyValue('--tilt-rx')).toBe('10.00deg');
  });

  it('sweeps the holographic foil left-to-right with the pointer', () => {
    const { container } = render(<SmallCoverListItem article={article} />);
    const wrapper = getWrapper(container);
    const plane = getPlane(container);
    stubRect(wrapper);

    expect(
      container.querySelector('[data-slot="tilt-card-holo"]'),
    ).toBeInTheDocument();

    fireEvent.pointerMove(wrapper, {
      clientX: 0,
      clientY: 50,
      pointerType: 'mouse',
    });
    expect(plane.style.getPropertyValue('--holo-x')).toBe('0.00%');

    fireEvent.pointerMove(wrapper, {
      clientX: 200,
      clientY: 50,
      pointerType: 'mouse',
    });
    expect(plane.style.getPropertyValue('--holo-x')).toBe('100.00%');
  });

  it('ignores pointers that are not a mouse', () => {
    const { container } = render(<SmallCoverListItem article={article} />);
    const wrapper = getWrapper(container);
    const plane = getPlane(container);
    stubRect(wrapper);

    fireEvent.pointerMove(wrapper, {
      clientX: 200,
      clientY: 0,
      pointerType: 'touch',
    });

    expect(plane).not.toHaveAttribute('data-tilt-active');
    expect(plane.style.getPropertyValue('--tilt-ry')).toBe('');
  });

  it('returns the plane to flat when the pointer leaves', () => {
    const { container } = render(<SmallCoverListItem article={article} />);
    const wrapper = getWrapper(container);
    const plane = getPlane(container);
    stubRect(wrapper);

    fireEvent.pointerMove(wrapper, {
      clientX: 200,
      clientY: 0,
      pointerType: 'mouse',
    });
    fireEvent.pointerOut(wrapper, { pointerType: 'mouse' });

    expect(plane).not.toHaveAttribute('data-tilt-active');
    expect(plane.style.getPropertyValue('--tilt-ry')).toBe('0deg');
  });
});
