/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';

import { AppNavigationDesktop } from './AppNavigationDesktop';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock('@/hooks', () => ({
  useLangDir: () => 'ltr',
}));

jest.mock('@/stores', () => ({
  useRuntimeStore: () => ({ showShareModal: jest.fn() }),
}));

jest.mock('@/core/telemetry', () => ({
  track: jest.fn(),
}));

jest.mock('@/core/react', () => ({
  Link: ({
    href,
    hrefFor,
    children,
    className,
  }: {
    href?: string;
    hrefFor?: unknown;
    children?: ReactNode;
    className?: string;
  }) => (
    <a href={href ?? String(hrefFor)} className={className}>
      {children}
    </a>
  ),
}));

const getNavLink = (label: string) => screen.getByRole('link', { name: label });

describe('AppNavigationDesktop', () => {
  it('renders top-level links in the inherited text color', () => {
    render(<AppNavigationDesktop />);

    for (const label of [
      'common.navigation.home',
      'common.navigation.articles',
      'common.navigation.plans',
    ]) {
      const link = getNavLink(label);

      // Regression: links used to fall through to the global primary color.
      expect(link).toHaveClass('link-as-inherit');
      expect(link).not.toHaveClass('text-primary');
    }
  });

  it('renders dropdown links in the inherited text color', () => {
    render(<AppNavigationDesktop />);

    fireEvent.click(
      screen.getByRole('button', { name: 'common.navigation.explore' }),
    );

    const link = screen.getByRole('link', { name: 'common.navigation.dilf' });

    expect(link).toHaveClass('link-as-inherit');
    expect(link).not.toHaveClass('text-primary');
  });
});
