# Architecture

This repository uses a **Turborepo monorepo** structure. The goal is to keep application code modular, reusable, and easy to evolve.

The architecture separates **infrastructure**, **product features**, and **shared packages**.

## Repository Structure

```
apps/
web        – main Next.js application
ui-docs    – Storybook documentation for UI components

packages/
ui-lib        – shared UI components
utils         – shared utilities
logger        – shared logging utilities
config-*      – shared configuration presets
content-api   – content system for articles and media
```

## Application Architecture

The main application lives in:

```
apps/web
```

The application follows a **feature-oriented structure**.

Typical structure inside the app:

```
src/
core/
features/
services/
hooks/
schemas/
```

### `core`

System-level infrastructure used across the application.

Examples:

- HTTP client
- navigation helpers
- event system
- dependency injection
- logging / observability
- i18n engine

Core code should remain **framework-agnostic where possible**.

### `features`

Product functionality grouped by domain.

Examples:

```
features/
user
settings
comments
achievements
```

Features may contain:

- UI components
- hooks
- services
- schemas
- i18n files

### `services`

Domain logic that may be reused across multiple features.

Examples:

- comment generation
- notification scheduling
- UX anti-pattern logic

### `hooks`

Reusable React hooks that are not tied to a single feature.

### `schemas`

Shared schemas and type definitions (typically defined with Zod).

## Shared Packages

Shared packages provide reusable modules across applications.

### `ui-lib`

Reusable UI components.

### `utils`

Generic utilities and helpers.

### `logger`

Centralized logging abstraction.

### `config-*`

Shared configuration presets (TypeScript, Jest, etc).

### `content-api`

Content system used to store and retrieve:

- articles
- metadata
- images
- other static content

Content is bundled at build time.

## Static-first philosophy

The project prefers **static builds whenever possible**. This is mainly due to cost and performance reasons.

Reasons:

- faster deployments
- reduced runtime complexity
- easier scaling
- lower infrastructure requirements

Dynamic functionality should only be introduced when strictly necessary.

## Architecture Decisions

Major architectural decisions are documented in the repository's **ADR directory**:

```
adr/
```

Each ADR describes:

- the context
- the decision
- the consequences
