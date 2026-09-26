# ADR 24: Dev-Only Same-Origin Proxy for Browser Content API Calls

## Status
Accepted

## Context
The headless Content API enforces a CORS allowlist in application middleware, not just in the browser. It allows `themostannoyingwebsite.com` subdomains and `onetdev.vercel.app` preview variants, plus `localhost` / `127.0.0.1` **only when `NODE_ENV !== 'production'`**. Because the deployed API always runs in production, `localhost` can never be trusted there.

The web app serves local development from `https://localhost:3000`. Browser-side requests from that origin to the Content API therefore receive `403 CORS_ORIGIN_DENIED`. After ADR 23 moved the locale catalog to build time, the only browser-side Content API call is article search (`useSearchQuery`), but the same problem applies to any current or future browser-side Content API consumer, including anything resolved through the client DI container. Server-side (`server-only`), server-DI, and build-script calls send no `Origin` header and are unaffected.

We considered four ways to resolve this:

1. Add `localhost` to the production allowlist.
2. Develop against a local domain under the already-allowed `themostannoyingwebsite.com` suffix.
3. Run a local instance of the Content API during development.
4. Route browser requests through a same-origin proxy on the web app.

Option 4 was chosen because it keeps dev origins out of production configuration and requires no local DNS or certificates.

## Decision
Adopt a **dev-only, app-wide same-origin proxy** for browser-side Content API calls.

1.  **Single client factory.** `createAppContentClient()` (`apps/web/src/core/content/client.ts`) is the app's canonical Content API client. It resolves a `/api/content` base URL only when running in the browser **and** `NODE_ENV === 'development'`; on the server, and in every other environment, it defers to the SDK default (`NEXT_PUBLIC_CONTENT_API_URL`). Server-side code therefore keeps working, since relative URLs do not resolve in Node.
2.  **Whole API, whole app.** The proxy covers every Content API path, and the factory is used everywhere the app creates a client: the DI binding in `di.common.ts`, `ArticleService`, `OnlySpamsService`, `CommentService`, `loadMessages`, and `getSupportedLocaleMeta`. Browser consumers no longer bypass the proxy.
3.  **Proxy.** A dev-gated route handler at `apps/web/src/app/api/content/[...path]/route.ts` forwards `/api/content/*` to `${NEXT_PUBLIC_CONTENT_API_URL}/*`. Outside development it returns `404`, so production and previews never use it.
4.  **Same origin, no `Origin` forwarded.** In development the browser only talks to `https://localhost:3000`; the handler performs the server-to-server fetch and does **not** pass the browser's `Origin` header, which the API would otherwise reject. An external Next.js `rewrite` was rejected because it forwards `Origin` and therefore still returns `403`.
5.  **Trailing slash.** `trailingSlash: true` normalizes the browser request to a trailing slash; the handler filters empty path segments so the upstream URL never carries a trailing slash (which the Content API does not match).

## Consequences
- **Pros**: No production allowlist changes and no dev origins in production configuration.
- **Pros**: Covers the whole Content API and every in-app consumer, so new browser callers are proxied automatically as long as they use `createAppContentClient`.
- **Pros**: Works for any local hostname or port; no `/etc/hosts` or local certificate setup.
- **Pros**: Production and preview traffic are unchanged, avoiding an extra hop for real users.
- **Pros**: Consistent with ADR 23's direction of removing cross-origin browser calls to the Content API.
- **Cons**: The route handler is present in production builds but inert (always `404`); it adds a serverless function to the deployment.
- **Cons**: Local development exercises a proxy path that production does not, so the request transport differs between environments.
- **Cons**: Server-side code in development still targets the API directly; only browser requests are proxied.
- **Cons**: Callers must use `createAppContentClient` rather than the raw SDK `createContentClient` to be proxied; the SDK factory remains a lower-level escape hatch.
