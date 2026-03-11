import { mulberry32, stringToSeed } from '@maw/utils/random';
import { type Container, injectable } from 'inversify';
import enVariants from '@/i18n/messages/variants/en';
import i18nConfig from '@/root/i18n.config';
import enSpamVariants from '../i18n/only-spams-variants/en';
import {
  DI,
  type OnlySpamsService as IOnlySpamsService,
  type OnlySpamsData,
} from '../types';

@injectable()
export class OnlySpamsService implements IOnlySpamsService {
  async getData(locale: string): Promise<OnlySpamsData> {
    const safeLocale = (i18nConfig.locales as readonly string[]).includes(
      locale,
    )
      ? locale
      : i18nConfig.defaultLocale;

    const [variantsModule, namesModule] = await Promise.all([
      import(`../i18n/only-spams-variants/${safeLocale}`).catch(
        () => enSpamVariants,
      ),
      import(`@/i18n/messages/variants/${safeLocale}`).catch(() => enVariants),
    ]);

    const { testimonials: testimonialsRaw, samples } = variantsModule.default;
    const { names } = namesModule.default;

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
