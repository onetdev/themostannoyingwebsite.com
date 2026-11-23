import type { LanguageCode } from '@maw/content-sdk';
import type { Metadata } from 'next';
import { getDependencyContainer } from '@/core/di';
import { assertAppLocale } from '@/core/i18n/app-locale';
import { JsonLd } from '@/core/seo';
import { ShortsPage } from '@/features/content/components';
import { getShortService } from '@/features/content/services';
import { PageLayout } from '../_components/PageLayout';
import { buildShortsJsonLd } from './_lib/build-shorts-json-ld';
import { buildShortsMetadata } from './_lib/build-shorts-metadata';

export { generateStaticParams } from '@/core/i18n/routing';

export const revalidate = 1800;

type PageProps = NextPageProps;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const appLocale = assertAppLocale(locale);

  return buildShortsMetadata(appLocale);
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  const appLocale = assertAppLocale(locale);
  const shortService = getShortService(getDependencyContainer());
  const shorts = await shortService.listAll({
    lang: appLocale as LanguageCode,
    order: 'desc',
  });
  const jsonLd = await buildShortsJsonLd({ locale: appLocale, shorts });

  return (
    <PageLayout route="shorts" role="main">
      <JsonLd data={jsonLd} />
      <ShortsPage shorts={shorts} />
    </PageLayout>
  );
}
