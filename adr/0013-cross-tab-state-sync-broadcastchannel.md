# ADR 13: Cross-Tab State Synchronization via BroadcastChannel

## Status
Accepted

## Context
"The Most Annoying Website" heavily relies on client-side state stored in `localStorage` (such as active disruption flags, pain preferences, screensaver configurations, and user grant permissions). By default, Zustand stores hydrate on initial page load. When a user opens multiple browser tabs or windows:
- Changes made in one tab (e.g., toggling a disruption or unlocking an achievement) are not reflected in open sibling tabs.
- Writing state from multiple tabs causes race conditions and stale overwrites.
- Because the application is static-first and lacks a persistent backend database or WebSocket server for individual user state, server-mediated synchronization is not an option.

## Decision
We implemented a custom Zustand middleware, **`broadcastChannelSync`** (`src/stores/utils/sync.ts`), leveraging the browser's native **`BroadcastChannel` API**:

1. **Unique Tab Identity**: Each tab instance generates an ephemeral `tabId`.
2. **State Broadcasting**: When `set()` is invoked, non-function state properties are serialized and broadcast to the named channel alongside the sender's `tabId`.
3. **Loop Prevention & Ingestion**: Sibling tabs listening on the channel receive the payload and update their local Zustand store only if the message originated from a different tab ID, avoiding infinite synchronization loops.

## Consequences
- **Pros**: Zero backend infrastructure required; instant real-time synchronization of disruption toggles and preferences across all active tabs; prevents stale cache overwrites.
- **Cons**: Only works within the same origin in modern browsers supporting `BroadcastChannel`; only serializable state can be synchronized (functions and symbols are stripped before broadcast).
