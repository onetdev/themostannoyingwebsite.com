import type { BlogPosting, Person, ProfilePage, WithContext } from 'schema-dts';
import { absoluteUrl, localeSiteId } from '../absolute-url';

export interface AuthorArticleEntry {
  /** Root-relative article path, e.g. `articles/hello-world`. */
  path: string;
  headline: string;
  description?: string;
  datePublished?: string;
}

export interface AuthorSeoInput {
  baseUrl: string;
  locale: string;
  /** Root-relative author path, e.g. `authors/jane-doe`. */
  path: string;
  name: string;
  /** Human-readable writing persona label. */
  persona?: string;
  /** Brief public biography. */
  about?: string;
  articles?: AuthorArticleEntry[];
}

/**
 * Builds a `ProfilePage` for an author. The public `Person` is embedded as the
 * page's main entity and the author's articles are attached as `hasPart`
 * entries that reference the same `Person` by `@id`.
 */
export function buildAuthor(input: AuthorSeoInput): WithContext<ProfilePage> {
  const url = absoluteUrl(input.baseUrl, input.locale, input.path);
  const personId = `${url}#person`;

  const person: Person = {
    '@type': 'Person',
    '@id': personId,
    name: input.name,
    url,
    ...(input.persona ? { jobTitle: input.persona } : {}),
    ...(input.about ? { description: input.about } : {}),
  };

  const articles: BlogPosting[] = (input.articles ?? []).map((entry) => {
    const articleUrl = absoluteUrl(input.baseUrl, input.locale, entry.path);

    return {
      '@type': 'BlogPosting',
      '@id': articleUrl,
      url: articleUrl,
      headline: entry.headline,
      author: { '@id': personId },
      ...(entry.description ? { description: entry.description } : {}),
      ...(entry.datePublished ? { datePublished: entry.datePublished } : {}),
    };
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': url,
    url,
    inLanguage: input.locale,
    isPartOf: { '@id': localeSiteId(input.baseUrl, input.locale) },
    mainEntity: person,
    ...(input.about ? { description: input.about } : {}),
    ...(articles.length > 0 ? { hasPart: articles } : {}),
  };
}
