import type { ArticleListItem } from '@maw/content-sdk';
import type { MetadataRoute } from 'next';
import type { Languages } from 'next/dist/lib/metadata/types/alternative-urls-types';

import { getDependencyContainer } from '@/core/di';
import { absoluteUrl } from '@/core/seo/absolute-url';
import {
  getArticleService,
  getAuthorService,
} from '@/features/content/services';
import i18nConfig from '@/root/i18n.config';
import { getAppConfigService } from '@/services';

const config = getAppConfigService().getDeploymentMeta();

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

const commonPageMeta = (path: string): MetadataRoute.Sitemap[0] => {
  return {
    url: absoluteUrl(config.publicUrl, i18nConfig.defaultLocale, path),
    changeFrequency: 'daily',
    alternates: {
      languages: genLangAlternates(path),
    },
  };
};

/**
 * Sitemap entry for a locale-independent author profile. Unlike the daily
 * landing pages, profiles change infrequently.
 */
const authorPageMeta = (path: string): MetadataRoute.Sitemap[0] => {
  return {
    url: absoluteUrl(config.publicUrl, i18nConfig.defaultLocale, path),
    changeFrequency: 'weekly',
    alternates: {
      languages: genLangAlternates(path),
    },
  };
};

/**
 * Builds the `hreflang` alternates map for one article group, including
 * `x-default`. Extracted so the per-locale iteration is independently testable.
 */
const buildGroupLanguages = (group: ArticleListItem[]): Languages<string> => {
  const languages: Languages<string> = Object.fromEntries(
    group.map((item) => [
      item.lang,
      absoluteUrl(config.publicUrl, item.lang, `articles/${item.slug}`),
    ]),
  );

  const xDefault =
    group.find((item) => item.lang === i18nConfig.defaultLocale) ?? group[0];
  languages['x-default'] = absoluteUrl(
    config.publicUrl,
    xDefault.lang,
    `articles/${xDefault.slug}`,
  );

  return languages;
};

/** Maps one article group to its per-locale sitemap entries. */
const groupToSitemapEntries = (
  group: ArticleListItem[],
): MetadataRoute.Sitemap => {
  const languages = buildGroupLanguages(group);

  return group.map((item) => ({
    url: absoluteUrl(config.publicUrl, item.lang, `articles/${item.slug}`),
    lastModified: new Date(item.published_at),
    alternates: { languages },
  }));
};

/**
 * Groups localized articles by their canonical `article_group` so each logical
 * article is emitted once per locale with a complete `hreflang` alternates map
 * (including `x-default`), instead of isolated per-locale entries.
 */
const mapArticlesToSitemapEntries = (
  items: ArticleListItem[],
): MetadataRoute.Sitemap => {
  const groups = new Map<string, ArticleListItem[]>();

  for (const item of items) {
    if (!(i18nConfig.locales as readonly string[]).includes(item.lang)) {
      continue;
    }
    const group = groups.get(item.article_group) ?? [];
    group.push(item);
    groups.set(item.article_group, group);
  }

  return [...groups.values()].flatMap(groupToSitemapEntries);
};

async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const di = getDependencyContainer();
  const service = getArticleService(di);
  const articlesList = await service.listAll();
  const articles = mapArticlesToSitemapEntries(articlesList);

  // Author slugs are locale-independent, so each author is emitted once with a
  // complete `hreflang` alternates map (including `x-default`).
  const authorService = getAuthorService(di);
  const authorsList = await authorService.listAll();
  const authors = authorsList.map((author) =>
    authorPageMeta(`authors/${author.slug}`),
  );

  const commonPages = [
    '',
    'about',
    'achievements',
    'contact',
    'dilf',
    'donate',
    'flaim-a-phone',
    'hot-things',
    'only-spams',
    'plans',
    'privacy-policy',
    'settings',
    'terms-of-use',
    'virgin',
  ];

  const commonPagesEntries = commonPages.map((path) => commonPageMeta(path));

  return [...commonPagesEntries, ...articles, ...authors];
}

export default sitemap;
