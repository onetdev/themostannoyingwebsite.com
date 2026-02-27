export const eventPresets = [
  { type: 'NAVIGATION', payload: { path: '/debug' } },
  { type: 'SEARCH', payload: { query: 'annoying' } },
  {
    type: 'SUBSCRIPTION_PACKAGE_SELECTED',
    payload: { packageId: 'premium' },
  },
  { type: 'CONTEXT_MENU_ATTEMPT', payload: {} },
  { type: 'TEXT_COPIED', payload: {} },
  { type: 'DEAD_PIXEL_CLICK_ATTEMPT', payload: {} },
  { type: 'EXIT_PROMPT_TRIGGERED', payload: {} },
  {
    type: 'WHEEL_OF_FORTUNE_SPIN_COMPLETE',
    payload: { prize: 'Absolutely Nothing' },
  },
  { type: 'ADMIN_LOGIN_SUCCESS', payload: { username: 'admin' } },
];
