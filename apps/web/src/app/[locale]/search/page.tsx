import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { SearchPage } from './search-page';

export { generateStaticParams } from '@/i18n/routing';
export const revalidate = 1800;

export async function generateMetadata({
  params,
}: NextPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.search' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function Page() {
  return <SearchPage />;
}
