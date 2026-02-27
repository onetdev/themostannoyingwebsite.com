type EventPreset = {
  type: string;
  name?: string;
  payload: unknown;
};

export const eventPresets: EventPreset[] = [
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
  {
    type: 'MAZE_STEP',
    name: 'MAZE_STEP (normal)',
    payload: { passedSpecialCell: false },
  },
  {
    type: 'MAZE_STEP',
    name: 'MAZE_STEP (special cell)',
    payload: { passedSpecialCell: true },
  },
];
