import type { ItemList, ListItem, WithContext } from 'schema-dts';
import { absoluteUrl } from '../absolute-url';

export interface ItemListEntry {
  name: string;
  /** Optional root-relative path the entry links to. */
  path?: string;
}

export interface SimpleItemListInput {
  baseUrl: string;
  locale: string;
  /** Root-relative page path. */
  path: string;
  name: string;
  description?: string;
  items: ItemListEntry[];
}

/**
 * Builds a plain `ItemList` of named entries (no product/offer semantics).
 */
export function buildSimpleItemList(
  input: SimpleItemListInput,
): WithContext<ItemList> {
  const pageUrl = absoluteUrl(input.baseUrl, input.locale, input.path);

  const itemListElement: ListItem[] = input.items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    ...(item.path
      ? { item: absoluteUrl(input.baseUrl, input.locale, item.path) }
      : {}),
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${pageUrl}#items`,
    name: input.name,
    ...(input.description ? { description: input.description } : {}),
    numberOfItems: input.items.length,
    itemListElement,
  };
}
