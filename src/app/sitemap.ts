import type { MetadataRoute } from 'next';
import { Languages } from 'next/dist/lib/metadata/types/alternative-urls-types';

import config from '@/config';
import { ArticleIndexEntrySchema } from '@/lib/schemas/article-index-entry';
import articlesRaw from '@/public/assets/articles/index.json';
import i18nConfig from '@/root/next-i18next.config';

const extraLangs = i18nConfig.i18n.locales.filter(
  (lang) => lang !== i18nConfig.i18n.defaultLocale,
);
const genLangAlternates = (path: string): Languages<string> => {
  const items = extraLangs.map((lang) => [
    lang,
    `${config.url}/${lang}/${path}`,
  ]);

  return Object.fromEntries(items);
};

const commonPageMeta = (path: string): MetadataRoute.Sitemap[0] => ({
  url: `${config.url}/${path}`,
  lastModified: new Date(),
  changeFrequency: 'daily',
  alternates: {
    languages: genLangAlternates(path),
  },
});

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = articlesRaw.map((article: ArticleIndexEntrySchema) => {
    const prefix =
      article.locale === i18nConfig.i18n.defaultLocale
        ? `${config.url}`
        : `${config.url}/${article.locale}`;

    return {
      url: `${prefix}/articles/${article.slug}`,
      lastModified: new Date(article.updatedAt || article.publishedAt),
    } satisfies MetadataRoute.Sitemap[0];
  });

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
