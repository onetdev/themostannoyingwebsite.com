import {
  type GetPoolByTypeParams,
  GetPoolByTypeResponse,
  type GetPoolByTypeResponse as GetPoolByTypeResponseType,
  type GetPoolCatalogParams,
  GetPoolCatalogResponse,
  type GetPoolCatalogResponse as GetPoolCatalogResponseType,
} from '../../generated/endpoints';
import type { HttpTransport } from '../http';
import type { RequestOptions } from '../types';

/** Identifier of a generic string pool served by the Content API. */
export type PoolType = GetPoolByTypeParams['type'];

export class PoolsResource {
  constructor(private readonly transport: HttpTransport) {}

  /**
   * Retrieves the catalog of available string pools for a language.
   */
  public async getCatalog(
    lang: GetPoolCatalogParams['lang'],
    options?: RequestOptions,
  ): Promise<GetPoolCatalogResponseType> {
    return this.transport.get(
      `api/v1/pool/catalog/${encodeURIComponent(lang)}`,
      undefined,
      GetPoolCatalogResponse,
      options,
    );
  }

  /**
   * Retrieves the complete string pool for a type. Responses are never
   * paginated or randomized, so slicing and shuffling happen on the client.
   */
  public async getByType(
    lang: GetPoolByTypeParams['lang'],
    type: PoolType,
    options?: RequestOptions,
  ): Promise<GetPoolByTypeResponseType> {
    return this.transport.get(
      `api/v1/pool/${encodeURIComponent(lang)}/${encodeURIComponent(type)}`,
      undefined,
      GetPoolByTypeResponse,
      options,
    );
  }
}
