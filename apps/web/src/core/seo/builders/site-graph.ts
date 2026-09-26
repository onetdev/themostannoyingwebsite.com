import type { Graph, Organization, WebSite } from 'schema-dts';
import {
  absoluteAssetUrl,
  absoluteUrl,
  normalizeBaseUrl,
  siteId,
} from '../absolute-url';

export interface SiteGraphInput {
  baseUrl: string;
  locale: string;
  siteName: string;
  description: string;
  /**
   * Locale-independent brand name for the `Organization`. Falls back to
   * `siteName` when omitted. Keep this stable across locales because the
   * organization shares one `@id` everywhere.
   */
  organizationName?: string;
  /** Absolute or root-relative URL of the organization logo. */
  logoUrl?: string;
  /** Social/profile URLs describing the organization. */
  sameAs?: string[];
  contactEmail?: string;
  /** Root-relative route of the search page. Defaults to `search`. */
  searchPath?: string;
}

/**
 * Builds the site-wide `Organization` + `WebSite` graph, including a
 * `SearchAction` for the internal search page.
 */
export function buildSiteGraph(input: SiteGraphInput): Graph {
  const organizationId = siteId(input.baseUrl, 'organization');
  const siteUrl = absoluteUrl(input.baseUrl, input.locale);
  const searchUrl = absoluteUrl(
    input.baseUrl,
    input.locale,
    input.searchPath ?? 'search',
  );

  const organization: Organization = {
    '@type': 'Organization',
    '@id': organizationId,
    name: input.organizationName ?? input.siteName,
    url: normalizeBaseUrl(input.baseUrl),
    ...(input.logoUrl
      ? { logo: absoluteAssetUrl(input.baseUrl, input.logoUrl) }
      : {}),
    ...(input.contactEmail ? { email: input.contactEmail } : {}),
    ...(input.sameAs && input.sameAs.length > 0
      ? { sameAs: input.sameAs }
      : {}),
  };

  const website: WebSite = {
    '@type': 'WebSite',
    '@id': `${siteUrl}#website`,
    name: input.siteName,
    description: input.description,
    url: siteUrl,
    inLanguage: input.locale,
    publisher: { '@id': organizationId },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${searchUrl}?q={search_term_string}`,
      },
      query: 'required name=search_term_string',
    },
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [organization, website],
  };
}
