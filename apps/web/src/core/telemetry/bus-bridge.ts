import { useCallback } from 'react';
import { useAllEvents } from '@/core/events/react/useAllEvents';
import { trackDynamic } from './index';
import { isTrackingSuppressed } from './react/capture';
import type { TelemetryEventName, TelemetryProps } from './types';

interface BridgeTarget {
  name: TelemetryEventName;
  props: TelemetryProps;
}

/**
 * Everything the app already announces on its event bus, mapped onto the
 * telemetry catalog. Bridging here means features stay untouched: any existing
 * or future `AppEvents` emission is tracked as soon as it is added below.
 *
 * Route-level events (`navigation:changed`, `route:visit`) are intentionally not
 * bridged: page identity is already on every envelope (`route` + `routeAlias`),
 * and `nav.route-view` is emitted per route by the interaction hook.
 */
type BridgeSource = Omit<AppEvents, 'telemetry:event'>;

export const EVENT_BRIDGE: Partial<{
  [K in keyof BridgeSource]: (data: BridgeSource[K]) => BridgeTarget;
}> = {
  'global-text:copied': () => ({ name: 'ui.copy', props: {} }),
  'exit-prompt:shown': () => ({
    name: 'disruption.exit-prompt',
    props: {},
  }),
  'ui:modal:dismiss-signaled': () => ({
    name: 'ui.modal-dismiss',
    props: {},
  }),
  'ui:newsletter-modal:show': () => ({
    name: 'marketing.newsletter-modal',
    props: {},
  }),
  'subscription:package-selected': (data) => ({
    name: 'commerce.plan-selected',
    props: { packageId: data.packageId },
  }),
  'achievement:unlocked': (data) => ({
    name: 'achievement.unlocked',
    props: { achievementId: data.achievementId },
  }),
  'achievement:progress-updated': (data) => ({
    name: 'achievement.progress',
    props: {
      achievementId: data.achievementId,
      progress: data.progress,
    },
  }),
  'support:bot-message-received': () => ({
    name: 'support.bot-message',
    props: {},
  }),
  'wof:spin-completed': (data) => ({
    name: 'marketing.wheel-spin',
    props: { prize: data.prize },
  }),
  'admin-auth:login': (data) => ({
    name: 'admin.login',
    props: { usernameLength: data.username.length },
  }),
  'context-menu:triggered': () => ({
    name: 'disruption.context-menu',
    props: {},
  }),
  'dead-pixel:clicked': (data) => ({
    name: 'disruption.dead-pixel',
    props: { isRainbow: data.isRainbow },
  }),
  'screensaver:maze:stepped': (data) => ({
    name: 'disruption.screensaver-maze',
    props: { passedSpecialCell: data.passedSpecialCell },
  }),
  'screensaver:bouncy-logo:bounced': (data) => ({
    name: 'disruption.screensaver-bounce',
    props: { isPerfectCorner: data.isPerfectCorner },
  }),
  'global-search:query': (data) => ({
    name: 'nav.search-submit',
    props: { queryLength: data.query.trim().length },
  }),
};

/**
 * Subscribes to every app event and forwards the mapped ones to the tracker.
 * The single cast is intentional: `name` and `data` are correlated by the bus,
 * while a plain object lookup cannot express that correlation.
 */
export function useTelemetryBusBridge(): void {
  useAllEvents(
    useCallback(({ name, data }) => {
      if (name === 'telemetry:event' || isTrackingSuppressed()) {
        return;
      }

      const mapper = EVENT_BRIDGE[name];
      if (!mapper) {
        return;
      }

      const target = mapper(data as never);
      trackDynamic(target.name, target.props, { source: 'bridge' });
    }, []),
  );
}
