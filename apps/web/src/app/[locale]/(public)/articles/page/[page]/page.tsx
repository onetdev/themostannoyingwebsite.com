import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { assertAppLocale } from '@/core/i18n/app-locale';
import { articlesPagination } from '../../_lib/articles-pagination';
import { buildArticlesMetadata } from '../../_lib/build-articles-metadata';
import { loadArticlesPage } from '../../_lib/load-articles-page';
import { renderArticlesPage } from '../../_lib/render-articles-page';

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
  const page = articlesPagination.parsePage(rawPage);

  if (page === undefined || page === 1) {
    return {};
  }

  const data = await loadArticlesPage({ locale: appLocale, page });

  if (!data) {
    return {};
  }

  return buildArticlesMetadata({ locale: appLocale, page });
}

export default async function Page({ params }: PageProps) {
  const { page: rawPage, locale } = await params;
  const appLocale = assertAppLocale(locale);
  const page = articlesPagination.parsePage(rawPage);

  if (page === undefined) {
    return notFound();
  }

  if (page === 1) {
    return permanentRedirect(`/${appLocale}/articles/`);
  }

  return renderArticlesPage({ locale: appLocale, page });
}
