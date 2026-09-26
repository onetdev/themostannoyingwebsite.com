import type { BlogPosting, WithContext } from 'schema-dts';
import {
  absoluteAssetUrl,
  absoluteUrl,
  localeSiteId,
  siteId,
} from '../absolute-url';

export interface ArticleSeoInput {
  baseUrl: string;
  locale: string;
  /** Root-relative article path, e.g. `articles/hello-world`. */
  path: string;
  headline: string;
  description?: string;
  /** Absolute or root-relative cover image URL. */
  image?: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
  keywords?: string[];
  articleSection?: string;
}

/**
 * Builds a `BlogPosting` node for an article page.
 */
export function buildArticle(input: ArticleSeoInput): WithContext<BlogPosting> {
  const url = absoluteUrl(input.baseUrl, input.locale, input.path);

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': url,
    url,
    mainEntityOfPage: { '@id': url },
    headline: input.headline,
    inLanguage: input.locale,
    isPartOf: { '@id': localeSiteId(input.baseUrl, input.locale) },
    publisher: { '@id': siteId(input.baseUrl, 'organization') },
    ...(input.description ? { description: input.description } : {}),
    ...(input.image
      ? { image: absoluteAssetUrl(input.baseUrl, input.image) }
      : {}),
    ...(input.datePublished ? { datePublished: input.datePublished } : {}),
    ...(input.dateModified ? { dateModified: input.dateModified } : {}),
    ...(input.authorName
      ? { author: { '@type': 'Person', name: input.authorName } }
      : {}),
    ...(input.keywords && input.keywords.length > 0
      ? { keywords: input.keywords.join(', ') }
      : {}),
    ...(input.articleSection ? { articleSection: input.articleSection } : {}),
  };
}
