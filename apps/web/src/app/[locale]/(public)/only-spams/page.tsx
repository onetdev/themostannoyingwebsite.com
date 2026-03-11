import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getDependencyContainer } from '@/core/di';
import { OnlySpamsPage } from '@/features/marketing/components';
import { getOnlySpamsService } from '@/features/marketing/services';
import { PageLayout } from '../_components/PageLayout';

export { generateStaticParams } from '@/i18n/routing';

export const revalidate = 1800;

export async function generateMetadata({
  params,
}: NextPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.onlySpams' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function Page({ params }: NextPageProps) {
  const { locale } = await params;
  const container = getDependencyContainer();
  const service = await getOnlySpamsService(container);
  const { testimonials, samples } = await service.getData(locale);

  return (
    <PageLayout activeItem="only-spams" role="main" autoPadding={false}>
      <OnlySpamsPage testimonials={testimonials} samples={samples} />
    </PageLayout>
  );
}
