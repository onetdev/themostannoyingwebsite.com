import type { NextRequest } from 'next/server';
import {
  buildContentApiProxyUrl,
  isContentApiProxyEnabled,
} from '@/core/content';

/**
 * Development-only same-origin proxy for browser-side Content API calls.
 *
 * The browser calls `/api/content/*` (same origin, so no CORS applies) and this
 * handler forwards the request server-to-server. It deliberately does **not**
 * forward the browser's `Origin` header, which the Content API rejects with
 * `403 CORS_ORIGIN_DENIED` for origins outside its allowlist (local
 * development being one of them).
 *
 * Outside development the handler is inert: production and preview deployments
 * call the Content API directly against its allowlisted origins.
 *
 * @see adr/0024-dev-content-api-proxy.md
 */
async function proxy(
  request: NextRequest,
  context: { params: Promise<{ path?: string[] }> },
): Promise<Response> {
  if (!isContentApiProxyEnabled()) {
    return new Response('Not Found', { status: 404 });
  }

  const { path } = await context.params;
  const target = buildContentApiProxyUrl(path ?? [], request.nextUrl.search);

  const upstream = await fetch(target, {
    headers: { accept: 'application/json' },
    cache: 'no-store',
  });

  return new Response(upstream.body, {
    status: upstream.status,
    headers: {
      'content-type':
        upstream.headers.get('content-type') ?? 'application/json',
    },
  });
}

export const dynamic = 'force-dynamic';

export const GET = proxy;
export const HEAD = proxy;
