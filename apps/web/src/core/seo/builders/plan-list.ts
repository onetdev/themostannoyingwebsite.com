import type {
  ItemList,
  ListItem,
  Offer,
  Product,
  WithContext,
} from 'schema-dts';
import { absoluteAssetUrl, absoluteUrl } from '../absolute-url';

export interface PlanOfferInput {
  /** Billing cycle identifier (e.g. `monthly`, `yearly`). */
  billingCycle: string;
  price: number;
  currency: string;
}

export interface PlanSeoItem {
  key: string;
  name: string;
  description: string;
  /** Absolute or root-relative product image URL. */
  image?: string;
  offers: PlanOfferInput[];
}

export interface PlanListInput {
  baseUrl: string;
  locale: string;
  /** Root-relative plans page path. */
  path: string;
  name: string;
  description?: string;
  plans: PlanSeoItem[];
}

/**
 * Builds an `ItemList` of `Product`/`Offer` nodes for the plans page.
 */
export function buildPlanList(input: PlanListInput): WithContext<ItemList> {
  const pageUrl = absoluteUrl(input.baseUrl, input.locale, input.path);

  const itemListElement: ListItem[] = input.plans.map((plan, index) => {
    const product: Product = {
      '@type': 'Product',
      name: plan.name,
      description: plan.description,
      url: pageUrl,
      ...(plan.image
        ? { image: absoluteAssetUrl(input.baseUrl, plan.image) }
        : {}),
      offers: plan.offers.map<Offer>((offer) => ({
        '@type': 'Offer',
        price: offer.price,
        priceCurrency: offer.currency,
        url: pageUrl,
      })),
    };

    return {
      '@type': 'ListItem',
      position: index + 1,
      item: product,
    };
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${pageUrl}#plans`,
    name: input.name,
    ...(input.description ? { description: input.description } : {}),
    numberOfItems: input.plans.length,
    itemListElement,
  };
}
