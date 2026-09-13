import { jest } from '@jest/globals';
import {
  ContentApiClient,
  ContentApiCorsError,
  ContentApiError,
  ContentApiNetworkError,
  ContentApiNotFoundError,
  ContentApiServerError,
  ContentApiValidationError,
} from '../src/index.js';

describe('Content API Errors', () => {
  describe('Error Classes', () => {
    it('initializes ContentApiError with status and code', () => {
      const err = new ContentApiError(
        418,
        'IM_A_TEAPOT',
        'Short and stout',
        'Extra info',
        { foo: 'bar' },
      );
      expect(err).toBeInstanceOf(Error);
      expect(err).toBeInstanceOf(ContentApiError);
      expect(err.name).toBe('ContentApiError');
      expect(err.status).toBe(418);
      expect(err.code).toBe('IM_A_TEAPOT');
      expect(err.error).toBe('Short and stout');
      expect(err.details).toBe('Extra info');
      expect(err.message).toBe('Extra info');
      expect(err.raw).toEqual({ foo: 'bar' });
    });

    it('initializes ContentApiNotFoundError', () => {
      const err = new ContentApiNotFoundError('Not found', 'Detail');
      expect(err).toBeInstanceOf(ContentApiError);
      expect(err).toBeInstanceOf(ContentApiNotFoundError);
      expect(err.status).toBe(404);
      expect(err.code).toBe('NOT_FOUND');
    });

    it('initializes ContentApiValidationError', () => {
      const err = new ContentApiValidationError('Invalid', 'Detail');
      expect(err).toBeInstanceOf(ContentApiError);
      expect(err).toBeInstanceOf(ContentApiValidationError);
      expect(err.status).toBe(400);
      expect(err.code).toBe('VALIDATION_ERROR');
    });

    it('initializes ContentApiCorsError', () => {
      const err = new ContentApiCorsError('Denied', 'Origin');
      expect(err).toBeInstanceOf(ContentApiError);
      expect(err).toBeInstanceOf(ContentApiCorsError);
      expect(err.status).toBe(403);
      expect(err.code).toBe('CORS_ORIGIN_DENIED');
    });

    it('initializes ContentApiServerError', () => {
      const err = new ContentApiServerError(503, 'Unavailable');
      expect(err).toBeInstanceOf(ContentApiError);
      expect(err).toBeInstanceOf(ContentApiServerError);
      expect(err.status).toBe(503);
      expect(err.code).toBe('INTERNAL_SERVER_ERROR');
    });

    it('initializes ContentApiNetworkError', () => {
      const baseErr = new Error('DNS failed');
      const err = new ContentApiNetworkError(baseErr);
      expect(err).toBeInstanceOf(ContentApiError);
      expect(err).toBeInstanceOf(ContentApiNetworkError);
      expect(err.code).toBe('NETWORK_ERROR');
      expect(err.message).toBe('DNS failed');
    });
  });

  describe('HTTP Error Translation', () => {
    it('translates 404 response to ContentApiNotFoundError', async () => {
      const mockFetch = jest.fn<typeof fetch>().mockResolvedValue(
        new Response(
          JSON.stringify({
            code: 'NOT_FOUND',
            error: 'Article not found',
            message: 'slug "missing" does not exist',
          }),
          {
            status: 404,
            statusText: 'Not Found',
            headers: { 'Content-Type': 'application/json' },
          },
        ),
      );

      const client = new ContentApiClient({ fetch: mockFetch });

      await expect(client.articles.getBySlug('missing')).rejects.toThrow(
        ContentApiNotFoundError,
      );
    });

    it('translates 400 response to ContentApiValidationError', async () => {
      const mockFetch = jest.fn<typeof fetch>().mockResolvedValue(
        new Response(
          JSON.stringify({
            code: 'VALIDATION_ERROR',
            error: 'Validation failed',
            message: 'limit exceeds maximum 100',
          }),
          {
            status: 400,
            statusText: 'Bad Request',
            headers: { 'Content-Type': 'application/json' },
          },
        ),
      );

      const client = new ContentApiClient({ fetch: mockFetch });

      await expect(client.articles.list({ limit: 999 })).rejects.toThrow(
        ContentApiValidationError,
      );
    });

    it('translates 403 response to ContentApiCorsError', async () => {
      const mockFetch = jest.fn<typeof fetch>().mockResolvedValue(
        new Response(
          JSON.stringify({
            code: 'CORS_ORIGIN_DENIED',
            error: 'CORS forbidden',
          }),
          {
            status: 403,
            statusText: 'Forbidden',
            headers: { 'Content-Type': 'application/json' },
          },
        ),
      );

      const client = new ContentApiClient({ fetch: mockFetch });

      await expect(client.articles.list()).rejects.toThrow(ContentApiCorsError);
    });

    it('translates 500 response to ContentApiServerError', async () => {
      const mockFetch = jest.fn<typeof fetch>().mockResolvedValue(
        new Response(
          JSON.stringify({
            code: 'INTERNAL_SERVER_ERROR',
            error: 'Database connection failed',
          }),
          {
            status: 500,
            statusText: 'Internal Server Error',
            headers: { 'Content-Type': 'application/json' },
          },
        ),
      );

      const client = new ContentApiClient({
        fetch: mockFetch,
        retry: 0,
      });

      await expect(client.health.check()).rejects.toThrow(
        ContentApiServerError,
      );
    });

    it('handles non-JSON error responses gracefully', async () => {
      const mockFetch = jest.fn<typeof fetch>().mockResolvedValue(
        new Response('<html>Bad Gateway</html>', {
          status: 502,
          statusText: 'Bad Gateway',
          headers: { 'Content-Type': 'text/html' },
        }),
      );

      const client = new ContentApiClient({
        fetch: mockFetch,
        retry: 0,
      });

      await expect(client.health.check()).rejects.toThrow(ContentApiError);
    });

    it('translates arbitrary 4xx error (e.g. 401) to generic ContentApiError', async () => {
      const mockFetch = jest.fn<typeof fetch>().mockResolvedValue(
        new Response(
          JSON.stringify({
            code: 'UNAUTHORIZED',
            error: 'Missing token',
            message: 'Token required',
          }),
          {
            status: 401,
            statusText: 'Unauthorized',
            headers: { 'Content-Type': 'application/json' },
          },
        ),
      );

      const client = new ContentApiClient({ fetch: mockFetch });
      await expect(client.health.check()).rejects.toMatchObject({
        status: 401,
        code: 'UNAUTHORIZED',
        error: 'Missing token',
        details: 'Token required',
      });
    });

    it('translates non-Error rejection to ContentApiError with code UNKNOWN_ERROR', async () => {
      const mockFetch = jest
        .fn<typeof fetch>()
        .mockRejectedValue('Fatal string error');

      const client = new ContentApiClient({ fetch: mockFetch, retry: 0 });
      await expect(client.health.check()).rejects.toMatchObject({
        code: 'UNKNOWN_ERROR',
        status: 0,
      });
    });

    it('handles network failure (rejected fetch) as ContentApiNetworkError', async () => {
      const mockFetch = jest
        .fn<typeof fetch>()
        .mockRejectedValue(new Error('Connection refused'));

      const client = new ContentApiClient({
        fetch: mockFetch,
        retry: 0,
      });

      await expect(client.health.check()).rejects.toThrow(
        ContentApiNetworkError,
      );
    });

    it('throws ContentApiValidationError when API returns invalid payload against schema', async () => {
      const mockFetch = jest.fn<typeof fetch>().mockResolvedValue(
        new Response(
          JSON.stringify({
            // Missing required total, limit, offset, items fields
            invalid_payload: true,
          }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          },
        ),
      );

      const client = new ContentApiClient({
        fetch: mockFetch,
        validateResponses: true,
      });

      await expect(client.articles.list()).rejects.toThrow(
        ContentApiValidationError,
      );
    });
  });
});
