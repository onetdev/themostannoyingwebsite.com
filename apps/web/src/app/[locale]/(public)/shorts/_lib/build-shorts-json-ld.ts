import type { ShortListItem } from '@maw/content-sdk';
import { getTranslations } from 'next-intl/server';
import {
  buildSimpleItemList,
  buildWebPage,
  getSeoContext,
  type JsonLdNode,
} from '@/core/seo';

export interface BuildShortsJsonLdInput {
  locale: AppLocale;
  shorts: ShortListItem[];
}

/**
 * Describes the shorts archive as a CollectionPage with an ItemList covering
 * every localized clip.
 */
export async function buildShortsJsonLd({
  locale,
  shorts,
}: BuildShortsJsonLdInput): Promise<JsonLdNode[]> {
  const [seoContext, t, navigation] = await Promise.all([
    getSeoContext(locale),
    getTranslations({ locale, namespace: 'metadata.shorts' }),
    getTranslations({ locale, namespace: 'common.navigation' }),
  ]);
  const path = 'shorts';

  const webPage = buildWebPage({
    ...seoContext,
    path,
    name: t('title'),
    description: t('description'),
    type: 'CollectionPage',
    breadcrumbs: [
      { name: navigation('home'), path: '' },
      { name: t('title'), path },
    ],
  });

  const itemList = buildSimpleItemList({
    ...seoContext,
    path,
    name: t('title'),
    description: t('description'),
    items: shorts.map((short) => ({
      name: short.title,
      path: `shorts/${short.slug}`,
    })),
  });

  return [webPage, itemList];
}
