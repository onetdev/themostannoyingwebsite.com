export interface ResultMetadata {
  timestamp: string;
  requestId?: string;
}

export interface ResultError<TCode = string> {
  message: string;
  code?: TCode;
  details?: Record<string, unknown>;
}

export type Result<TData = unknown, TCode = string> =
  | {
      success: true;
      data: TData;
      metadata: ResultMetadata;
    }
  | {
      success: false;
      error: ResultError<TCode>;
      metadata: ResultMetadata;
    };

export type ResultOk<TData = unknown, TError = string> = Extract<
  Result<TData, TError>,
  { success: true }
>;
export type ResultErr<TData = unknown, TError = string> = Extract<
  Result<TData, TError>,
  { success: false }
>;

function createMetadata(metadata?: Partial<ResultMetadata>): ResultMetadata {
  return {
    timestamp: new Date().toISOString(),
    ...metadata,
  };
}

export function ok<TData, TCode = string>(
  data: TData,
  metadata?: Partial<ResultMetadata>,
): Result<TData, TCode> {
  return {
    success: true,
    data,
    metadata: createMetadata(metadata),
  };
}

export function err<TData, TCode = string>(
  params: {
    message: string;
    code?: TCode;
    details?: Record<string, unknown>;
  },
  metadata?: Partial<ResultMetadata>,
): Result<TData, TCode> {
  return {
    success: false,
    error: {
      message: params.message,
      code: params.code,
      details: params.details,
    },
    metadata: createMetadata(metadata),
  };
}

/**
 * Runtime check and type narrow function for unknown objects of Result
 */
export function isOk<TData, TError>(
  result: Result<TData, TError> | unknown,
): result is ResultOk<TData, TError> {
  return (
    typeof result === 'object' &&
    result !== null &&
    'success' in result &&
    result.success === true &&
    'data' in result &&
    'metadata' in result
  );
}

/**
 * Runtime check and type narrow function for unknown objects of Result
 */
export function isErr<TData, TError>(
  result: Result<TData, TError> | unknown,
): result is ResultErr<TData, TError> {
  return (
    typeof result === 'object' &&
    result !== null &&
    'success' in result &&
    result.success === false &&
    'error' in result &&
    'metadata' in result
  );
}
