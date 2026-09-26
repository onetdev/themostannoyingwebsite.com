/**
 * Cookie name used by the next-intl middleware to remember an explicitly chosen
 * language. Must stay in sync with `routing.localeCookie.name` (the next-intl
 * default).
 */
export const LOCALE_COOKIE_NAME = 'NEXT_LOCALE';

/**
 * Persists an explicit language choice so the middleware stops re-negotiating it
 * from `Accept-Language` on subsequent visits. No-op on the server.
 */
export function persistLocaleCookie(locale: string): void {
  if (typeof document === 'undefined') {
    return;
  }

  // biome-ignore lint/suspicious/noDocumentCookie: next-intl's middleware reads this cookie; the Cookie Store API is not available in every supported browser.
  document.cookie = `${LOCALE_COOKIE_NAME}=${encodeURIComponent(locale)}; path=/; max-age=31536000; samesite=lax`;
}
