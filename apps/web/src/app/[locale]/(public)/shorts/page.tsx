import type { Metadata } from 'next';
import { assertAppLocale } from '@/core/i18n/app-locale';
import { buildShortsMetadata } from './_lib/build-shorts-metadata';
import { renderShortsPage } from './_lib/render-shorts-page';

export { generateStaticParams } from '@/core/i18n/routing';

export const revalidate = 1800;

type PageProps = NextPageProps;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const appLocale = assertAppLocale(locale);

  return buildShortsMetadata({ locale: appLocale, page: 1 });
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  const appLocale = assertAppLocale(locale);

  return renderShortsPage({ locale: appLocale, page: 1 });
}
