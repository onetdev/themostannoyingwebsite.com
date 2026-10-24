import * as Sentry from '@sentry/nextjs';
import {
  isSensitiveTelemetryControl,
  isSensitiveTelemetrySection,
  SENTRY_BREADCRUMB_CATEGORIES,
  SENTRY_EXCLUDED_EVENTS,
} from '../catalog';
import type { InteractionEvent, TelemetrySink } from '../types';

/**
 * Minimal, browser-wide privacy signal. Sentry is an off-device transport, so
 * an explicit opt-out must win over any category allowlist.
 */
function hasPrivacyOptOut(): boolean {
  if (typeof navigator === 'undefined') {
    return false;
  }

  const navigatorWithGpc = navigator as Navigator & {
    globalPrivacyControl?: boolean;
  };
  const dnt = navigator.doNotTrack;

  return (
    navigatorWithGpc.globalPrivacyControl === true ||
    dnt === '1' ||
    dnt === 'yes'
  );
}

/**
 * Attaches allowlisted interactions as Sentry breadcrumbs so the next captured
 * error report explains what the user was doing. Impressions, raw inputs, and
 * web vitals are excluded on purpose: they are aggregate data, and flooding the
 * 100-entry breadcrumb buffer would hide the fault trail.
 *
 * Events scoped to a sensitive surface (auth, survey, settings, ratings, pain
 * level) are also dropped: those payloads carry personal choices (birth date,
 * gender, consent, preferences) even though their category is otherwise safe.
 */
export function createSentrySink(): TelemetrySink {
  return {
    name: 'sentry',
    handle(event: InteractionEvent) {
      if (
        !SENTRY_BREADCRUMB_CATEGORIES.has(event.category) ||
        SENTRY_EXCLUDED_EVENTS.has(event.name) ||
        hasPrivacyOptOut()
      ) {
        return;
      }

      const props = event.props as Record<string, unknown>;
      if (
        isSensitiveTelemetrySection(props.section) ||
        isSensitiveTelemetryControl(props.control)
      ) {
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
