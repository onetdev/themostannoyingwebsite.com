import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { assertAppLocale } from '@/core/i18n/app-locale';
import { buildShortsMetadata } from '../../_lib/build-shorts-metadata';
import { loadShortsPage } from '../../_lib/load-shorts-page';
import { renderShortsPage } from '../../_lib/render-shorts-page';
import { shortsPagination } from '../../_lib/shorts-pagination';

export const revalidate = 1800;

type PageParams = {
  page: string;
  locale: string;
};

type PageProps = NextPageProps<PageParams>;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { page: rawPage, locale } = await params;
  const appLocale = assertAppLocale(locale);
  const page = shortsPagination.parsePage(rawPage);

  if (page === undefined || page === 1) {
    return {};
  }

  const data = await loadShortsPage(appLocale, page);

  if (!data) {
    return {};
  }

  return buildShortsMetadata({ locale: appLocale, page });
}

export default async function Page({ params }: PageProps) {
  const { page: rawPage, locale } = await params;
  const appLocale = assertAppLocale(locale);
  const page = shortsPagination.parsePage(rawPage);

  if (page === undefined) {
    return notFound();
  }

  if (page === 1) {
    return permanentRedirect(`/${appLocale}/shorts/`);
  }

  return renderShortsPage({ locale: appLocale, page });
}
