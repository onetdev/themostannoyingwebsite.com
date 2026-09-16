'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';
import { ErrorFallback } from '@/core/react';
import { PageLayout } from './_components/PageLayout';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <PageLayout role="main">
      <ErrorFallback size="lg" onRetry={reset} error={error} showHome={true} />
    </PageLayout>
  );
}
