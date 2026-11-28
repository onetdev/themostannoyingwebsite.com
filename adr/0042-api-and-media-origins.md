# ADR 42: Dedicated API and Media Origins

## Status

Accepted (amends the host references in [ADR 41](0041-direct-content-api-browser-calls.md)).

## Context

The Content API originally shipped behind a single combined edge origin,
`content.themostannoyingwebsite.com`, which served JSON, the OpenAPI document,
and generated image assets. The web app therefore used that origin as both its
API base URL and its `next/image` remote host.

The API then moved to dedicated containers and split its delivery surface:

- `api.themostannoyingwebsite.com` is the production API origin, and
  `dev.api.themostannoyingwebsite.com` is the development API origin (API
  `2.3.0` and later).
- Image and short-video assets are advertised as absolute URLs on
  `media.themostannoyingwebsite.com` (production) and
  `dev.media.themostannoyingwebsite.com` (development). Deployed API
  environments no longer serve `/assets/*` themselves.

The SDK still defaulted to the old combined origin, the generator still read the
old dev edge, the Next.js image allowlist still named the old origin, and the
generated client was pinned to API `2.1.0` while the deployed API had already
moved to `2.3.x`.

## Decision

1. **The API origins are `api` and `dev.api`.** The SDK `DEFAULT_BASE_URL` and
   the app's `CONTENT_API_BASE_URL` fallback point at
   `https://api.themostannoyingwebsite.com`; local development and preview
   deployments point `NEXT_PUBLIC_CONTENT_API_URL` at
   `https://dev.api.themostannoyingwebsite.com`.
2. **The generator reads the dev API.** Orval's default OpenAPI source becomes
   `https://dev.api.themostannoyingwebsite.com/docs/json`; the dev API remains
   the contract source of truth because production lags behind it.
3. **Media URLs stay API-provided.** The app keeps rendering the absolute URLs
   returned by the API; it only allowlists `media.themostannoyingwebsite.com`
   and `dev.media.themostannoyingwebsite.com` as remote image hosts. It does not
   construct asset URLs from the API base URL.
4. **The old edge stays supported but is no longer the default.** Environments
   that still pin `NEXT_PUBLIC_CONTENT_API_URL` to `content.themostannoyingwebsite.com`
   keep working until that variable is updated; the repository no longer names
   it in code or documentation except as historical context.

## Consequences

- **Pros**: The client follows the API's production topology instead of a
  legacy catch-all edge, and the generator picks up contract changes directly
  from the channel that receives them first.
- **Pros**: API and media caching, CORS, and rollout policy can evolve
  independently; moving media to its own CDN does not require a web deploy.
- **Pros**: Regenerating the SDK at the same time brings the missing author
  avatar contract (`avatar`, nullable) into the client.
- **Cons**: Deployment configuration outside the repository (the GitHub
  `Preview` and `Production` environment variables and local `.envrc` files)
  must be updated; a stale value silently keeps the old origin in use.
- **Cons**: Because media URLs are absolute and API-supplied, any future media
  host change must be reflected in the Next.js image allowlist.
- **Cons**: `dev.api` is protected by the same edge hardening as production;
  development browser calls now depend on that edge accepting the allowlisted
  `*.themostannoyingwebsite.com` origins.
