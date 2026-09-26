/**
 * Bundled fallback of native language names.
 *
 * Only English is kept in the app as a reference/fallback. Every other locale's
 * native name is provided by the headless Content API (`client.locales.list`).
 */
export const LANGUAGE_NATIVE_NAME_MAP: Partial<
  Record<AppSupportedLocale, string>
> = {
  en: 'English',
};
