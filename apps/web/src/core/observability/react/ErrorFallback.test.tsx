/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import type React from 'react';
import { ErrorFallback } from './ErrorFallback';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const messages: Record<string, string> = {
      'common.validation.error.unknownError': 'An unknown error occurred.',
      'common.action.reset': 'Reset',
      'common.action.backHome': 'Back to home',
    };
    return messages[key] ?? key;
  },
}));

jest.mock('@/core/react', () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe('ErrorFallback', () => {
  it('renders with default title and icon', () => {
    render(<ErrorFallback />);

    expect(screen.getByText('An unknown error occurred.')).toBeInTheDocument();
    expect(screen.getByTestId('error-fallback-icon')).toBeInTheDocument();
  });

  it('renders custom title and description', () => {
    render(
      <ErrorFallback
        title="Custom Failure"
        description="Something failed specifically"
      />,
    );

    expect(screen.getByText('Custom Failure')).toBeInTheDocument();
    expect(
      screen.getByText('Something failed specifically'),
    ).toBeInTheDocument();
  });

  it('renders retry button when onRetry is provided and triggers callback on click', () => {
    const handleRetry = jest.fn();
    render(
      <ErrorFallback onRetry={handleRetry} retryLabel="Try Again Please" />,
    );

    const button = screen.getByRole('button', { name: 'Try Again Please' });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(handleRetry).toHaveBeenCalledTimes(1);
  });

  it('does not show home button by default on sm size', () => {
    render(<ErrorFallback size="sm" />);

    expect(
      screen.queryByRole('link', { name: 'Back to home' }),
    ).not.toBeInTheDocument();
  });

  it('shows home button by default on lg and full sizes', () => {
    const { rerender } = render(<ErrorFallback size="lg" />);
    expect(
      screen.getByRole('link', { name: 'Back to home' }),
    ).toBeInTheDocument();

    rerender(<ErrorFallback size="full" />);
    expect(
      screen.getByRole('link', { name: 'Back to home' }),
    ).toBeInTheDocument();
  });

  it('respects showHome override and custom homeHref and homeLabel', () => {
    render(
      <ErrorFallback
        size="sm"
        showHome={true}
        homeHref="/dashboard"
        homeLabel="Return to Safety"
      />,
    );

    const link = screen.getByRole('link', { name: 'Return to Safety' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/dashboard');
  });

  it('allows hiding icon with icon={false}', () => {
    render(<ErrorFallback icon={false} />);

    expect(screen.queryByTestId('error-fallback-icon')).not.toBeInTheDocument();
  });

  it('allows rendering custom icon node', () => {
    render(
      <ErrorFallback
        icon={<span data-testid="custom-test-icon">CustomIcon</span>}
      />,
    );

    expect(screen.getByTestId('custom-test-icon')).toBeInTheDocument();
  });

  it('renders error digest when provided', () => {
    const error = new Error('Bang') as Error & { digest: string };
    error.digest = 'ERR_12345';

    render(<ErrorFallback error={error} />);

    expect(screen.getByText('Digest: ERR_12345')).toBeInTheDocument();
  });
});
