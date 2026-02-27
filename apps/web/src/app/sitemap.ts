import type { ArticleDatum } from '@maw/content-api';
import type { MetadataRoute } from 'next';
import type { Languages } from 'next/dist/lib/metadata/types/alternative-urls-types';

import { getDependencyContainer } from '@/dependency-container';
import { getAppArticleService } from '@/features/content/services';
import i18nConfig from '@/root/i18n.config';
import { getAppConfigService } from '@/services';

const config = getAppConfigService().getDeploymentMeta();

const genLangAlternates = (
  path: string,
  currentLocale: string,
): Languages<string> => {
  const items = i18nConfig.locales
    .filter((lang) => lang !== currentLocale)
    .map((lang) => {
      const normalizedPath = path ? `/${path}` : '';
      return [lang, `${config.publicUrl}/${lang}${normalizedPath}/`];
    });

  return Object.fromEntries(items);
};

const commonPageMeta = (
  path: string,
  locale: string,
): MetadataRoute.Sitemap[0] => {
  const normalizedPath = path ? `/${path}` : '';

  return {
    url: `${config.publicUrl}/${locale}${normalizedPath}/`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    alternates: {
      languages: genLangAlternates(path, locale),
    },
  };
};

const mapArticleToSitemapEntry = (item: ArticleDatum) => {
  return {
    url: `${config.publicUrl}/${item.locale}/articles/${item.slug}/`,
    lastModified: new Date(item.updatedAt || item.publishedAt),
  } satisfies MetadataRoute.Sitemap[0];
};

async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const di = getDependencyContainer();
  const articleResults = await getAppArticleService(di).getMany({
    params: {},
    paginate: { take: -1, skip: 0 },
  });
  const articles = articleResults.items.map(mapArticleToSitemapEntry);

  const commonPages = [
    '',
    'about',
    'achievements',
    'contact',
    'dilf',
    'donate',
    'flaim-a-phone',
    'hot-things',
    'plans',
    'privacy-policy',
    'search',
    'settings',
    'virgin',
    'user/login',
    'user/password-reminder',
    'user/signup',
  ];

  const commonPagesEntries = i18nConfig.locales.flatMap((locale) =>
    commonPages.map((path) => commonPageMeta(path, locale)),
  );

  return [...commonPagesEntries, ...articles];
}

export default sitemap;
