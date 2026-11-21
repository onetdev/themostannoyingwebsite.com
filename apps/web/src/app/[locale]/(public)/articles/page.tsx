import type { Metadata } from 'next';
import { assertAppLocale } from '@/core/i18n/app-locale';
import { buildArticlesMetadata } from './_lib/build-articles-metadata';
import { loadArticlesPage } from './_lib/load-articles-page';
import { renderArticlesPage } from './_lib/render-articles-page';

export { generateStaticParams } from '@/core/i18n/routing';

export const revalidate = 1800;

type PageProps = NextPageProps;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const appLocale = assertAppLocale(locale);
  const data = await loadArticlesPage({ locale: appLocale, page: 1 });

  if (!data) {
    return {};
  }

  return buildArticlesMetadata({ locale: appLocale, page: 1 });
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  const appLocale = assertAppLocale(locale);

  return renderArticlesPage({ locale: appLocale, page: 1 });
}
