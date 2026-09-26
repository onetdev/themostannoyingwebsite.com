/**
 * Canonical URL helpers shared by structured data and sitemap generation.
 *
 * The application is served with `trailingSlash: true`, so every canonical
 * URL produced here ends with a slash to stay consistent with the router.
 */

export function normalizeBaseUrl(baseUrl: string): string {
  return baseUrl.replace(/\/+$/, '');
}

/**
 * Builds an absolute, locale-prefixed, trailing-slashed URL for a route path.
 *
 * `absoluteUrl('https://example.com', 'en', 'articles/hello')`
 *   => 'https://example.com/en/articles/hello/'
 */
export function absoluteUrl(
  baseUrl: string,
  locale: string,
  path = '',
): string {
  const base = normalizeBaseUrl(baseUrl);
  const normalizedPath = path.replace(/^\/+/, '').replace(/\/+$/, '');
  const suffix = normalizedPath.length > 0 ? `/${normalizedPath}` : '';
  return `${base}/${locale}${suffix}/`;
}

/**
 * Resolves a local asset path against the deployment base URL while leaving
 * already-absolute URLs untouched.
 */
export function absoluteAssetUrl(baseUrl: string, assetUrl: string): string {
  if (/^https?:\/\//i.test(assetUrl)) {
    return assetUrl;
  }

  const base = normalizeBaseUrl(baseUrl);
  const normalizedAsset = assetUrl.startsWith('/') ? assetUrl : `/${assetUrl}`;
  return `${base}${normalizedAsset}`;
}

/**
 * Stable site-wide identifier, e.g. `https://example.com/#organization`.
 */
export function siteId(baseUrl: string, fragment: string): string {
  return `${normalizeBaseUrl(baseUrl)}/#${fragment}`;
}

/**
 * Stable identifier for the localized `WebSite` node.
 */
export function localeSiteId(baseUrl: string, locale: string): string {
  return `${absoluteUrl(baseUrl, locale)}#website`;
}
