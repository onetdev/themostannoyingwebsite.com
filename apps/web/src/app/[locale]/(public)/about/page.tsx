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
  const t = await getTranslations({ locale, namespace: 'metadata.about' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function Page({ params }: NextPageProps) {
  const { locale } = await params;
  const t = await getTranslations();

  try {
    const Content = await loadLocaleMdx(
      locale,
      (l) => import(`./_i18n/${l}.mdx`),
    );
    return (
      <PageLayout route="about" role="main">
        <WebPageStructuredData
          locale={locale}
          path="about"
          namespace="metadata.about"
          type="AboutPage"
        />
        <DocumentPage
          title={t('common.navigation.about')}
          headerActions={<ShareButton />}
        >
          <TranslationDisclaimer currentLocale={locale} href="/about" />
          <Content />
        </DocumentPage>
      </PageLayout>
    );
  } catch (_err) {
    return notFound();
  }
}
