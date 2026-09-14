# ADR 11: Contract-Driven Content SDK Architecture with Orval and Ky

## Status
Accepted

## Context
The application relies on an external Headless Content API for articles, static page copy, taxonomy tags, and image metadata. Manually writing and maintaining API client fetch functions, payload types, and validation schemas introduces significant drift risk, typing mismatches, and tedious boilerplate whenever the content schema changes.

We needed a clean, isolated boundary between the consumer application (`apps/web`) and the backend content service, ensuring strong contract adherence and end-to-end type safety.

## Decision
We created a dedicated monorepo package, **`@maw/content-sdk`**, employing a contract-first architecture:

1. **Schema-First Generation**: We use **Orval** (`orval.config.ts`) pointing to the Content API's OpenAPI specification (`/docs/json`). Orval is configured with `client: 'zod'` and formatted via Biome to generate runtime Zod validation schemas and companion TypeScript types (`endpoints.ts`).
2. **HTTP Client**: Built on top of **Ky**, providing modern `fetch` semantics, customizable timeouts, search parameter normalization, and robust error trapping without heavy Axios dependencies.
3. **Content Sanitization**: Embedded markdown is securely parsed and sanitized using `marked` and `sanitize-html` within the SDK before being returned to consumer applications.

## Consequences
- **Pros**: Automated contract synchronization via `pnpm orval`; zero manual typing required for content endpoints; runtime response validation prevents corrupted API payloads from reaching UI components.
- **Cons**: Requires re-running code generation and committing updated artifacts when backend API contracts evolve; tight coupling to the availability or accuracy of the OpenAPI endpoint during generation.
