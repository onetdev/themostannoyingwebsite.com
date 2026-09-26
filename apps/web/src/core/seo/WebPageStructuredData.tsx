import { getTranslations } from 'next-intl/server';
import type { WebPageSchemaType } from './builders';
import { buildWebPage } from './builders';
import { getSeoContext } from './context';
import { JsonLd } from './JsonLd';

/**
 * Metadata namespaces that describe a plain informational page. Each of these
 * exposes `title` and `description`.
 */
export type WebPageMetadataNamespace =
  | 'metadata.about'
  | 'metadata.achievements'
  | 'metadata.contact'
  | 'metadata.dilf'
  | 'metadata.donate'
  | 'metadata.hotThings'
  | 'metadata.onlySpams'
  | 'metadata.privacyPolicy'
  | 'metadata.settings'
  | 'metadata.termsOfUse'
  | 'metadata.virgin'
  | 'metadata.wanPhone';

export interface WebPageStructuredDataProps {
  locale: AppLocale;
  /** Root-relative route path, e.g. `about`. */
  path: string;
  namespace: WebPageMetadataNamespace;
  type?: WebPageSchemaType;
  /** Absolute or root-relative primary image URL. */
  image?: string;
}

/**
 * Server component that emits `WebPage` structured data for a static page,
 * resolving its name/description from the metadata translations.
 */
export async function WebPageStructuredData({
  locale,
  path,
  namespace,
  type,
  image,
}: WebPageStructuredDataProps) {
  const [context, t, navigation] = await Promise.all([
    getSeoContext(locale),
    getTranslations({ locale, namespace }),
    getTranslations({ locale, namespace: 'navigation' }),
  ]);

  const name = t('title');

  const data = buildWebPage({
    ...context,
    path,
    type,
    name,
    description: t('description'),
    image,
    breadcrumbs: [
      { name: navigation('home'), path: '' },
      { name, path },
    ],
  });

  return <JsonLd data={data} />;
}
