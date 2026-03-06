import type { Metadata } from 'next';
import { DebugPage } from '@/features/monitoring/components';

export async function generateMetadata(): Promise<Metadata> {
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
