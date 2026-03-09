import { routing } from '@/i18n/routing';

/**
 * Dynamically loads MDX content for a given locale with a fallback mechanism.
 *
 * @param locale The locale to load content for.
 * @param loader A function that takes a locale and returns a promise of the MDX module.
 *               Example: (l: string) => import(`./_i18n/${l}.mdx`)
 * @returns The default export (the MDX component) from the loaded module.
 * @throws Error if neither the requested locale nor the default locale can be loaded.
 */
export async function loadLocaleMdx<T extends React.ComponentType>(
  locale: string,
  loader: (l: string) => Promise<{ default: T }>,
): Promise<T> {
  try {
    return (await loader(locale)).default;
  } catch (_err) {
    if (locale !== routing.defaultLocale) {
      return (await loader(routing.defaultLocale)).default;
    }
    throw _err;
  }
}
