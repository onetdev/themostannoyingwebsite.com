import type { Metadata } from 'next';
import { UnsubscribePage } from '@/features/subscription/components';
import { PageLayout } from '../../_components/PageLayout';

export { generateStaticParams } from '@/core/i18n/routing';

export async function generateMetadata({
  params,
}: NextPageProps): Promise<Metadata> {
  await params;
  // Fallback to plans metadata or something generic for now
  // const t = await getTranslations({ locale, namespace: 'metadata.unsubscribe' });

  return {
    title: 'Unsubscribe',
    description: 'We are sorry to see you stay.',
  };
}

export default async function Page() {
  return (
    <PageLayout activeItem="plans" role="main">
      <UnsubscribePage />
    </PageLayout>
  );
}
