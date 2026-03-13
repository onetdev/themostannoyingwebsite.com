# ADR 5: Use Zustand for Client-Side State Management

## Status
Accepted (Historical)

## Context
While many state needs are handled by React Context or server-side state, we require a lightweight and scalable solution for complex client-side state that needs to be accessed across various components.

## Decision
We chose **Zustand** as our primary client-side state management library.

## Consequences
- **Pros**: Extremely lightweight, no boilerplate compared to Redux, easy to use with hooks, and avoids the "provider hell" of multiple React Contexts.
- **Cons**: Less structured than Redux, which requires discipline in how stores are organized in a large application.
