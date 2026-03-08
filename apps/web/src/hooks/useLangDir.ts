import { useLocale } from 'next-intl';
import { getLangDir } from 'rtl-detect';

export function useLangDir() {
  const locale = useLocale();
  const direction = getLangDir(locale);

  return direction;
}
