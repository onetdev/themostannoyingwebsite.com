import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { DebugPage } from '@/features/monitoring/components';

export async function generateMetadata({
  params,
}: NextPageProps): Promise<Metadata> {
  const { locale } = await params;
  const _t = await getTranslations({ locale, namespace: 'metadata.about' });

  return {
    title: 'Debugger',
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function Page() {
  return <DebugPage />;
}
