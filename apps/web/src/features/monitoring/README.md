# Monitoring Feature

Provides internal tools for debugging, inspecting application state, and testing system events.

## Key Highlights

- **DebugPage**: A developer-only page (accessible via `/debug`) that provides a centralized interface for monitoring state and triggering events.
- **StoreInspector**: Real-time visualization of Zustand store states (e.g., `RuntimeStore`, `AchievementsStore`, `PainPreferencesStore`), allowing developers to quickly debug feature flags and achievement progress.
- **EventHistory**: Displays a chronological log of all global `EventBus` signals that have occurred during the current session.
- **EventTester**: A tool for manually emitting events onto the global `EventBus` to test achievement unlocks, disruption triggers, and other event-driven behaviors without performing the required actions.
- **DebugAuthGate**: A simple, persistent authentication layer (`useDebugAuth` hook) that restricts access to the debug tools in non-development environments. The default password is `admin`.

## Debug Components

- `DebugPage`: The main layout container.
- `StoreInspector`: The state visualizer.
- `EventTester`: The manual event trigger.
- `EventHistory`: The log of occurrences.

## Out of Scope

- **Production Analytics**: Does not handle production monitoring or error tracking (handled by Sentry).
- **Public Stats**: Not intended for end-user metrics or status pages.
- **Performance Profiling**: No detailed performance or resource usage stats are provided here.
