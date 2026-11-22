import type { LanguageCode, ShortListItem } from '@maw/content-sdk';
import type { ShortService } from '@/features/content/types';

export interface ShortStaticParam {
  slug: string;
  locale: string;
}

/**
 * Builds the static params for every localized short.
 *
 * The shorts endpoint can legitimately be unavailable (older deployments), so
 * the service returns an empty list instead of throwing. The route then falls
 * back to on-demand rendering rather than failing the build.
 */
export async function buildShortStaticParams(
  locales: readonly string[],
  shortService: Pick<ShortService, 'listAll'>,
): Promise<ShortStaticParam[]> {
  const perLocale = await Promise.all(
    locales.map(async (locale) => {
      const shorts: ShortListItem[] = await shortService.listAll({
        lang: locale as LanguageCode,
      });

      return shorts.map((short) => ({ slug: short.slug, locale }));
    }),
  );

  return perLocale.flat();
}
