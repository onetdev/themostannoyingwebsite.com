/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import type { SearchResultItem as SearchResultItemType } from '@maw/content-sdk';
import { fireEvent, render, screen } from '@testing-library/react';

import { getSearchResultPath, SearchResultItem } from './SearchResultItem';

const mockRememberShortsEntry = jest.fn();

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock('@maw/content-sdk', () => ({
  renderMarkdown: (text: string) => text,
}));

jest.mock('@/core/i18n/navigation', () => ({
  usePathname: () => '/search',
  Link: ({
    href,
    children,
    onClick,
  }: {
    href: string;
    children: React.ReactNode;
    onClick?: () => void;
  }) => (
    <a href={href} onClick={onClick}>
      {children}
    </a>
  ),
}));

jest.mock('@/features/content/shorts-entry', () => ({
  rememberShortsEntry: (path: string) => mockRememberShortsEntry(path),
}));

const makeItem = (
  overrides: Partial<SearchResultItemType>,
): SearchResultItemType => ({
  id: 'result-1',
  type: 'article',
  slug: 'example',
  lang: 'en',
  title: 'Example result',
  excerpt: 'Example excerpt',
  ...overrides,
});

describe('SearchResultItem', () => {
  beforeEach(() => {
    window.history.replaceState(null, '', '/search');
    mockRememberShortsEntry.mockClear();
  });

  it('links articles to the article route', () => {
    render(<SearchResultItem item={makeItem({ type: 'article' })} />);

    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      '/articles/example',
    );
    expect(screen.getByTestId('search-result-item')).toHaveAttribute(
      'data-type',
      'article',
    );
    expect(screen.getByTestId('search-result-type')).toHaveTextContent(
      'types.article',
    );
  });

  it('links shorts to the player and records the search entry point', () => {
    window.history.replaceState(null, '', '/search?q=cats&type=short');
    render(<SearchResultItem item={makeItem({ type: 'short' })} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/shorts/example');

    fireEvent.click(link);

    expect(mockRememberShortsEntry).toHaveBeenCalledWith(
      '/search?q=cats&type=short',
    );
  });

  it('links pages to their static route', () => {
    render(
      <SearchResultItem
        item={makeItem({ type: 'page', slug: 'privacy-policy' })}
      />,
    );

    expect(screen.getByRole('link')).toHaveAttribute('href', '/privacy-policy');
  });

  it('builds encoded paths per result type', () => {
    expect(getSearchResultPath({ type: 'article', slug: 'hello world' })).toBe(
      '/articles/hello%20world',
    );
    expect(getSearchResultPath({ type: 'short', slug: 'a clip' })).toBe(
      '/shorts/a%20clip',
    );
    expect(getSearchResultPath({ type: 'page', slug: 'privacy policy' })).toBe(
      '/privacy%20policy',
    );
  });
});
