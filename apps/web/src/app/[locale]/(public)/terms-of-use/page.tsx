import { getLogger } from '@maw/logger';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getFormatter, getTranslations } from 'next-intl/server';
import { loadLocaleMdx } from '@/core/i18n/load-locale-mdx';
import { WebPageStructuredData } from '@/core/seo';
import { DocumentPage } from '../_components/DocumentPage';
import { PageLayout } from '../_components/PageLayout';
import { TranslationDisclaimer } from '../_components/TranslationDisclaimer';

export { generateStaticParams } from '@/core/i18n/routing';

export const revalidate = 1800;

/**
 * Canonical revision date of the terms. Kept in code (rather than the MDX) so
 * the value is locale-independent and can be formatted per locale.
 */
const TERMS_LAST_UPDATED = '2026-03-09T07:23:39Z';

export async function generateMetadata({
  params,
}: NextPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: 'metadata.termsOfUse',
  });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function Page({ params }: NextPageProps) {
  const { locale } = await params;
  const t = await getTranslations();
  const formatter = await getFormatter();
  const logger = getLogger();

  try {
    const Content = await loadLocaleMdx(
      locale,
      (l) => import(`./_i18n/${l}.mdx`),
    );

    return (
      <PageLayout route="terms-of-use" role="main">
        <WebPageStructuredData
          locale={locale}
          path="terms-of-use"
          namespace="metadata.termsOfUse"
        />
        <DocumentPage
          title={t('common.navigation.termsOfUse')}
          meta={
            <time dateTime={TERMS_LAST_UPDATED}>
              {t('common.document.lastUpdated', {
                date: formatter.dateTime(new Date(TERMS_LAST_UPDATED), {
                  dateStyle: 'long',
                }),
              })}
            </time>
          }
        >
          <TranslationDisclaimer currentLocale={locale} href="/terms-of-use" />
          <Content />
        </DocumentPage>
      </PageLayout>
    );
  } catch (_err) {
    logger.debug('Terms of use, redirecting to 404', _err);
    notFound();
  }
}
