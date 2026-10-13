/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import { slugifyHeading, TableOfContents } from './TableOfContents';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

beforeAll(() => {
  class MockIntersectionObserver {
    readonly root = null;
    readonly rootMargin = '';
    readonly thresholds: number[] = [];
    observe = jest.fn();
    unobserve = jest.fn();
    disconnect = jest.fn();
    takeRecords = jest.fn(() => []);
  }

  Object.defineProperty(global, 'IntersectionObserver', {
    writable: true,
    value: MockIntersectionObserver,
  });
});

describe('slugifyHeading', () => {
  it('slugifies latin headings', () => {
    expect(slugifyHeading('1. Introduction')).toBe('1-introduction');
  });

  it('strips punctuation while preserving accented letters', () => {
    expect(slugifyHeading('Héllo, Wörld!')).toBe('héllo-wörld');
  });

  it('keeps non-latin letters instead of emptying the id', () => {
    expect(slugifyHeading('こんにちは')).toBe('こんにちは');
    expect(slugifyHeading('अंतिम अपडेट')).toBe('अंतिम-अपडेट');
  });

  it('returns an empty string when there is nothing to slugify', () => {
    expect(slugifyHeading('   ')).toBe('');
  });
});

describe('TableOfContents', () => {
  const renderToc = () =>
    render(
      <div>
        <div data-document-content="">
          <h2>1. Introduction</h2>
          <h3>Nested detail</h3>
          <h2>Repeated title</h2>
          <h2>Repeated title</h2>
        </div>
        <TableOfContents />
      </div>,
    );

  it('renders a link for every heading and assigns anchors', async () => {
    renderToc();

    const intro = await screen.findByRole('link', { name: '1. Introduction' });
    const nested = screen.getByRole('link', { name: 'Nested detail' });

    expect(intro).toHaveAttribute('href', '#1-introduction');
    expect(nested).toHaveAttribute('href', '#nested-detail');
    expect(
      screen.getByRole('heading', { name: '1. Introduction' }),
    ).toHaveAttribute('id', '1-introduction');
  });

  it('deduplicates anchors for repeated headings', async () => {
    renderToc();

    const repeated = await screen.findAllByRole('link', {
      name: 'Repeated title',
    });

    expect(repeated.map((link) => link.getAttribute('href'))).toEqual([
      '#repeated-title',
      '#repeated-title-1',
    ]);
  });

  it('renders nothing when the document has no headings', () => {
    render(
      <div>
        <div data-document-content="">
          <p>Just a paragraph.</p>
        </div>
        <TableOfContents />
      </div>,
    );

    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });
});
