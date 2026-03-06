# Achievements Feature

Tracks user progress and unlocks rewards for interacting with the website's annoying features.

## Key Highlights

- **AchievementManager**: A centralized provider that initializes early in the application lifecycle. It uses `useEvent` hooks to listen to global `EventBus` signals (e.g., `screensaver:maze:stepped`, `global-search:query`, `context-menu:triggered`) and dispatches updates to the store.
- **AchievementToastManager**: Monitors the achievement store and displays real-time, non-dismissible notifications to the user when an achievement is unlocked or progress is made.
- **AchievementList & AchievementCard**: UI components used on the Achievements page to browse the registry and visualize progress with custom iconography and status indicators.
- **useAchievementsStore**: A persistent Zustand store (via `persist` middleware) that maintains the state of all achievements, including completion status, current progress, and last notification timestamps.
- **ResetAchievementsButton**: Provides a way for users to clear all persisted achievement data and restart their journey of misery.

## Internal Events

The feature emits the following events back to the `EventBus`:
- `achievement:unlocked`: Triggered when an achievement's target progress is reached.
- `achievement:progress-updated`: Triggered when progress is incremented but the target is not yet met.

## Out of Scope

- **Backend Synchronization**: All progress is stored strictly in the browser's `localStorage`.
- **Meaningful Rewards**: Achievements are purely cosmetic and intended for "completionist" satisfaction.
- **Security**: Progress is not validated server-side and can be easily manipulated via the browser console or by editing `localStorage`.
