# ADR 18: Static-First Architecture and Build Precomputation

## Status

Accepted (amended by [ADR 40](0040-on-demand-content-rendering.md))

## Context

Running long-lived Node.js application servers for public-facing websites introduces operational overhead, continuous server compute costs, cold-start latency, and vulnerability to traffic spikes. The requirements for "The Most Annoying Website" demand high availability, instant page loads, and resilient SEO indexing across internationalized routes, while the interactive dynamic behaviors (disruptions, fake auth, achievements, chat simulations) are inherently client-side phenomena.

## Decision

We adopted a **Static-First Philosophy**:

1. **Static Generation by Default**: Pages and routes are pre-rendered statically during the build step using Next.js Static Site Generation (SSG). Dynamic functionality and simulation logic are implemented entirely on the client side using Zustand, React hooks, and browser APIs.
2. **Build Precomputation Scripts**:
   - `build-deployment-meta.ts`: Generates static deployment metadata (git hash, build timestamp, environment flags) before the Next.js compilation step.
   - `build-web-manifest.ts`: Pre-generates the PWA web manifest and localized favicon configurations.
3. **Edge / CDN Deployment**: Production builds are served as static assets directly from edge caches (via Vercel), minimizing origin hits and eliminating the need for persistent server compute.

## Consequences

- **Pros**: Zero runtime server maintenance; maximum performance and low latency via global CDN caching; high resilience against DDoS and traffic spikes; minimal operational costs.
- **Cons**: Content updates from the Headless Content API require rebuilding or revalidating the static build; cannot rely on server-side runtime session state.

## Amendment

[ADR 40](0040-on-demand-content-rendering.md) narrows "static generation by
default": build-time pregeneration is now limited to localized home pages, featured
article detail pages and build artifacts, while content and secondary public pages render on demand and
cache through ISR. The build precomputation scripts and static-first tooling
described above remain in place.
