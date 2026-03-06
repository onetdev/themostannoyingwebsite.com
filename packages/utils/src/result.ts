export interface Result<T1 = unknown, T2 = string> {
  success: boolean;
  data?: T1;
  error?: {
    message: string;
    code?: T2;
    details?: Record<string, unknown>;
  };
  metadata?: {
    timestamp: string;
    requestId?: string;
  };
}

export interface PromiseResult<T1 = unknown, T2 = string>
  extends Promise<Result<T1, T2>> {}

export const createSuccessResult = <T1, T2 = string>(
  data: T1,
  metadata?: Result<T1, T2>['metadata'],
): Result<T1, T2> => ({
  success: true,
  data,
  metadata: {
    timestamp: new Date().toISOString(),
    ...metadata,
  },
});

export const createErrorResult = <T1, T2 = string>({
  message,
  code,
  details,
  metadata,
}: {
  message: string;
  code?: T2;
  details?: Record<string, unknown>;
  metadata?: Result<T1, T2>['metadata'];
}): Result<T1, T2> => ({
  success: false,
  error: {
    message,
    code,
    details,
  },
  metadata: {
    timestamp: new Date().toISOString(),
    ...metadata,
  },
});
