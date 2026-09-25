import 'server-only';

import type { ContentApiClient, LanguageCode } from '@maw/content-sdk';
import { mulberry32, stringToSeed } from '@maw/utils/random';
import { type Container, injectable } from 'inversify';
import { createAppContentClient } from '@/core/content';
import { getVariantPool } from '@/features/content/services/get-variant-pool';
import enVariants from '@/i18n/messages/en/variants';
import i18nConfig from '@/root/i18n.config';
import enSpamVariants from '../i18n/en/only-spams-variants';
import {
  DI,
  type EmailSample,
  type OnlySpamsService as IOnlySpamsService,
  type OnlySpamsData,
} from '../types';

@injectable()
export class OnlySpamsService implements IOnlySpamsService {
  private readonly client: ContentApiClient;

  constructor(...args: [ContentApiClient?]) {
    this.client = args[0] ?? createAppContentClient();
  }

  async getData(locale: string): Promise<OnlySpamsData> {
    const safeLocale = (i18nConfig.locales as readonly string[]).includes(
      locale,
    )
      ? locale
      : i18nConfig.defaultLocale;
    const lang = safeLocale as LanguageCode;

    const [namesPool, testimonialsPool, samplesPool] = await Promise.all([
      getVariantPool<string>(this.client, lang, 'names'),
      getVariantPool<{ comment: string }>(this.client, lang, 'testimonials'),
      getVariantPool<EmailSample>(this.client, lang, 'spam-samples'),
    ]);

    // Bundled translations remain the fallback when the Content API is
    // unavailable or returns an empty pool.
    const [variantsModule, namesModule] = await Promise.all([
      import(`../i18n/${safeLocale}/only-spams-variants`).catch(
        () => enSpamVariants,
      ),
      import(`@/i18n/messages/${safeLocale}/variants`).catch(() => enVariants),
    ]);

    const { testimonials: fallbackTestimonials, samples: fallbackSamples } =
      variantsModule.default;
    const { names: fallbackNames } = namesModule.default;

    const names = namesPool?.items.length ? namesPool.items : fallbackNames;
    const testimonialsRaw = testimonialsPool?.items.length
      ? testimonialsPool.items
      : fallbackTestimonials;
    const samples = samplesPool?.items.length
      ? samplesPool.items
      : fallbackSamples;

    const seed = stringToSeed('only-spams-testimonials');
    const rand = mulberry32(seed);
    const testimonials = testimonialsRaw.map((t: { comment: string }) => {
      const nameIndex = Math.floor(rand() * names.length);
      return {
        ...t,
        name: names[nameIndex],
      };
    });

    return {
      testimonials,
      samples,
    };
  }
}

export async function getOnlySpamsService(container: Container) {
  return container.get<IOnlySpamsService>(DI.OnlySpamsService);
}
