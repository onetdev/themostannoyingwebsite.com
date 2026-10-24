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
  /**
   * Absolute position of the first item. Use the page offset when the list is
   * one page of a larger collection so `position` does not restart at 1.
   */
  startPosition?: number;
}

/**
 * Builds a plain `ItemList` of named entries (no product/offer semantics).
 */
export function buildSimpleItemList(
  input: SimpleItemListInput,
): WithContext<ItemList> {
  const pageUrl = absoluteUrl(input.baseUrl, input.locale, input.path);
  const startPosition = input.startPosition ?? 0;

  const itemListElement: ListItem[] = input.items.map((item, index) => ({
    '@type': 'ListItem',
    position: startPosition + index + 1,
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
