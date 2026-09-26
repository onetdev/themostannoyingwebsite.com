import type {
  BreadcrumbList,
  ListItem,
  WebPage,
  WithContext,
} from 'schema-dts';
import { absoluteAssetUrl, absoluteUrl, localeSiteId } from '../absolute-url';

export type WebPageSchemaType = 'WebPage' | 'AboutPage' | 'ContactPage';

export interface BreadcrumbEntry {
  name: string;
  path: string;
}

export interface WebPageInput {
  baseUrl: string;
  locale: string;
  path: string;
  name: string;
  description?: string;
  /** Absolute or root-relative image URL. */
  image?: string;
  type?: WebPageSchemaType;
  breadcrumbs?: BreadcrumbEntry[];
}

export function buildBreadcrumbList(
  baseUrl: string,
  locale: string,
  entries: BreadcrumbEntry[],
): BreadcrumbList {
  const itemListElement: ListItem[] = entries.map((entry, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: entry.name,
    item: absoluteUrl(baseUrl, locale, entry.path),
  }));

  return {
    '@type': 'BreadcrumbList',
    itemListElement,
  };
}

/**
 * Builds a generic `WebPage` (or a more specific page subtype) with optional
 * breadcrumbs and primary image.
 */
export function buildWebPage(input: WebPageInput): WithContext<WebPage> {
  const pageUrl = absoluteUrl(input.baseUrl, input.locale, input.path);

  const base = {
    '@context': 'https://schema.org' as const,
    '@id': pageUrl,
    url: pageUrl,
    name: input.name,
    inLanguage: input.locale,
    isPartOf: { '@id': localeSiteId(input.baseUrl, input.locale) },
    ...(input.description ? { description: input.description } : {}),
    ...(input.image
      ? {
          primaryImageOfPage: {
            '@type': 'ImageObject' as const,
            url: absoluteAssetUrl(input.baseUrl, input.image),
          },
        }
      : {}),
    ...(input.breadcrumbs && input.breadcrumbs.length > 0
      ? {
          breadcrumb: buildBreadcrumbList(
            input.baseUrl,
            input.locale,
            input.breadcrumbs,
          ),
        }
      : {}),
  };

  switch (input.type) {
    case 'AboutPage':
      return { ...base, '@type': 'AboutPage' };
    case 'ContactPage':
      return { ...base, '@type': 'ContactPage' };
    default:
      return { ...base, '@type': 'WebPage' };
  }
}
