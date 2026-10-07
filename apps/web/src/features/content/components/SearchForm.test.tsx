/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import { SearchForm } from './SearchForm';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock('@/core/i18n/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

jest.mock('@/core/events/event-bus', () => ({
  emit: jest.fn(),
}));

describe('SearchForm', () => {
  it('stays fixed width by default', () => {
    const { container } = render(<SearchForm />);
    const search = container.querySelector('search');

    expect(search).not.toHaveClass('w-40');
    expect(search).not.toHaveClass('focus-within:w-64');
  });

  it('starts compact and expands on focus when expandable', () => {
    const { container } = render(<SearchForm expandable />);
    const search = container.querySelector('search');
    const form = container.querySelector('form');

    expect(search).toHaveClass('w-40');
    expect(search).toHaveClass('focus-within:w-64');
    expect(search).toHaveClass('transition-[width]');
    // The form must fill the flex wrapper so the input grows with it.
    expect(form).toHaveClass('w-full');
  });
});
