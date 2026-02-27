# Achievements feature

Tracks user progress and unlocks rewards for interacting with the website's annoying features.

## Key highlights

- **AchievementManager**: Centralized component that listens to the `EventBus` for global events (like `MAZE_STEP`, `TEXT_COPIED`, `SEARCH`, etc.) and updates the corresponding achievement state.
- **AchievementToastManager**: Displays real-time notifications to the user when an achievement is unlocked or progress is made.
- **AchievementList & AchievementCard**: UI components for browsing the achievement registry and viewing individual progress.
- **useAchievementsStore**: Persistent client-side state managed via Zustand, tracking which achievements are unlocked and their current progress.
- **ResetAchievementsButton**: Utility for clearing all progress and starting over.

## Out of scope

- Backend synchronization or global leaderboards.
- Meaningful rewards beyond the satisfaction of completion.
- Secure validation of achievements (purely client-side and easily manipulatable through the console).
