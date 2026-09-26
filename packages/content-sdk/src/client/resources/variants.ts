import {
  type GetVariantByTypeParams,
  type GetVariantByTypeQueryParams,
  GetVariantByTypeResponse,
  type GetVariantByTypeResponse as GetVariantByTypeResponseType,
  type GetVariantCatalogParams,
  GetVariantCatalogResponse,
  type GetVariantCatalogResponse as GetVariantCatalogResponseType,
} from '../../generated/endpoints';
import type { HttpTransport } from '../http';
import type { RequestOptions } from '../types';

export type VariantPoolType = GetVariantByTypeParams['type'];

export class VariantsResource {
  constructor(private readonly transport: HttpTransport) {}

  /**
   * Retrieves the catalog of available dynamic variant pools for a language.
   */
  public async getCatalog(
    lang: GetVariantCatalogParams['lang'],
    options?: RequestOptions,
  ): Promise<GetVariantCatalogResponseType> {
    return this.transport.get(
      `api/v1/variants/${encodeURIComponent(lang)}`,
      undefined,
      GetVariantCatalogResponse,
      options,
    );
  }

  /**
   * Retrieves items for a specific dynamic variant pool with optional pagination and random sampling.
   */
  public async getByType(
    lang: GetVariantByTypeParams['lang'],
    type: VariantPoolType,
    params?: GetVariantByTypeQueryParams,
    options?: RequestOptions,
  ): Promise<GetVariantByTypeResponseType> {
    return this.transport.get(
      `api/v1/variants/${encodeURIComponent(lang)}/${encodeURIComponent(type)}`,
      params as Record<string, unknown> | undefined,
      GetVariantByTypeResponse,
      options,
    );
  }
}
