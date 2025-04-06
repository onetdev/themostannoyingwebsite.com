import type { MetadataRoute } from 'next';
import { Languages } from 'next/dist/lib/metadata/types/alternative-urls-types';

import config from '@/root/apps/web/src/config';
import { ArticleIndexEntrySchema } from '@/root/packages/content-api/src/schemas/article-index-entry';
import articlesRaw from '@/root/apps/web/public/assets/articles/index.json';
import i18nConfig from '@/root/apps/web/i18n.config';

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

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = articlesRaw.map((article: ArticleIndexEntrySchema) => {
    const prefix =
      article.locale === i18nConfig.defaultLocale
        ? `${config.publicUrl}`
        : `${config.publicUrl}/${article.locale}`;

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
