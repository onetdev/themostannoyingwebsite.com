# ADR 41: Direct Browser Calls to the Content API

## Status

Accepted. Supersedes [ADR 24](0024-dev-content-api-proxy.md).

## Context

ADR 24 introduced a development-only same-origin proxy because the deployed
Content API rejected `localhost` and `127.0.0.1`, while local development was
served from `https://localhost:3000`. The proxy added a route handler, a client
factory that switched base URLs by runtime, and a second request hop in
development.

The Content API allowlist now accepts any `*.themostannoyingwebsite.com` origin,
on any scheme and port. `local.themostannoyingwebsite.com` is already the
documented origin for production builds and Playwright, and the same origin can
serve `pnpm dev`. The API also answers CORS preflight (`OPTIONS` → `204` with
`GET,HEAD,OPTIONS`), so direct browser calls are not limited to the GET/HEAD
surface of the old proxy.

## Decision

1.  **Browser calls go direct.** The browser calls `NEXT_PUBLIC_CONTENT_API_URL`
    itself. There is no same-origin proxy and no runtime base-URL switch.
2.  **The dev app runs from an allowlisted origin.** Local development uses
    `https://local.themostannoyingwebsite.com:3000` and points
    `NEXT_PUBLIC_CONTENT_API_URL` at the deployed dev API
    (`https://dev.content.themostannoyingwebsite.com`). Production keeps using
    the Content API default.
3.  **One canonical factory.** `createAppContentClient()` remains the app's
    client factory but is a thin wrapper around the SDK `createContentClient()`.
    Build scripts and E2E helpers use `resolveContentApiBaseUrl()` from
    `core/content/base-url`.
4.  **`localhost` is not a supported origin for deployed APIs.** Opening the app
    at `https://localhost:3000` is expected to fail browser-side Content API
    calls with `403 CORS_ORIGIN_DENIED`. The local Content API at
    `http://localhost:3012` remains available as an escape hatch because its
    development CORS policy accepts localhost.

## Consequences

- **Pros**: One request path in every environment; no proxy route, no extra
  serverless function, and no client/server base-URL branching.
- **Pros**: Future browser-side writes work without extending a GET/HEAD-only
  proxy because the API supports CORS preflight.
- **Pros**: Development and production exercise the same direct transport.
- **Cons**: Developers must use the allowlisted local hostname (and accept the
  self-signed certificate warning) instead of `localhost`.
- **Cons**: `pnpm dev` and `build:metadata` now use the deployed dev API by
  default; local Content API changes are not visible until they are deployed to
  dev unless `NEXT_PUBLIC_CONTENT_API_URL` is overridden.
- **Cons**: The local API escape hatch relies on the browser permitting an HTTPS
  page to call `http://localhost` (verified in Chromium); an HTTPS local API or
  the deployed dev API avoids that mixed-content edge case.
