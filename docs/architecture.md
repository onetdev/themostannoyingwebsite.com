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
app/
core/
features/
services/
hooks/
i18n/
schemas/
stores/
```

### `app`

The Next.js App Router directory. It handles routing, layouts, and global styles. It also contains the `bootstrap` folder, which initializes the application's runtime (DI container, global providers).

### `core`

System-level infrastructure used across the application.

- `config`: Environment and application configuration.
- `di`: Dependency Injection primitives and React integration.
- `events`: Global event emitter for cross-feature communication.
- `http`: HTTP client (Ky) and React Query setup.
- `i18n`: Internationalization routing and engine.
- `navigation`: Type-safe navigation helpers.
- `observability`: Logging and error tracking (Sentry).

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

Features are self-contained and typically include:

- `components/`: Feature-specific UI.
- `hooks/`: React hooks for local logic.
- `services/`: Business logic (injectable).
- `i18n/`: Feature-specific translations (Hybrid pattern).
- `schemas/`: Zod schemas.
- `types.ts`: Internal types and DI symbols.
- `README.md`: Feature documentation.

### `services`

Global business logic that is not tied to a single feature (e.g., `AppService`).

### `hooks`

Reusable React hooks that are not tied to a single feature.

### `i18n`

Global translation messages (`index.ts`, `metadata.ts`, `variants.ts`).

### `schemas`

Shared schemas and type definitions (typically defined with Zod).

### `stores`

Global client-side state management using Zustand.

## Instrumentation & Observability

The app uses `instrumentation.ts` and `instrumentation-client.ts` to initialize Sentry and other monitoring tools at the earliest possible moment in the lifecycle.

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
