/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { SearchResultsSkeleton } from './SearchResultsSkeleton';

describe('SearchResultsSkeleton', () => {
  it('renders the requested number of placeholder rows', () => {
    const { container } = render(<SearchResultsSkeleton count={2} />);

    expect(screen.getByTestId('search-results-skeleton')).toBeInTheDocument();
    // Three skeletons per row (title + two excerpt lines).
    expect(container.querySelectorAll('[data-slot="skeleton"]')).toHaveLength(
      2 * 3,
    );
  });

  it('is hidden from assistive technology', () => {
    render(<SearchResultsSkeleton />);

    expect(screen.getByTestId('search-results-skeleton')).toHaveAttribute(
      'aria-hidden',
      'true',
    );
  });
});
