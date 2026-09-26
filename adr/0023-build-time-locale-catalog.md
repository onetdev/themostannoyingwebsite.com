# ADR 23: Build-Time Locale Catalog

## Status
Accepted

## Context
The language selector resolved its options from the Content API at runtime in the browser. The API's CORS allowlist covers production origins but not local development origins, so the browser fetch failed during development. As a consequence of ADR 22 (English-only bundled translations), the synchronous fallback contained only English, leaving the selector with a single option whenever the fetch failed.

Fetching in the browser also introduced a request on every session and a brief loading flash before the full list appeared.

## Decision
Generate the supported locale catalog at build time and read it synchronously.

1.  **Build script.** `scripts/build-locales.ts` fetches `client.locales.list()` once at build time and writes `public/locales.json` (gitignored, mirroring `deployment-meta.json`). The file contains the ordered `{ locale, flag, label }` list.
2.  **Fail-fast.** By default the script fails the build (`exit 1`) when the Content API is unreachable, so a deployment never silently ships a degraded catalog. `--allow-fallback` (or `ALLOW_LOCALES_FALLBACK=true`) opts out and writes the bundled English-only fallback instead.
3.  **Environment override.** The API base URL is controlled by `NEXT_PUBLIC_CONTENT_API_URL`, which applies to the browser, the server, and build scripts.
4.  **Wiring.** The script is part of `build:metadata`, `build`, and `dev`, so `build`, `lint`, `check-types`, and local dev all regenerate the catalog before it is consumed.
5.  **Consumption.** `src/i18n/supported-locales.ts` imports the generated JSON and exposes `SUPPORTED_LANGUAGES`. `useLanguageSwitcher` reads it synchronously; the react-query fetch and the `AppService` language methods are removed.
6.  **Flags stay bundled.** The API exposes native names but not flag emojis, so flags continue to be resolved from the local map when the catalog is generated.

## Consequences
- **Pros**: No runtime browser fetch and no CORS coupling; the selector is fully populated on first paint with no loading flash.
- **Pros**: Consistent with the static-first approach (ADR 18) and removes a client-side data dependency.
- **Pros**: A broken or unreachable Content API fails the deployment loudly instead of shipping an English-only selector.
- **Cons**: Adding or removing a supported locale requires a rebuild and redeploy (acceptable for a rare, deliberate change).
- **Cons**: The build now hard-depends on the Content API being reachable. Offline builds must pass `--allow-fallback`, which produces an English-only catalog instead of failing.
