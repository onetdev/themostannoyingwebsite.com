import { useLocale } from 'next-intl';
import { getLangDir } from '@/core/i18n/get-lang-dir';

export function useLangDir() {
  const locale = useLocale();
  const direction = getLangDir(locale);

  return direction;
}
