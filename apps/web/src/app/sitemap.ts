import type { MetadataRoute } from 'next';
import type { Languages } from 'next/dist/lib/metadata/types/alternative-urls-types';

import { getDependencyContainer } from '@/core/di';
import { absoluteUrl } from '@/core/seo/absolute-url';
import {
  getArticleService,
  getAuthorService,
  getShortService,
} from '@/features/content/services';
import i18nConfig from '@/root/i18n.config';
import { getAppConfigService } from '@/services';

const config = getAppConfigService().getDeploymentMeta();

type SitemapEntry = MetadataRoute.Sitemap[number];

/**
 * Builds the `hreflang` alternates for a path that exists under every locale,
 * including the self-referencing entry and `x-default`.
 */
const genLangAlternates = (path: string): Languages<string> => {
  const alternates: Languages<string> = Object.fromEntries(
    i18nConfig.locales.map((lang) => [
      lang,
      absoluteUrl(config.publicUrl, lang, path),
    ]),
  );

  alternates['x-default'] = absoluteUrl(
    config.publicUrl,
    i18nConfig.defaultLocale,
    path,
  );

  return alternates;
};

/**
 * Sitemap entry for a page whose path is identical across locales. The locale
 * is only expressed through the `hreflang` alternates.
 */
const localizedPageMeta = (
  path: string,
  changeFrequency: SitemapEntry['changeFrequency'],
): SitemapEntry => {
  return {
    url: absoluteUrl(config.publicUrl, i18nConfig.defaultLocale, path),
    changeFrequency,
    alternates: {
      languages: genLangAlternates(path),
    },
  };
};

/**
 * Describes a content type whose logical items exist once per locale (articles,
 * shorts). Every localized variant carries a per-locale slug, so the canonical
 * identity is the group and not the path.
 */
interface GroupedContentSpec<T> {
  /** Every localized variant, across every locale. */
  items: readonly T[];
  /** Identity of the logical item shared by its localized variants. */
  groupKey: (item: T) => string;
  /** Locale of one localized variant. */
  lang: (item: T) => string;
  /** Root-relative, locale-less path of one localized variant. */
  path: (item: T) => string;
  lastModified?: (item: T) => Date;
  changeFrequency?: SitemapEntry['changeFrequency'];
}

/**
 * Builds the `hreflang` alternates map for one content group, including
 * `x-default`. Extracted so the per-locale iteration is independently testable.
 */
const buildGroupLanguages = <T>(
  group: readonly T[],
  spec: Pick<GroupedContentSpec<T>, 'lang' | 'path'>,
): Languages<string> => {
  const languages: Languages<string> = Object.fromEntries(
    group.map((item) => [
      spec.lang(item),
      absoluteUrl(config.publicUrl, spec.lang(item), spec.path(item)),
    ]),
  );

  const xDefault =
    group.find((item) => spec.lang(item) === i18nConfig.defaultLocale) ??
    group[0];
  languages['x-default'] = absoluteUrl(
    config.publicUrl,
    spec.lang(xDefault),
    spec.path(xDefault),
  );

  return languages;
};

/**
 * Groups localized content by its canonical identity so each logical item is
 * emitted once per locale with a complete `hreflang` alternates map (including
 * `x-default`), instead of isolated per-locale entries.
 */
const mapGroupedContentToSitemapEntries = <T>(
  spec: GroupedContentSpec<T>,
): MetadataRoute.Sitemap => {
  const groups = new Map<string, T[]>();

  for (const item of spec.items) {
    if (!(i18nConfig.locales as readonly string[]).includes(spec.lang(item))) {
      continue;
    }

    const key = spec.groupKey(item);
    const group = groups.get(key) ?? [];
    group.push(item);
    groups.set(key, group);
  }

  return [...groups.values()].flatMap((group) => {
    const languages = buildGroupLanguages(group, spec);

    return group.map((item) => ({
      url: absoluteUrl(config.publicUrl, spec.lang(item), spec.path(item)),
      ...(spec.lastModified ? { lastModified: spec.lastModified(item) } : {}),
      ...(spec.changeFrequency
        ? { changeFrequency: spec.changeFrequency }
        : {}),
      alternates: { languages },
    }));
  });
};

async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const di = getDependencyContainer();

  const articleService = getArticleService(di);
  const articles = mapGroupedContentToSitemapEntries({
    items: await articleService.listAll(),
    groupKey: (item) => item.article_group,
    lang: (item) => item.lang,
    path: (item) => `articles/${item.slug}`,
    lastModified: (item) => new Date(item.published_at),
  });

  // Author slugs are locale-independent, so each author is emitted once with a
  // complete `hreflang` alternates map (including `x-default`).
  const authorService = getAuthorService(di);
  const authorsList = await authorService.listAll();
  const authors = authorsList.map((author) =>
    localizedPageMeta(`authors/${author.slug}`, 'weekly'),
  );

  const shortService = getShortService(di);
  const shorts = mapGroupedContentToSitemapEntries({
    items: await shortService.listAll(),
    groupKey: (item) => item.short_group,
    lang: (item) => item.lang,
    path: (item) => `shorts/${item.slug}`,
    lastModified: (item) => new Date(item.published_at),
    changeFrequency: 'monthly',
  });

  const commonPages = [
    '',
    'about',
    'achievements',
    'articles',
    'contact',
    'dilf',
    'donate',
    'flaim-a-phone',
    'hot-things',
    'only-spams',
    'plans',
    'privacy-policy',
    'settings',
    'shorts',
    'terms-of-use',
    'virgin',
  ];

  const commonPagesEntries = commonPages.map((path) =>
    localizedPageMeta(path, 'daily'),
  );

  return [...commonPagesEntries, ...articles, ...authors, ...shorts];
}

export default sitemap;
