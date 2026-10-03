import 'server-only';

import type { ContentApiClient, LanguageCode } from '@maw/content-sdk';
import { mulberry32, stringToSeed } from '@maw/utils/random';
import { type Container, injectable } from 'inversify';
import { createAppContentClient } from '@/core/content';
import { getContentPool } from '@/features/content/services/get-content-pool';
import i18nConfig from '@/root/i18n.config';
import {
  DI,
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
      getContentPool(this.client, lang, 'names'),
      getContentPool(this.client, lang, 'testimonials'),
      getContentPool(this.client, lang, 'spam-sample'),
    ]);

    const names = namesPool?.items ?? [];
    const testimonialsRaw = testimonialsPool?.items ?? [];
    const samples = samplesPool?.items ?? [];

    const seed = stringToSeed('only-spams-testimonials');
    const rand = mulberry32(seed);
    const testimonials = testimonialsRaw.map((comment) => ({
      name: names.length ? names[Math.floor(rand() * names.length)] : '',
      comment,
    }));

    return {
      testimonials,
      samples,
    };
  }
}

export async function getOnlySpamsService(container: Container) {
  return container.get<IOnlySpamsService>(DI.OnlySpamsService);
}
