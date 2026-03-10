import { err, ok, type Result, type ResultOk } from '@maw/utils/result';
import { injectable } from 'inversify';
import ky, { HTTPError, type Options } from 'ky';

export type RequestOptions = {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
  timeout?: number | false;
};

@injectable()
export class HttpClient {
  private readonly client = ky.create({
    headers: {
      'Content-Type': 'application/json',
    },
    retry: 0, // Disable retry by default, can be overridden per request if needed
  });

  public async get<T>(
    url: string,
    options?: RequestOptions,
  ): Promise<Result<T>> {
    return this.request<T>(url, 'GET', options);
  }

  public async post<T>(
    url: string,
    options?: RequestOptions,
  ): Promise<Result<T>> {
    return this.request<T>(url, 'POST', options);
  }

  public async put<T>(
    url: string,
    options?: RequestOptions,
  ): Promise<Result<T>> {
    return this.request<T>(url, 'PUT', options);
  }

  public async patch<T>(
    url: string,
    options?: RequestOptions,
  ): Promise<Result<T>> {
    return this.request<T>(url, 'PATCH', options);
  }

  public async delete<T>(
    url: string,
    options?: RequestOptions,
  ): Promise<Result<T>> {
    return this.request<T>(url, 'DELETE', options);
  }

  private async request<T>(
    url: string,
    method: string,
    options?: RequestOptions,
  ): Promise<Result<T>> {
    try {
      const fullUrl = this.buildUrl(url);

      const kyOptions: Options = {
        method,
        headers: options?.headers,
        searchParams: this.normalizeParams(options?.params),
        timeout: options?.timeout,
      };

      if (options?.body) {
        kyOptions.json = options.body;
      }

      const data = await this.client(fullUrl, kyOptions).json<ResultOk<T>>();

      return ok(data.data, data.metadata);
    } catch (error) {
      if (error instanceof HTTPError) {
        let errorMessage = `HTTP error! status: ${error.response.status}`;
        let details: Record<string, unknown> = {};

        try {
          const errorData = await error.response.json();
          errorMessage = errorData.message || errorMessage;
          details = errorData;
        } catch {
          // Fallback if response is not JSON
        }

        return err({
          message: errorMessage,
          code: `HTTP_${error.response.status}`,
          details,
        });
      }

      const message =
        error instanceof Error ? error.message : 'Unknown network error';
      return err({
        message,
        code: 'NETWORK_ERROR',
        details: { error },
      });
    }
  }

  private buildUrl(url: string): string {
    const isAbsolute = url.startsWith('http://') || url.startsWith('https://');
    if (isAbsolute) {
      return url;
    }

    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    return new URL(url, baseUrl).toString();
  }

  private normalizeParams(
    params?: RequestOptions['params'],
  ): Record<string, string | number | boolean> | undefined {
    if (!params) return undefined;

    const normalized: Record<string, string | number | boolean> = {};
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        normalized[key] = value;
      }
    });

    return Object.keys(normalized).length > 0 ? normalized : undefined;
  }
}
