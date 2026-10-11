/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { SearchEmptyState } from './SearchEmptyState';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

describe('SearchEmptyState', () => {
  it('renders the idle prompt', () => {
    render(<SearchEmptyState />);

    expect(screen.getByTestId('search-empty-state')).toBeInTheDocument();
    expect(screen.getByText('emptyTitle')).toBeInTheDocument();
    expect(screen.getByText('emptyDescription')).toBeInTheDocument();
  });
});
