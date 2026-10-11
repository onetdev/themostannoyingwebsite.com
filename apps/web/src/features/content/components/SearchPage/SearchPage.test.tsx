/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import type { SearchResultItem } from '@maw/content-sdk';
import { render, screen } from '@testing-library/react';

import { SearchPage } from './SearchPage';

interface MockSearchState {
  query: string;
  data: { items: SearchResultItem[]; duration: number } | undefined;
  isLoading: boolean;
  isError: boolean;
  isReady: boolean;
}

let mockSearch: MockSearchState = {
  query: '',
  data: undefined,
  isLoading: false,
  isError: false,
  isReady: false,
};

let mockSearchDelay = false;

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock('@/features/content/hooks', () => ({
  useSearch: () => ({
    ...mockSearch,
    onRecommendedClick: jest.fn(),
  }),
  useRecommendedSearches: () => ({ topSearches: [], refresh: jest.fn() }),
  usePool: () => ['Reticulating splines…'],
}));

jest.mock('@/stores', () => ({
  usePainPreferencesStore: (
    selector: (state: { flags: { searchDelay: boolean } }) => unknown,
  ) => selector({ flags: { searchDelay: mockSearchDelay } }),
}));

jest.mock('@/features/share/components', () => ({
  ShareButton: () => null,
}));

jest.mock('@/core/i18n/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

jest.mock('@/core/events/event-bus', () => ({
  emit: jest.fn(),
}));

jest.mock('./SearchResultItem', () => ({
  SearchResultItem: ({ item }: { item: { slug: string } }) => (
    <div data-testid="search-result-item">{item.slug}</div>
  ),
}));

describe('SearchPage', () => {
  beforeEach(() => {
    mockSearch = {
      query: '',
      data: undefined,
      isLoading: false,
      isError: false,
      isReady: false,
    };
    mockSearchDelay = false;
  });

  it('shows the idle empty state before any query', () => {
    render(<SearchPage />);

    expect(screen.getByTestId('search-empty-state')).toBeInTheDocument();
    expect(screen.queryByTestId('search-results-skeleton')).toBeNull();
  });

  it('shows the rotating status line while loading, without a skeleton by default', () => {
    mockSearch = {
      query: 'cats',
      data: undefined,
      isLoading: true,
      isError: false,
      isReady: false,
    };

    render(<SearchPage />);

    expect(screen.getByTestId('loading-messages')).toBeInTheDocument();
    expect(screen.queryByTestId('search-results-skeleton')).toBeNull();
  });

  it('shows the skeleton while loading when the artificial delay is enabled', () => {
    mockSearch = {
      query: 'cats',
      data: undefined,
      isLoading: true,
      isError: false,
      isReady: false,
    };
    mockSearchDelay = true;

    render(<SearchPage />);

    expect(screen.getByTestId('loading-messages')).toBeInTheDocument();
    expect(screen.getByTestId('search-results-skeleton')).toBeInTheDocument();
  });

  it('renders the result meta and items once a query resolves', () => {
    mockSearch = {
      query: 'cats',
      data: {
        duration: 42,
        items: [{ slug: 'cat-facts' } as SearchResultItem],
      },
      isLoading: false,
      isError: false,
      isReady: true,
    };

    render(<SearchPage />);

    expect(screen.getByText('resultMeta')).toBeInTheDocument();
    expect(screen.getByTestId('search-result-item')).toHaveTextContent(
      'cat-facts',
    );
    expect(screen.queryByTestId('search-empty-state')).toBeNull();
  });

  it('shows the no-results state when a query resolves empty', () => {
    mockSearch = {
      query: 'cats',
      data: { duration: 5, items: [] },
      isLoading: false,
      isError: false,
      isReady: true,
    };

    render(<SearchPage />);

    expect(screen.queryByTestId('search-empty-state')).toBeNull();
    expect(screen.getByText('noResults')).toBeInTheDocument();
  });

  it('shows the error alert and suppresses other states', () => {
    mockSearch = {
      query: 'cats',
      data: undefined,
      isLoading: false,
      isError: true,
      isReady: true,
    };

    render(<SearchPage />);

    expect(screen.getByText('error')).toBeInTheDocument();
    expect(screen.queryByTestId('search-empty-state')).toBeNull();
    expect(screen.queryByTestId('loading-messages')).toBeNull();
  });
});
