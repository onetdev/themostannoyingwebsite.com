import { getLogger } from '@maw/logger';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { loadLocaleMdx } from '@/core/i18n/load-locale-mdx';
import { WebPageStructuredData } from '@/core/seo';
import { ShareButton } from '@/features/share/components';
import { DocumentPage } from '../_components/DocumentPage';
import { PageLayout } from '../_components/PageLayout';
import { TranslationDisclaimer } from '../_components/TranslationDisclaimer';

export { generateStaticParams } from '@/core/i18n/routing';

export const revalidate = 1800;

export async function generateMetadata({
  params,
}: NextPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: 'metadata.privacyPolicy',
  });

  return {
    title: t('title'),
    description: t('description'),
  };
}

// Privacy policy inspired by https://matomo.org/privacy-policy/
export default async function Page({ params }: NextPageProps) {
  const { locale } = await params;
  const t = await getTranslations();
  const logger = getLogger();

  try {
    const Content = await loadLocaleMdx(
      locale,
      (l) => import(`./_i18n/${l}.mdx`),
    );

    return (
      <PageLayout route="privacy-policy" role="main">
        <WebPageStructuredData
          locale={locale}
          path="privacy-policy"
          namespace="metadata.privacyPolicy"
        />
        <DocumentPage
          title={t('common.navigation.privacyPolicy')}
          headerActions={<ShareButton section="content:document" />}
        >
          <TranslationDisclaimer
            currentLocale={locale}
            href="/privacy-policy"
          />
          <Content />
        </DocumentPage>
      </PageLayout>
    );
  } catch (_err) {
    logger.debug('Privacy policy not found, redirecting to 404', _err);
    notFound();
  }
}
