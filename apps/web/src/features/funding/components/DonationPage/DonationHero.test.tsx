/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import type { FundingDonationSummary } from '../../types';
import { DonationHero } from './DonationHero';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => `translated:${key}`,
}));

jest.mock('@/features/share/hooks', () => ({
  useShareAction: () => jest.fn(),
}));

const summaryWithBalance = (balance: number) =>
  ({ totals: { balance } }) as unknown as FundingDonationSummary;

describe('DonationHero', () => {
  it('renders a decorative sonar pulse on the status dot', () => {
    render(<DonationHero summary={summaryWithBalance(-1)} />);

    const pulse = screen.getByTestId('hero-status-pulse');

    expect(pulse).toBeVisible();
    expect(pulse).toHaveClass('animate-sonar');
    expect(pulse.parentElement).toHaveAttribute('aria-hidden');
  });

  it('paints the pulse and dot with the error token when the balance is negative', () => {
    render(<DonationHero summary={summaryWithBalance(-1)} />);

    expect(screen.getByTestId('hero-status-pulse')).toHaveClass('bg-error');
    expect(
      screen.getByText('translated:funding.hero.statusNegative'),
    ).toBeVisible();
  });

  it('paints the pulse and dot with the success token when the balance is positive', () => {
    render(<DonationHero summary={summaryWithBalance(10)} />);

    expect(screen.getByTestId('hero-status-pulse')).toHaveClass('bg-success');
    expect(
      screen.getByText('translated:funding.hero.statusPositive'),
    ).toBeVisible();
  });
});
