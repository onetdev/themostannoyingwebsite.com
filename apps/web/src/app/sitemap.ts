import type { ArticleListItem } from '@maw/content-sdk';
import type { MetadataRoute } from 'next';
import type { Languages } from 'next/dist/lib/metadata/types/alternative-urls-types';

import './bootstrap/di';
import { getDependencyContainer } from '@/core/di';
import { absoluteUrl } from '@/core/seo/absolute-url';
import { getArticleService } from '@/features/content/services';
import i18nConfig from '@/root/i18n.config';
import { getAppConfigService } from '@/services';

const config = getAppConfigService().getDeploymentMeta();

const genLangAlternates = (
  path: string,
  currentLocale: string,
): Languages<string> => {
  const items = i18nConfig.locales
    .filter((lang) => lang !== currentLocale)
    .map((lang) => [lang, absoluteUrl(config.publicUrl, lang, path)]);

  return Object.fromEntries(items);
};

const commonPageMeta = (
  path: string,
  locale: string,
): MetadataRoute.Sitemap[0] => {
  return {
    url: absoluteUrl(config.publicUrl, locale, path),
    lastModified: new Date(),
    changeFrequency: 'daily',
    alternates: {
      languages: genLangAlternates(path, locale),
    },
  };
};

const mapArticleToSitemapEntry = (item: ArticleListItem) => {
  return {
    url: absoluteUrl(config.publicUrl, item.lang, `articles/${item.slug}`),
    lastModified: new Date(item.published_at),
  } satisfies MetadataRoute.Sitemap[0];
};

async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const di = getDependencyContainer();
  const service = await getArticleService(di);
  const articlesList = await service.listAll();
  const articles = articlesList
    .filter((item) =>
      (i18nConfig.locales as readonly string[]).includes(item.lang),
    )
    .map(mapArticleToSitemapEntry);

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

  const commonPagesEntries = i18nConfig.locales.flatMap((locale) =>
    commonPages.map((path) => commonPageMeta(path, locale)),
  );

  return [...commonPagesEntries, ...articles];
}

export default sitemap;
