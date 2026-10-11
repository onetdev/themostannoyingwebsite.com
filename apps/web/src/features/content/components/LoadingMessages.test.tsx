/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';

import { LoadingMessages } from './LoadingMessages';

let mockMessages: string[] = [
  'Reticulating splines…',
  'Sharpening the pixels…',
];

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => `translated:${key}`,
}));

jest.mock('@/features/content/hooks', () => ({
  usePool: () => mockMessages,
}));

describe('LoadingMessages', () => {
  beforeEach(() => {
    mockMessages = ['Reticulating splines…', 'Sharpening the pixels…'];
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('exposes a polite live status region', () => {
    render(<LoadingMessages />);

    const status = screen.getByRole('status');
    expect(status).toHaveAttribute('aria-live', 'polite');
  });

  it('renders the first pool message and rotates through them', () => {
    render(<LoadingMessages />);

    expect(screen.getByText('Reticulating splines…')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(screen.getByText('Sharpening the pixels…')).toBeInTheDocument();
  });

  it('falls back to a translated label when the pool is empty', () => {
    mockMessages = [];
    render(<LoadingMessages />);

    expect(screen.getByText('translated:fallback')).toBeInTheDocument();
  });
});
