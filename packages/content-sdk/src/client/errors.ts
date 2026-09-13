import type { z } from 'zod';

export class ContentApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly error: string;
  readonly details?: string;
  readonly raw?: unknown;

  constructor(
    status: number,
    code: string,
    error: string,
    details?: string,
    raw?: unknown,
  ) {
    super(details || error || `Content API error (${status})`);
    this.name = 'ContentApiError';
    this.status = status;
    this.code = code;
    this.error = error;
    this.details = details;
    this.raw = raw;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class ContentApiNotFoundError extends ContentApiError {
  constructor(error = 'Resource not found', details?: string, raw?: unknown) {
    super(404, 'NOT_FOUND', error, details, raw);
    this.name = 'ContentApiNotFoundError';
  }
}

export class ContentApiValidationError extends ContentApiError {
  readonly zodIssues?: z.ZodIssue[];

  constructor(
    error = 'Validation failed',
    details?: string,
    raw?: unknown,
    zodIssues?: z.ZodIssue[],
  ) {
    super(400, 'VALIDATION_ERROR', error, details, raw);
    this.name = 'ContentApiValidationError';
    this.zodIssues = zodIssues;
  }
}

export class ContentApiCorsError extends ContentApiError {
  constructor(error = 'CORS origin denied', details?: string, raw?: unknown) {
    super(403, 'CORS_ORIGIN_DENIED', error, details, raw);
    this.name = 'ContentApiCorsError';
  }
}

export class ContentApiServerError extends ContentApiError {
  constructor(
    status = 500,
    error = 'Internal server error',
    details?: string,
    raw?: unknown,
  ) {
    super(status, 'INTERNAL_SERVER_ERROR', error, details, raw);
    this.name = 'ContentApiServerError';
  }
}

export class ContentApiNetworkError extends ContentApiError {
  constructor(originalError: Error) {
    super(0, 'NETWORK_ERROR', originalError.message, undefined, originalError);
    this.name = 'ContentApiNetworkError';
  }
}
