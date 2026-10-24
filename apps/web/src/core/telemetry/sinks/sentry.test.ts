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

  it('drops events scoped to a sensitive surface', () => {
    const sink = createSentrySink();

    sink.handle(
      event({
        props: {
          control: 'auth:birth-year',
          optionValue: '1990',
          section: 'auth:signup',
        },
      }),
    );
    sink.handle(
      event({
        name: 'ui.select',
        props: {
          control: 'survey:answer',
          optionValue: 'option-a',
          section: 'marketing:survey',
        },
      }),
    );
    sink.handle(
      event({
        name: 'ui.toggle',
        props: {
          control: 'consentNewsletter',
          checked: true,
          section: 'settings:preferences',
        },
      }),
    );
    sink.handle(
      event({
        name: 'ui.select',
        props: { control: 'auth:gender', optionValue: 'male' },
      }),
    );

    expect(addBreadcrumb).not.toHaveBeenCalled();
  });

  it('drops excluded value-bearing events outside sensitive sections', () => {
    const sink = createSentrySink();

    sink.handle(
      event({
        name: 'nav.locale-change',
        props: { locale: 'de', from: 'en' },
      }),
    );
    sink.handle(
      event({
        name: 'ui.slider',
        props: { control: 'donation:before-after', valueBucket: 50 },
      }),
    );

    expect(addBreadcrumb).not.toHaveBeenCalled();
  });

  it('honours globalPrivacyControl', () => {
    Object.defineProperty(navigator, 'globalPrivacyControl', {
      configurable: true,
      value: true,
    });

    try {
      createSentrySink().handle(event());
      expect(addBreadcrumb).not.toHaveBeenCalled();
    } finally {
      Object.defineProperty(navigator, 'globalPrivacyControl', {
        configurable: true,
        value: undefined,
      });
    }
  });
});
