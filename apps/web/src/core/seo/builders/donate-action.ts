import type { DonateAction, EntryPoint, WithContext } from 'schema-dts';
import { absoluteUrl, siteId } from '../absolute-url';

export interface DonateActionInput {
  baseUrl: string;
  locale: string;
  /** Root-relative donate page path. */
  path: string;
  name: string;
  description?: string;
  /** External donation endpoints (e.g. Buy Me a Coffee, PayPal). */
  targets: string[];
}

/**
 * Builds a `DonateAction` for the donation page, pointing at the external
 * funding endpoints and back at the site organization as the recipient.
 */
export function buildDonateAction(
  input: DonateActionInput,
): WithContext<DonateAction> {
  const pageUrl = absoluteUrl(input.baseUrl, input.locale, input.path);

  const target: EntryPoint[] = input.targets.map((url) => ({
    '@type': 'EntryPoint',
    url,
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'DonateAction',
    '@id': `${pageUrl}#donate`,
    name: input.name,
    ...(input.description ? { description: input.description } : {}),
    recipient: { '@id': siteId(input.baseUrl, 'organization') },
    target,
  };
}
