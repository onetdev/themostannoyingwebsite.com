import * as Sentry from '@sentry/nextjs';
import type { InteractionEvent } from '../types';
import { createSentrySink } from './sentry';

jest.mock('@sentry/nextjs', () => ({ addBreadcrumb: jest.fn() }));

const addBreadcrumb = Sentry.addBreadcrumb as unknown as jest.Mock;

type EventOverrides = Partial<Omit<InteractionEvent, 'props'>> & {
  props?: Record<string, unknown>;
};

function event(overrides: EventOverrides = {}): InteractionEvent {
  return {
    id: 'id-1',
    name: 'ui.click',
    category: 'ui',
    timestamp: 1_700_000_000_000,
    sessionId: 'session-1',
    route: '/en/articles/',
    locale: 'en',
    source: 'auto',
    props: { slot: 'button', tag: 'button' },
    ...overrides,
  } as unknown as InteractionEvent;
}

describe('sentry sink', () => {
  beforeEach(() => {
    addBreadcrumb.mockClear();
  });

  it('forwards allowlisted categories with route and duration', () => {
    createSentrySink().handle(
      event({ category: 'error', durationMs: 42, props: { code: 'HTTP_500' } }),
    );

    expect(addBreadcrumb).toHaveBeenCalledWith({
      category: 'interaction.error',
      message: 'ui.click',
      level: 'warning',
      timestamp: 1_700_000_000,
      data: { code: 'HTTP_500', route: '/en/articles/', durationMs: 42 },
    });
  });

  it('includes the page route alias in the breadcrumb data', () => {
    createSentrySink().handle(event({ routeAlias: 'home' }));

    expect(addBreadcrumb).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ routeAlias: 'home' }),
      }),
    );
  });

  it('drops aggregate categories to protect the breadcrumb buffer', () => {
    const sink = createSentrySink();

    for (const category of [
      'impression',
      'input',
      'perf',
      'session',
    ] as const) {
      sink.handle(event({ category }));
    }

    expect(addBreadcrumb).not.toHaveBeenCalled();
  });
});
