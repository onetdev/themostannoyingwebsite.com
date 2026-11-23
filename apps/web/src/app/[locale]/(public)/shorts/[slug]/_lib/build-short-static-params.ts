import {
  buildLocalizedStaticParams,
  type LocalizedStaticParam,
} from '@/app/[locale]/(public)/_lib/build-localized-static-params';

export type ShortStaticParam = LocalizedStaticParam;

/**
 * Builds the static params for every localized short.
 *
 * The shorts endpoint can legitimately be unavailable (older deployments), so
 * the service returns an empty list instead of throwing. The route then falls
 * back to on-demand rendering rather than failing the build.
 *
 * @see buildLocalizedStaticParams for the shared iteration.
 */
export const buildShortStaticParams = buildLocalizedStaticParams;
