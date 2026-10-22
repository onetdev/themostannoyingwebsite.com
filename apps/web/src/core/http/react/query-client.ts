import { isErr } from '@maw/utils/result';
import { QueryCache, QueryClient } from '@tanstack/react-query';
import { scrubMessage, track } from '@/core/telemetry';
import { QueryError } from './QueryError';

const NO_RETRY_CODES = ['HTTP_401', 'HTTP_403', 'HTTP_404', 'HTTP_422'];
const MAX_QUERY_KEY_PARTS = 4;

function describeQueryKey(queryKey: readonly unknown[]): string {
  return queryKey
    .slice(0, MAX_QUERY_KEY_PARTS)
    .map((part) =>
      typeof part === 'string' || typeof part === 'number'
        ? String(part)
        : typeof part,
    )
    .join(':');
}

function readErrorCode(error: unknown): string {
  if (error instanceof QueryError) {
    return error.originalResult.error.code ?? 'QUERY_ERROR';
  }
  return 'UNKNOWN';
}

export function getQueryClient() {
  return new QueryClient({
    queryCache: new QueryCache({
      onError: (error, query) => {
        track('error.query', {
          queryKey: describeQueryKey(query.queryKey),
          code: readErrorCode(error),
          message: scrubMessage(
            error instanceof Error ? error.message : String(error),
          ),
        });
      },
    }),
    defaultOptions: {
      queries: {
        retry: (failureCount, error) => {
          if (failureCount >= 3) return false;

          if (error instanceof QueryError && isErr(error.originalResult)) {
            const code = error.originalResult.error.code;
            if (code && NO_RETRY_CODES.includes(code)) {
              return false; // Do not retry these specific client errors
            }
          }

          return true; // Go ahead and retry network errors or 5xx server errors
        },
      },
    },
  });
}
