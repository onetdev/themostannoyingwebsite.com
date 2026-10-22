/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen } from '@testing-library/react';
import { telemetry } from '..';
import { TelemetryProvider } from './TelemetryProvider';

jest.mock('@sentry/nextjs', () => ({
  addBreadcrumb: jest.fn(),
  captureException: jest.fn(),
}));

jest.mock('next/web-vitals', () => ({
  useReportWebVitals: jest.fn(),
}));

jest.mock('@/core/i18n/navigation', () => ({
  usePathname: () => '/',
}));

describe('TelemetryProvider', () => {
  beforeEach(() => {
    telemetry.setEnabled(true);
    telemetry.reset();
    window.history.replaceState({}, '', '/en/articles/test/');
    document.documentElement.lang = 'en';
  });

  it('captures an interaction into the shared history', () => {
    render(
      <>
        <TelemetryProvider />
        <button type="button" data-slot="button">
          Press me
        </button>
      </>,
    );

    fireEvent.click(screen.getByText('Press me'));

    const event = telemetry
      .getHistory()
      .find((item) => item.name === 'ui.click');
    expect(event).toBeDefined();
    expect(event?.route).toBe('/en/articles/test/');
    expect(event?.sessionId).toBe(telemetry.getSessionId());
  });

  it('exposes the local debugging handle', () => {
    render(<TelemetryProvider />);

    expect(window.maw?.tracker).toBeDefined();
    expect(window.maw?.tracker?.isEnabled()).toBe(true);
    expect(window.maw?.tracker?.history()).toEqual([]);
  });
});
