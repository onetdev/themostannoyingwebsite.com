# ADR 26: Structured Data (JSON-LD) Strategy

## Status
Accepted

## Context
Search engines and AI crawlers increasingly rely on structured data to understand page intent, but the application shipped none: no `application/ld+json` payloads existed anywhere. Metadata (`generateMetadata`) already covered titles, descriptions, canonical URLs and Open Graph, but it cannot express entities (Organization, WebSite, BlogPosting, Product) or the relationships between them.

Several constraints shaped the decision:

- The app runs Next.js App Router with `trailingSlash: true` and a `[locale]` root layout, so canonical URLs are locale-prefixed and trailing-slashed.
- User-facing strings must come from `next-intl`; pages already expose `metadata.*` titles/descriptions and `navigation.*` labels.
- Content is mostly Content-API-driven (`Article`, `Page`) with articles carrying `author`, `published_at`, `keywords`, `tags`, `featured_image` and `translations`.
- Page types differ widely: an article hub, an article detail page, informational pages, a fake-pricing plans page, a donation page, utility/auth pages, and no-index internal pages.
- The repo forbids `any` and expects typed, testable business logic co-located with the rest of the code.

The installed Next.js JSON-LD guide recommends rendering structured data as a native `<script type="application/ld+json">` (not `next/script`), escaping `<` to `\u003c`, and endorses `schema-dts` for typing.

## Decision
Introduce a dedicated, cross-cutting `src/core/seo` module and emit JSON-LD from server components.

1.  **Library.** Add `schema-dts` (type-only, zero runtime) and type every payload with `WithContext<...>` / `Graph`, so `@type` and property names are validated at compile time. The resolved version is pinned in the pnpm catalog.
2.  **Pure builders.** `core/seo/builders/*` are pure functions that take already-resolved inputs (strings, numbers, dates, absolute/relative URLs) and return schema.org nodes. They do not import `next-intl`, the DI container, or the app config, which keeps them trivially unit-testable and reusable by sitemap/metadata code.
3.  **Single rendering primitive.** `JsonLd` is a server component that serializes a node, a ready-made `Graph`, or an array (wrapped into `@graph`) and renders one escaped `<script>` tag. Multiple script tags per page are valid and used deliberately.
4.  **Stable `@id`s and canonical URLs.** `absolute-url.ts` is the single source of truth for URLs: `absoluteUrl(baseUrl, locale, path)` always produces a trailing-slashed, segment-encoded canonical URL (matching `trailingSlash: true`), `siteId`/`localeSiteId` produce stable fragment identifiers, and `absoluteAssetUrl` absolutizes local assets while leaving absolute/CDN/data URLs untouched. Organization is `{publicUrl}/#organization`; the localized WebSite is `{localeRoot}/#website`; pages/articles use their canonical URL as `@id`. Structured data must agree with the page canonical: articles are self-canonical per locale with `hreflang` (incl. `x-default`) alternates, and the shared `Organization` node uses a locale-independent brand `name` (resolved from the default locale) so it does not conflict when graphs merge across locales.
5.  **Coverage.** Site-wide `Organization` + `WebSite` (with a `SearchAction`) emitted inside the document by the document-bearing route-group layouts via `SiteStructuredData` (the `[locale]` layout is a pass-through); `Blog` on the home page; `BlogPosting` + `BreadcrumbList` on articles; `WebPage`/`AboutPage`/`ContactPage` + breadcrumbs on informational pages; `ItemList` of `Product`/`Offer` on the plans page; `DonateAction` on the donation page; a plain `ItemList` for achievements. The `Product`/`Offer` payload is intentionally minimal (no `aggregateRating`, no availability claims) because the packages are fictional.
6.  **Indexability hygiene.** `NOINDEX_ROBOTS`/`INDEX_ROBOTS` constants are applied so search, auth, profile, admin, and the subscription funnel pages are `noindex`, and the sitemap lists only indexable routes.
7.  **i18n.** Builders receive translated strings; pages resolve them via `getTranslations`. No user-facing string is hardcoded, and no new translation keys were required — existing `metadata.*` and `navigation.*` values are reused.

## Consequences
- **Pros**: Rich entities (Organization, WebSite, BlogPosting, Product, DonateAction) are now emitted and validated by the type system rather than ad-hoc objects.
- **Pros**: Builders are pure and unit-tested, and `absolute-url.ts` centralizes canonical/trailing-slash logic now shared with the sitemap.
- **Pros**: Adding structured data to a new page is a one-line server component (`WebPageStructuredData`) or a short builder call, so the convention is hard to skip.
- **Pros**: Indexability is corrected as part of the same surface: auth/utility pages no longer advertise themselves as indexable, and the sitemap matches.
- **Cons**: `Product`/`Offer` structured data on a parody pricing page is the riskiest item; Google may consider it misleading even when honest, which is why the payload avoids ratings/availability.
- **Cons**: Multiple JSON-LD script tags are emitted per page (layout + page). This is valid but means crawlers must merge graphs by `@id`.
- **Cons**: Every new route must remember to add structured data; the convention is documented in `apps/web/AGENTS.md` but not enforced by the type system.
- **Cons**: `schema-dts` is a devDependency and must be kept in sync with the schema.org vocabulary; using an untested version could surface type errors at build time.
