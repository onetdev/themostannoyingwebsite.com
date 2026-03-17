# ADR 2: Use Next.js for the Web Application

## Status
Accepted (Historical)

## Context
We needed a modern React framework to build the main web application. The requirements included efficient routing, server-side rendering (SSR) or static site generation (SSG) for SEO, and a great developer experience.

## Decision
We chose **Next.js** (currently on version 16) as the foundational framework for the web application.

## Consequences
- **Pros**: Built-in optimization, excellent documentation, and a strong ecosystem.
- **Cons**: Ties the project closely to Next.js specific patterns and deployment optimizations (though highly compatible with Vercel).
