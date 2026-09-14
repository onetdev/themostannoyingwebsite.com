# ADR 10: Event-Driven Cross-Feature Communication via Centralized Event Bus

## Status
Accepted

## Context
Per ADR 6 (Feature-Sliced Module Organization), features must maintain strict encapsulation and avoid deep imports or circular dependencies. However, many features in "The Most Annoying Website" must react to user behaviors and triggers initiated in other domains:
- The `achievements` feature tracks milestones triggered by disruptions (e.g., maze navigation, context menu blocks), search queries, or clipboard copies.
- The `monitoring` feature listens to all events for real-time debugging and event history.
- The `disruptions` feature triggers modals and prompts based on user interactions.

Managing this cross-cutting interactivity via global React state or direct inter-feature service calls creates tight coupling, circular dependencies, and high cognitive overhead.

## Decision
We adopted a centralized, typed Pub/Sub event bus architecture built on **Emittery**:

- **Core Bus**: Instantiated in `src/core/events/event-bus.ts` typed with `AppEvents`.
- **Event Registry**: Global and feature-specific event payloads are declared in `types.ts` across features and aggregated into `AppEvents`.
- **React Hooks**: Components subscribe to events using custom hooks:
  - `useEvent(eventName, handler)`: Subscribes to a single event with automatic cleanup on unmount.
  - `useAllEvents(handler)`: Used by telemetry and debug listeners (`monitoring`).
- **Emission**: Any service, hook, or component can emit events using `emit(eventName, payload)` without knowing which features are listening.

## Consequences
- **Pros**: Complete decoupling of feature modules; allows non-invasive tracking and gamification (e.g., achievements can be added or modified without changing core feature logic); clean testing via event inspection.
- **Cons**: Event-driven flows can be harder to trace compared to direct function calls; requires discipline in maintaining event typing in `AppEvents` to prevent stale payload assumptions.
