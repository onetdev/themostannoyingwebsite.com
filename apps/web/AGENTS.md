# AI Agent Guide - MAW Web App

This document provides specific instructions and context for AI agents working on the `apps/web` project.

---

## 🏗 Architecture & Key Locations

### Core Stack
- Builds on top of root core stack.
- **State Management:** Zustand
- **DI:** InversifyJS
- **i18n:** next-intl
- **Dependencies:** Derive third-party API usage from the installed docs, not
  training data — see root `AGENTS.md` → "Third-Party Dependencies".

### Core Directories
- `src/app/`: Next.js App Router.
  - `bootstrap/`: Application root providers and DI container initialization.
- `src/core/`: Foundation logic.
  - `config/`: App configuration (environment, deployment meta).
  - `di/`: Dependency Injection core (InversifyJS setup, base symbols).
  - `events/`: Global event bus (Emittery).
  - `http/`: HTTP client and API abstractions.
  - `seo/`: Structured data (JSON-LD) builders, `JsonLd` renderer, canonical URL helpers, and robots constants. See `adr/0026-structured-data-json-ld.md`.
  - `content/`: Content API client factory (`createAppContentClient`) and dev proxy helpers. Use this factory instead of the raw SDK `createContentClient` so browser requests are proxied in local development.
  - `observability/`: Logging and monitoring (Sentry).
- `src/features/`: Domain-specific modules. **This is where most logic belongs.**
- `src/hooks/`: Shared, app-wide React hooks.
- `src/i18n/`: Internationalization.
  - `messages/`: Bundled English translation reference (other locales are served by the Content API).
- `src/navigation/`: Localization-aware routing and navigation logic.
- `src/schemas/`: Shared Zod validation schemas.
- `src/services/`: Global business logic (e.g., `AppService`).
- `src/stores/`: Global state management (Zustand).

---

## 🌍 Internationalization (i18n)

We use `next-intl`. **NEVER hardcode user-facing strings.**

> ℹ️ Non-English translations are served by the headless Content API. Only the
> English bundles are shipped with the app, as the reference shape and runtime
> fallback. See `adr/0022-api-served-translations.md`. Variant pools (fake names,
> comments, quiz data, etc.) are **not** bundled at all and are served by the API
> for every locale — see `adr/0025-api-only-variant-pools-ssr-hydration.md`.

### 1. Global Messages (`src/i18n/messages/en/`)
Only English is bundled: `src/i18n/messages/en/`
- `index.ts`: Aggregates all feature and global translations. Defines `AppTranslationShape`.
- `common.ts`: Shared UI strings (buttons, labels, common errors).
- `metadata.ts`: SEO titles and descriptions.

### 2. Feature Translations (`src/features/{feature}/i18n/en.ts`)
English only, one file per feature: `i18n/en.ts`. Do not create `i18n/en/`
directories or `variants.ts` files — variant data lives in the Content API.

### 3. Runtime Message Loading
- `src/core/i18n/request.ts` calls `loadMessages()` (`src/core/i18n/load-messages.ts`).
- For `en`, the bundled bundle is returned directly.
- For every other locale, `client.translations.getByLang(locale)` is fetched and
  deep-merged over the English bundle; on failure the English bundle is returned
  and the failure is logged/reported to Sentry.
- Every layout/page reads the locale from the request config, which resolves the
  `[locale]` segment through **`next/root-params`** in `src/core/i18n/request.ts`.
  Do **not** add `setRequestLocale` — it is deprecated in the installed
  next-intl and `next/root-params` supersedes it (verify in
  `node_modules/next-intl`) — and do **not** add a pass-through
  `app/layout.tsx` — the root layout must remain
  `src/app/[locale]/layout.tsx` for root params to work.

### 4. Supported Locale Catalog (build-time)
- `scripts/build-locales.ts` fetches the locale list from the Content API at build
  time and writes `public/locales.json` (gitignored).
- `src/i18n/supported-locales.ts` exposes the generated `SUPPORTED_LANGUAGES`, read
  synchronously by `useLanguageSwitcher` (no runtime browser fetch, no CORS).
- **Fails the build** when the Content API is unreachable. Pass `--allow-fallback`
  or set `ALLOW_LOCALES_FALLBACK=true` to write the bundled English-only list instead.
- The API base URL is overridable via `NEXT_PUBLIC_CONTENT_API_URL`.
- Regenerated via `build:metadata` (run by `build`, `lint`, `check-types`, and `dev`).
- See `adr/0023-build-time-locale-catalog.md`.

### 5. Variant Pools (API-only)
Variant pools are served exclusively by the Content API
(`client.variants.getByType(lang, type)`); nothing is bundled, not even English.

- **Services** that need pool data call `getVariantPool()` (graceful, returns
  `undefined`) or `fetchVariantPool()` (throws) from
  `src/features/content/services/`. On failure pools degrade to empty arrays.
