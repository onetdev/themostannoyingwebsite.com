import type { MetadataRoute } from 'next';
import { Languages } from 'next/dist/lib/metadata/types/alternative-urls-types';

import config from '@/config';
import { ArticleDatum, ArticleService } from '@maw/content-api';
import i18nConfig from '@/root/i18n.config';

const extraLangs = i18nConfig.locales.filter(
  (lang) => lang !== i18nConfig.defaultLocale,
);
const genLangAlternates = (path: string): Languages<string> => {
  const items = extraLangs.map((lang) => [
    lang,
    `${config.publicUrl}/${lang}/${path}`,
  ]);

  return Object.fromEntries(items);
};

const commonPageMeta = (path: string): MetadataRoute.Sitemap[0] => ({
  url: `${config.publicUrl}/${path}`,
  lastModified: new Date(),
  changeFrequency: 'daily',
  alternates: {
    languages: genLangAlternates(path),
  },
});

const mapArticleToSitemapEntry = (item: ArticleDatum) => {
  const prefix =
  item.locale === i18nConfig.defaultLocale
        ? `${config.publicUrl}`
        : `${config.publicUrl}/${item.locale}`;

    return {
      url: `${prefix}/articles/${item.slug}`,
      lastModified: new Date(item.updatedAt || item.publishedAt),
    } satisfies MetadataRoute.Sitemap[0];
}

async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articleResults = await ArticleService.getMany({ params: {}, paginate: { take: -1, skip: 0 } });
  const articles = articleResults.items.map(mapArticleToSitemapEntry);

  return [
    commonPageMeta(''),
    commonPageMeta('about'),
    commonPageMeta('contact'),
    commonPageMeta('dilf'),
    commonPageMeta('donate'),
    commonPageMeta('flaim-a-phone'),
    commonPageMeta('hot-things'),
    commonPageMeta('privacy-policy'),
    commonPageMeta('search'),
    commonPageMeta('settings'),
    commonPageMeta('virgin'),
    commonPageMeta('user/login'),
    commonPageMeta('user/password-reminder'),
    commonPageMeta('user/registration'),
    ...articles,
  ];
}

export default sitemap;
