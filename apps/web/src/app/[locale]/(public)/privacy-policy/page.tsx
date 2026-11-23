import { renderMarkdown } from '@maw/content-sdk';
import HTMLReactParser from 'html-react-parser';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getFormatter, getTranslations } from 'next-intl/server';
import { assertAppLocale } from '@/core/i18n/app-locale';
import { WebPageStructuredData } from '@/core/seo';
import { ShareButton } from '@/features/share/components';
import { DocumentPage } from '../_components/DocumentPage';
import { PageLayout } from '../_components/PageLayout';
import { TranslationDisclaimer } from '../_components/TranslationDisclaimer';
import { loadPrivacyPolicyPage } from './_lib/load-privacy-policy';

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

// Privacy policy content is served by the Content API pages endpoint.
export default async function Page({ params }: NextPageProps) {
  const { locale } = await params;
  const appLocale = assertAppLocale(locale);
  const t = await getTranslations();
  const formatter = await getFormatter();
  const page = await loadPrivacyPolicyPage(appLocale);

  if (!page) {
    notFound();
  }

  return (
    <PageLayout route="privacy-policy" role="main">
      <WebPageStructuredData
        locale={appLocale}
        path="privacy-policy"
        namespace="metadata.privacyPolicy"
      />
      <DocumentPage
        title={page.title}
        headerActions={<ShareButton section="content:document" />}
        meta={
          <time dateTime={page.updated_at}>
            {t('common.document.lastUpdated', {
              date: formatter.dateTime(new Date(page.updated_at), {
                dateStyle: 'long',
              }),
            })}
          </time>
        }
      >
        <TranslationDisclaimer
          currentLocale={appLocale}
          href="/privacy-policy"
        />
        {HTMLReactParser(renderMarkdown(page.content))}
      </DocumentPage>
    </PageLayout>
  );
}
