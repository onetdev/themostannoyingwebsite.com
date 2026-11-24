# ADR 40: On-Demand Content Rendering with Home and Featured Pregeneration

## Status

Accepted (amends [ADR 18](0018-static-first-architecture-and-build-precomputation.md)).

## Context

ADR 18 adopted static generation by default. As the localized catalog grew, that
meant pre-rendering every article, author, short and archive page for every
locale during the build. The combination produced a huge matrix of generated
content: roughly 1,200 page functions and one ISR cache entry per localized
path, even when nobody visited that page.

That matrix carried three unnecessary costs:

- **ISR writes**: every pre-generated entry participates in revalidation and
  cache bookkeeping despite being unvisited.
- **Storage**: every localized path occupies an ISR cache entry in addition to
  its function/artifact entry.
- **Build time**: the build has to fetch, render and emit every locale × content
  combination before it can ship.

The site is still static-first where it matters: the home pages, build metadata,
locale catalog, manifest and sitemap are generated at build time. Content detail
and secondary pages do not need to be part of that build artifact to remain
fast; they can be rendered on demand and cached by ISR.

## Decision

1. **Localized home pages and featured articles are pre-generated.**
   `generateStaticParams` remains on the `/[locale]` home route, and the article
   detail route pre-generates only its featured articles per locale.
2. **Non-featured content detail pages render on demand.** Articles other than
   the featured ones, authors, shorts and article archive pagination have no
   static params; their first request renders the page and caches it with the
   existing `revalidate` window.
3. **Secondary public pages render on demand too.** Static pages, account pages,
   search and archives no longer export locale static params. They keep their
   existing metadata, structured data and `notFound()` behavior.
4. **Build precomputation stays.** Deployment metadata, the web manifest, the
   locale catalog and the sitemap are still generated before/with the build.
5. **Revalidation remains a separate tuning concern.** The initial change keeps
   `revalidate = 1800` so ISR write volume can be measured before TTLs or
   on-demand invalidation are changed.

## Consequences

- **Pros**: The build emits only home pages, featured article details and build artifacts
  instead of per-locale content paths; fewer Vercel functions and ISR cache entries; shorter
  builds and more predictable cost.
- **Pros**: Most importantly, the change removes the large matrix of generated
  content that caused unnecessary ISR writes, cache storage usage and build-time
  work for pages that were never visited.
- **Pros**: Content pages still use ISR, so crawlers and visitors get cached HTML
  after the first request.
- **Pros**: New content does not require a rebuild merely to become routable.
- **Cons**: The first request to an uncached page pays server-render latency.
- **Cons**: Sitemap crawls can populate many ISR entries over time; TTL and
  on-demand invalidation still need monitoring.
- **Cons**: The old "everything is pre-rendered" guarantee is gone; tests and
  docs must describe on-demand behavior.
