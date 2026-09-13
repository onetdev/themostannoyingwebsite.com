import ky, { HTTPError, type KyInstance } from 'ky';
import type { ZodType } from 'zod';
import {
  ContentApiCorsError,
  ContentApiError,
  ContentApiNetworkError,
  ContentApiNotFoundError,
  ContentApiServerError,
  ContentApiValidationError,
} from './errors';
import {
  type ContentClientOptions,
  DEFAULT_BASE_URL,
  DEFAULT_TIMEOUT_MS,
  type RequestOptions,
} from './types';

export class HttpTransport {
  private readonly kyInstance: KyInstance;
  private readonly validateResponses: boolean;

  constructor(options?: ContentClientOptions) {
    this.validateResponses = options?.validateResponses ?? true;

    const rawBaseUrl = options?.baseUrl ?? DEFAULT_BASE_URL;
    // Ensure baseUrl doesn't have trailing slash so prefixUrl behaves predictably
    const prefixUrl = stripTrailingSlashes(rawBaseUrl);

    this.kyInstance = ky.create({
      prefixUrl,
      timeout: options?.timeoutMs ?? DEFAULT_TIMEOUT_MS,
      retry: options?.retry ?? {
        limit: 2,
        statusCodes: [408, 413, 429, 500, 502, 503, 504],
      },
      headers: {
        Accept: 'application/json',
        ...options?.headers,
      },
      fetch: options?.fetch,
    });
  }

  public async get<T>(
    path: string,
    query?: Record<string, unknown>,
    schema?: ZodType<T>,
    options?: RequestOptions,
  ): Promise<T> {
    // Ky prefixUrl disallows leading slashes in path
    const cleanPath = stripLeadingSlashes(path);
    const searchParams = query ? cleanQueryParams(query) : undefined;
    const { timeoutMs, ...kyOptions } = options ?? {};

    try {
      const response = await this.kyInstance.get(cleanPath, {
        searchParams,
        timeout: timeoutMs,
        ...kyOptions,
      });

      const data = await response.json();

      if (this.validateResponses && schema) {
        const parsed = schema.safeParse(data);
        if (!parsed.success) {
          throw new ContentApiValidationError(
            'API response validation failed',
            parsed.error.message,
            data,
            parsed.error.issues,
          );
        }
        return parsed.data;
      }

      return data as T;
    } catch (error) {
      if (error instanceof ContentApiError) {
        throw error;
      }
      throw await this.handleError(error);
    }
  }

  private async handleError(error: unknown): Promise<ContentApiError> {
    if (error instanceof HTTPError) {
      const { response } = error;
      try {
        const body = (await response.json()) as Record<string, unknown> | null;
        const message =
          typeof body?.message === 'string' ? body.message : undefined;
        const errorText =
          typeof body?.error === 'string' ? body.error : response.statusText;
        const code = typeof body?.code === 'string' ? body.code : undefined;

        if (response.status === 404 || code === 'NOT_FOUND') {
          return new ContentApiNotFoundError(errorText, message, body);
        }
        if (response.status === 400 || code === 'VALIDATION_ERROR') {
          return new ContentApiValidationError(errorText, message, body);
        }
        if (response.status === 403 || code === 'CORS_ORIGIN_DENIED') {
          return new ContentApiCorsError(errorText, message, body);
        }
        if (response.status >= 500 || code === 'INTERNAL_SERVER_ERROR') {
          return new ContentApiServerError(
            response.status,
            errorText,
            message,
            body,
          );
        }

        return new ContentApiError(
          response.status,
          code ?? 'HTTP_ERROR',
          errorText,
          message,
          body,
        );
      } catch {
        return new ContentApiError(
          response.status,
          'HTTP_ERROR',
          response.statusText || error.message,
        );
      }
    }

    if (error instanceof Error) {
      return new ContentApiNetworkError(error);
    }

    return new ContentApiError(0, 'UNKNOWN_ERROR', String(error));
  }
}

function cleanQueryParams(
  query: Record<string, unknown>,
): Record<string, string | number | boolean> {
  const result: Record<string, string | number | boolean> = {};

  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null) {
      continue;
    }
    if (
      typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'boolean'
    ) {
      result[key] = value;
    } else {
      result[key] = String(value);
    }
  }

  return result;
}

function stripTrailingSlashes(str: string): string {
  let end = str.length;
  while (end > 0 && str.charCodeAt(end - 1) === 47 /* '/' */) {
    end--;
  }
  return str.slice(0, end);
}

function stripLeadingSlashes(str: string): string {
  let start = 0;
  while (start < str.length && str.charCodeAt(start) === 47 /* '/' */) {
    start++;
  }
  return str.slice(start);
}
