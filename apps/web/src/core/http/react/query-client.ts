import { isErr } from '@maw/utils/result';
import { QueryClient } from '@tanstack/react-query';
import { QueryError } from './QueryError';

const NO_RETRY_CODES = ['HTTP_401', 'HTTP_403', 'HTTP_404', 'HTTP_422'];

export function getQueryClient() {
  return new QueryClient({
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
