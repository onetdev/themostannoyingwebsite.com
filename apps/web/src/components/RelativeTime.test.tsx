/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { RelativeTime } from './RelativeTime';

jest.mock('next-intl', () => ({
  useLocale: () => 'en',
}));

const NOW = new Date('2026-10-20T12:00:00.000Z');
const MONTH = 30 * 24 * 60 * 60 * 1_000;

describe('RelativeTime', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(NOW);
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('refreshes every second while the label is in seconds', () => {
    render(<RelativeTime date={NOW.getTime() - 30_000} />);

    expect(screen.getByText('30 seconds ago')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1_000);
    });

    expect(screen.getByText('31 seconds ago')).toBeInTheDocument();
  });

  it('refreshes once a minute once the label is in minutes', () => {
    render(<RelativeTime date={NOW.getTime() - 5 * 60_000} />);

    expect(screen.getByText('5 minutes ago')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(59_999);
    });

    expect(screen.getByText('5 minutes ago')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1);
    });

    expect(screen.getByText('6 minutes ago')).toBeInTheDocument();
  });

  it('renders a stable absolute date before hydration', () => {
    const date = NOW.getTime() - 2 * MONTH;
    const expected = new Intl.DateTimeFormat('en', {
      dateStyle: 'medium',
    }).format(new Date(date));

    const html = renderToString(<RelativeTime date={date} />);

    expect(html).toContain(expected);
    expect(html).not.toContain('ago');
  });

  it('caps long cadences to the maximum timer delay', () => {
    const setTimeoutSpy = jest.spyOn(globalThis, 'setTimeout');

    render(<RelativeTime date={NOW.getTime() - 2 * MONTH} />);

    expect(setTimeoutSpy).toHaveBeenCalledWith(
      expect.any(Function),
      2_147_483_647,
    );
  });
});
