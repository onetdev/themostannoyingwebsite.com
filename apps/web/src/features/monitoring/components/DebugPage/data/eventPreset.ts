type EventPreset = {
  type: keyof AppEvents;
  name?: string;
  payload: unknown;
};

export const eventPresets: EventPreset[] = [
  { type: 'navigation:changed', payload: { path: '/debug' } },
  { type: 'global-search:query', payload: { query: 'annoying' } },
  {
    type: 'subscription:package-selected',
    payload: { packageId: 'premium' },
  },
  { type: 'context-menu:triggered', payload: {} },
  { type: 'global-text:copied', payload: {} },
  {
    type: 'dead-pixel:clicked',
    name: 'dead-pixel:clicked (normal)',
    payload: { isRainbow: false },
  },
  {
    type: 'dead-pixel:clicked',
    name: 'dead-pixel:clicked (rainbow)',
    payload: { isRainbow: true },
  },
  { type: 'exit-prompt:shown', payload: {} },
  {
    type: 'wof:spin-completed',
    payload: { prize: 'Absolutely Nothing' },
  },
  { type: 'admin-auth:login', payload: { username: 'admin' } },
  {
    type: 'screensaver:maze:stepped',
    name: 'screensaver:maze:stepped (normal)',
    payload: { passedSpecialCell: false },
  },
  {
    type: 'screensaver:maze:stepped',
    name: 'screensaver:maze:stepped (special cell)',
    payload: { passedSpecialCell: true },
  },
  {
    type: 'screensaver:bouncy-logo:bounced',
    name: 'screensaver:bouncy-logo:bounced (normal)',
    payload: { isPerfectCorner: false },
  },
  {
    type: 'screensaver:bouncy-logo:bounced',
    name: 'screensaver:bouncy-logo:bounced (perfect corner)',
    payload: { isPerfectCorner: true },
  },
  {
    type: 'achievement:unlocked',
    payload: { achievementId: 'first-visit' },
  },
  {
    type: 'achievement:progress-updated',
    payload: { achievementId: 'maze-explorer', progress: 5 },
  },
];
