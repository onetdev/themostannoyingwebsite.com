'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';
import { ErrorFallback } from '@/core/react';

export default function BareboneErrorPage({
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
    <main className="container mx-auto px-4">
      <ErrorFallback size="lg" onRetry={reset} error={error} showHome={true} />
    </main>
  );
}
