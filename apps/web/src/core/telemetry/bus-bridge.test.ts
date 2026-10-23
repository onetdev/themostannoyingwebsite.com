/**
 * @jest-environment jsdom
 */
import { renderHook } from '@testing-library/react';
import { EVENT_BRIDGE, useTelemetryBusBridge } from './bus-bridge';
import { trackDynamic } from './index';

jest.mock('./index', () => ({ trackDynamic: jest.fn() }));

jest.mock('@/core/events/react/useAllEvents', () => {
  const state: {
    handler?: (event: { name: string; data?: unknown }) => void;
  } = {};
  return {
    __state: state,
    useAllEvents: (
      handler: (event: { name: string; data?: unknown }) => void,
    ) => {
      state.handler = handler;
    },
  };
});

type BridgeMapper = (data: unknown) => { name: string } | null;

function map(eventName: keyof typeof EVENT_BRIDGE, payload: unknown) {
  const mapper = EVENT_BRIDGE[eventName] as unknown as BridgeMapper;
  return mapper(payload);
}

describe('telemetry bus bridge', () => {
  it('covers every non-telemetry app event', () => {
    expect(Object.keys(EVENT_BRIDGE)).toHaveLength(17);
  });

  it.each([
    ['navigation:changed', { path: '/en/articles/?q=1' }, 'nav.page-leave'],
    ['route:visit', { route: 'home' }, 'nav.route-alias'],
    ['global-text:copied', undefined, 'ui.copy'],
    ['exit-prompt:shown', undefined, 'disruption.exit-prompt'],
    ['ui:modal:dismiss-signaled', undefined, 'ui.modal-dismiss'],
    ['ui:newsletter-modal:show', undefined, 'marketing.newsletter-modal'],
    [
      'subscription:package-selected',
      { packageId: 'premium' },
      'commerce.plan-selected',
    ],
    [
      'achievement:unlocked',
      { achievementId: 'first-visit' },
      'achievement.unlocked',
    ],
    [
      'achievement:progress-updated',
      { achievementId: 'maze-explorer', progress: 3 },
      'achievement.progress',
    ],
    ['support:bot-message-received', undefined, 'support.bot-message'],
    ['wof:spin-completed', { prize: 'Nothing' }, 'marketing.wheel-spin'],
    ['admin-auth:login', { username: 'admin' }, 'admin.login'],
    ['context-menu:triggered', undefined, 'disruption.context-menu'],
    ['dead-pixel:clicked', { isRainbow: true }, 'disruption.dead-pixel'],
    [
      'screensaver:maze:stepped',
      { passedSpecialCell: false },
      'disruption.screensaver-maze',
    ],
    [
      'screensaver:bouncy-logo:bounced',
      { isPerfectCorner: true },
      'disruption.screensaver-bounce',
    ],
    ['global-search:query', { query: '  cats  ' }, 'nav.search-submit'],
  ] as const)('maps %s to %s', (eventName, payload, expectedName) => {
    expect(map(eventName, payload)?.name).toBe(expectedName);
  });

  it('never forwards raw values that are not in the catalog', () => {
    expect(map('admin-auth:login', { username: 'admin' })).toEqual({
      name: 'admin.login',
      props: { usernameLength: 5 },
    });
    expect(map('global-search:query', { query: '  cats  ' })).toEqual({
      name: 'nav.search-submit',
      props: { queryLength: 4 },
    });
  });
});

describe('useTelemetryBusBridge', () => {
  type Handler = (event: { name: string; data?: unknown }) => void;

  const bridgeHook = () => {
    const state = (
      jest.requireMock('@/core/events/react/useAllEvents') as {
        __state: { handler?: Handler };
      }
    ).__state;
    return state;
  };

  beforeEach(() => {
    jest.clearAllMocks();
    window.history.replaceState({}, '', '/en/');
    bridgeHook().handler = undefined;
  });

  it('forwards a mapped event with the bridge source', () => {
    renderHook(() => useTelemetryBusBridge());

    bridgeHook().handler?.({
      name: 'dead-pixel:clicked',
      data: { isRainbow: true },
    });

    expect(trackDynamic).toHaveBeenCalledWith(
      'disruption.dead-pixel',
      { isRainbow: true },
      { source: 'bridge' },
    );
  });

  it('ignores telemetry echoes and the debug route', () => {
    renderHook(() => useTelemetryBusBridge());

    bridgeHook().handler?.({ name: 'telemetry:event', data: {} });
    window.history.replaceState({}, '', '/en/debug/');
    bridgeHook().handler?.({
      name: 'dead-pixel:clicked',
      data: { isRainbow: true },
    });

    expect(trackDynamic).not.toHaveBeenCalled();
  });
});