- **Client components** read pools with `useVariantPool<T>(type)` and must be
  covered by a server prefetch, otherwise they render empty:
  - Shared pool wiring lives in `variant-pool-query.ts` (React Query options,
    `staleTime`/`gcTime` infinity) and `prefetch-variant-pools.ts`.
  - Global pain-widget pools are prefetched in the locale layouts and hydrated via
    `ClientRootProviderContainer`.
  - Page-scoped pools are wrapped in `VariantPoolsBoundary`
    (`src/features/content/components/VariantPoolsBoundary.tsx`) so each route
    ships only the pools it uses.
- The query function refuses to run in the browser, keeping all Content API calls
  server-side. Freshness comes from ISR revalidation (`revalidate: 3600`) and
  proactive invalidation when the Content API releases new content.
- See `adr/0025-api-only-variant-pools-ssr-hydration.md`.

---

## 🔎 Structured Data (JSON-LD)

All pages must describe themselves with JSON-LD. The machinery lives in `src/core/seo/` (see `adr/0026-structured-data-json-ld.md`).

- **Builders** (`core/seo/builders/`) are pure functions returning `schema-dts` typed nodes; pass resolved strings/URLs in, never `next-intl` or config.
- **Render** with the server component `JsonLd` (native `<script type="application/ld+json">`, escaped). Use arrays to emit several nodes; they are wrapped in `@graph`.
- **Site-wide** `Organization` + `WebSite` are emitted once per document by `SiteStructuredData`, mounted inside `<body>` by the document-bearing route-group layouts (`(public)`, `(barebone)`). The `[locale]` layout is a pass-through, so never render structured data (or any other document-level element) there. Do not duplicate them per page.
- **Urls** must go through `core/seo/absolute-url.ts` (`absoluteUrl`, `absoluteAssetUrl`, `siteId`) so canonical, trailing-slashed, locale-prefixed URLs stay consistent with `trailingSlash: true`.
- **Static pages**: render `<WebPageStructuredData locale path namespace type? />`.
- **Content pages**: call the matching builder (`buildArticle`, `buildBlog`, `buildPlanList`, `buildDonateAction`, `buildSimpleItemList`) from the existing data fetch.
- **Indexability**: import `INDEX_ROBOTS` / `NOINDEX_ROBOTS` from `core/seo/robots`. Auth, profile, admin, search, and funnel pages are `noindex` and must stay out of `sitemap.ts`.
- **Tests**: unit-test new builders (`*.test.ts`) and add/extend Playwright assertions in `e2e/tests/structured-data.spec.ts`.

---

## 💉 Dependency Injection (InversifyJS)

1.  **Define Symbol**: In `features/{feature}/types.ts`, add to `DI` object.
2.  **Implementation**: Create class in `services/`, mark with `@injectable()`.
3.  **Registration**: 
    - Create `features/{feature}/init.ts` to bind the symbol to implementation.
    - Call this init function in `src/app/bootstrap/di.ts`.
4.  **Consumption**: Use `useService(DI.Symbol)` or create a dedicated hook `useMyService()`.

---

## 🛠 Common Tasks Workflow

### Adding a New Feature
1.  Create folder in `src/features/`.
2.  Define types and DI symbols in `types.ts`.
3.  Add Zod schemas in `schemas/`.
4.  Implement business logic in `services/`.
5.  Create UI in `components/`.
6.  Add translations in `i18n/`.
7.  Register in `src/app/bootstrap/di.ts`.

### Adding a New Page
1.  Create route in `src/app/`.
2.  Implement `generateMetadata` using `getTranslations({ locale, namespace: 'metadata.xxx' })`.
3.  Keep `page.tsx` lean; handle SEO metadata, fetch data, and pass to a Feature component.
4.  Wrap content in `PageLayout`.
5.  Add structured data via `src/core/seo` (see below).

---

## 📏 Standards & Linting

- **Formatting**: We use **Biome**. Run `pnpm lint:fix` before finishing.
- **Naming**: 
    - `PascalCase` for Components and Classes.
    - `kebab-case` for folders and non-component files.
    - `camelCase` for hooks.
- **CSS**: Use **TailwindCSS 4** semantic tokens (e.g., `text-primary`, `bg-background`). Avoid hex colors.
- **Icons**: Use FontAwesome via our UI library wrappers.
- **No `any` type**: If a type can't be inferred use an explicit intermediate named type with a todo comment.

---

## 🧪 Testing

- **Unit**: Co-locate `*.test.ts` with logic. Use `jest`.
- **E2E**: Place in `e2e/tests/`. Use `playwright`.
- **Validation**: Every new feature or bug fix **MUST** have a corresponding test.

---

## ⚠️ Anti-Patterns to Avoid
- ❌ Putting UI logic in `page.tsx` (Move to `features/*/components/`).
- ❌ Directly importing `en.ts` for types (Use `AppTranslationShape` from `src/types.ts`).
- ❌ Using `any` (Define Zod schemas and infer types).
- ❌ Manual `fetch` calls (Use repositories or services).
- ❌ Bundling variant arrays in messages (Use Content API variant pools via `useVariantPool` + server prefetch).

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
