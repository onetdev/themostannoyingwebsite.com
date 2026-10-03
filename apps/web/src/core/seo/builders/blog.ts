import type { Blog, BlogPosting, WithContext } from 'schema-dts';
import { absoluteUrl, localeSiteId } from '../absolute-url';

export interface BlogPostEntry {
  /** Root-relative article path, e.g. `articles/hello-world`. */
  path: string;
  headline: string;
  description?: string;
  datePublished?: string;
}

export interface BlogInput {
  baseUrl: string;
  locale: string;
  name: string;
  description?: string;
  posts: BlogPostEntry[];
}

/**
 * Builds a `Blog` node listing the articles surfaced on the home page.
 */
export function buildBlog(input: BlogInput): WithContext<Blog> {
  const homeUrl = absoluteUrl(input.baseUrl, input.locale);

  const blogPost: BlogPosting[] = input.posts.map((post) => {
    const url = absoluteUrl(input.baseUrl, input.locale, post.path);

    return {
      '@type': 'BlogPosting',
      // Share the article page's node id so the home graph merges with the
      // richer BlogPosting emitted on the article route instead of producing an
      // anonymous duplicate.
      '@id': url,
      url,
      headline: post.headline,
      ...(post.description ? { description: post.description } : {}),
      ...(post.datePublished ? { datePublished: post.datePublished } : {}),
    };
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${homeUrl}#blog`,
    url: homeUrl,
    name: input.name,
    inLanguage: input.locale,
    isPartOf: { '@id': localeSiteId(input.baseUrl, input.locale) },
    ...(input.description ? { description: input.description } : {}),
    blogPost,
  };
}
