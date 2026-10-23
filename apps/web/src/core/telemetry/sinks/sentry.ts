import * as Sentry from '@sentry/nextjs';
import { SENTRY_BREADCRUMB_CATEGORIES } from '../catalog';
import type { InteractionEvent, TelemetrySink } from '../types';

/**
 * Attaches allowlisted interactions as Sentry breadcrumbs so the next captured
 * error report explains what the user was doing. Impressions, raw inputs, and
 * web vitals are excluded on purpose: they are aggregate data, and flooding the
 * 100-entry breadcrumb buffer would hide the fault trail.
 */
export function createSentrySink(): TelemetrySink {
  return {
    name: 'sentry',
    handle(event: InteractionEvent) {
      if (!SENTRY_BREADCRUMB_CATEGORIES.has(event.category)) {
        return;
      }

      Sentry.addBreadcrumb({
        category: `interaction.${event.category}`,
        message: event.name,
        level: event.category === 'error' ? 'warning' : 'info',
        timestamp: event.timestamp / 1000,
        data: {
          ...event.props,
          route: event.route,
          ...(event.routeAlias === undefined
            ? {}
            : { routeAlias: event.routeAlias }),
          ...(event.durationMs === undefined
            ? {}
            : { durationMs: event.durationMs }),
        },
      });
    },
  };
}
