import { EVENT_BRIDGE } from './bus-bridge';

jest.mock('./index', () => ({ trackDynamic: jest.fn() }));

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
    ['route:visit', { route: 'home' }, 'nav.route-view'],
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
