/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { AppLanguageSwitcher } from './AppLanguageSwitcher';

jest.mock('next-intl', () => ({
  useLocale: () => 'en',
  useTranslations: () => (key: string) => key,
}));

jest.mock('@/hooks', () => ({
  useLanguageSwitcher: () => ({
    languages: [
      { locale: 'en', flag: '🇺🇸', label: 'English' },
      { locale: 'de', flag: '🇩🇪', label: 'Deutsch' },
    ],
    currentLanguage: { locale: 'en', flag: '🇺🇸', label: 'English' },
    onLanguageChange: jest.fn(),
  }),
}));

describe('AppLanguageSwitcher', () => {
  it('shows the flag and the label by default', () => {
    render(<AppLanguageSwitcher />);

    expect(screen.getByText('🇺🇸 English')).toBeInTheDocument();
  });

  it('shows only the flag when displayOnlyFlag is set', () => {
    render(<AppLanguageSwitcher displayOnlyFlag />);

    expect(screen.queryByText('English')).not.toBeInTheDocument();
    expect(screen.getByText('🇺🇸')).toBeInTheDocument();
  });
});
