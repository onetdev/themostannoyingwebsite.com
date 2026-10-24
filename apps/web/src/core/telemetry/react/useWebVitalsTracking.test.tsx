/**
 * @jest-environment jsdom
 */
import { act, render } from '@testing-library/react';
import { useReportWebVitals } from 'next/web-vitals';
import { track } from '@/core/telemetry';
import { useWebVitalsTracking } from './useWebVitalsTracking';

jest.mock('next/web-vitals', () => ({
  useReportWebVitals: jest.fn(),
}));

jest.mock('@/core/telemetry', () => ({ track: jest.fn() }));

const useReportMock = useReportWebVitals as unknown as jest.Mock;
const trackMock = track as unknown as jest.Mock;

let report: ((metric: unknown) => void) | undefined;

function Harness() {
  useWebVitalsTracking();
  return null;
}

describe('useWebVitalsTracking', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    report = undefined;
    useReportMock.mockImplementation((callback) => {
      report = callback;
    });
  });

  it('forwards a vital with route attribution', () => {
    render(<Harness />);

    act(() => {
      report?.({
        name: 'LCP',
        value: 2500.6,
        id: 'v1',
        rating: 'needs-improvement',
        navigationType: 'soft-navigation',
        navigationURL: 'https://site.test/en/articles/?q=secret',
      });
    });

    expect(trackMock).toHaveBeenCalledWith('perf.web-vital', {
      metric: 'LCP',
      value: 2501,
      rating: 'needs-improvement',
      navigationType: 'soft-navigation',
      metricId: 'v1',
      route: '/en/articles/',
    });
  });

  it('stores CLS in thousandths', () => {
    render(<Harness />);

    act(() => {
      report?.({
        name: 'CLS',
        value: 0.1234,
        id: 'v2',
        rating: 'good',
        navigationType: 'navigate',
        navigationURL: '/en/',
      });
    });

    expect(trackMock).toHaveBeenCalledWith(
      'perf.web-vital',
      expect.objectContaining({ metric: 'CLS', value: 123, rating: 'good' }),
    );
  });

  it('does not report on the debug route', () => {
    window.history.replaceState({}, '', '/en/debug/');
    render(<Harness />);

    act(() => {
      report?.({
        name: 'LCP',
        value: 2500,
        id: 'v4',
        rating: 'good',
        navigationType: 'navigate',
        navigationURL: '/en/debug/',
      });
    });

    expect(trackMock).not.toHaveBeenCalled();

    window.history.replaceState({}, '', '/');
  });

  it('ignores non-vital metrics', () => {
    render(<Harness />);

    act(() => {
      report?.({ name: 'Next.js-hydration', value: 10, id: 'v3' });
    });

    expect(trackMock).not.toHaveBeenCalled();
  });
});
