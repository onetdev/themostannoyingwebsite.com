import 'server-only';

import type { ContentApiClient, LanguageCode } from '@maw/content-sdk';
import { mulberry32, stringToSeed } from '@maw/utils/random';
import { type Container, injectable } from 'inversify';
import { createAppContentClient } from '@/core/content';
import { getVariantPool } from '@/features/content/services/get-variant-pool';
import i18nConfig from '@/root/i18n.config';
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

    const names = namesPool?.items ?? [];
    const testimonialsRaw = testimonialsPool?.items ?? [];
    const samples = samplesPool?.items ?? [];

    const seed = stringToSeed('only-spams-testimonials');
    const rand = mulberry32(seed);
    const testimonials = testimonialsRaw.map((t: { comment: string }) => {
      return {
        ...t,
        name: names.length ? names[Math.floor(rand() * names.length)] : '',
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
