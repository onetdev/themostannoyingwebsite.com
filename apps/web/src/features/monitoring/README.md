# Monitoring feature

Provides internal tools for debugging, inspecting state, and testing system events.

## Key highlights

- **DebugPage**: A central hub for developers and testers to inspect the current application state.
- **StoreInspector**: Real-time visualization of Zustand store states (Runtime, Achievements, User Preferences, etc.), facilitating quick debugging of UI behaviors and feature flags.
- **EventTester**: Manually triggers events on the global `EventBus`, allowing for controlled testing of achievement unlocks, obstructor behaviors, and other event-driven features.
- **DebugAuthGate**: A simple security layer to prevent unauthorized access to the debug suite in certain environments.
- **useDebugAuth**: Hook for managing access to the debug tools, integrating with the application's runtime state.

## Out of scope

- Real-time production monitoring or error tracking (handled by external services like Sentry).
- Publicly accessible metrics or status pages.
- Performance profiling or network monitoring.
