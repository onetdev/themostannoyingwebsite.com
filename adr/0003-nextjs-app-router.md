# ADR 3: Adopt Next.js App Router

## Status
Accepted (Historical)

## Context
With the evolution of Next.js, the App Router was introduced as the new standard for building layouts and handling data fetching using React Server Components (RSC).

## Decision
We adopted the **Next.js App Router** structure. This involves using the `app/` directory for routing and leveraging Server Components by default.

## Consequences
- **Pros**: Improved performance through smaller client bundles (RSC), native support for nested layouts, and better data fetching patterns.
- **Cons**: Requires a shift in mindset from the traditional Pages Router; some third-party libraries require explicit `'use client'` directives.
