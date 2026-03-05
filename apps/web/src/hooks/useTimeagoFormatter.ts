import { useLocale } from 'next-intl';
import { useMemo } from 'react';
import { makeIntlFormatter } from 'react-timeago/defaultFormatter';

export function useTimeagoFormatter() {
  const locale = useLocale();
  const intlFormatter = useMemo(
    () =>
      makeIntlFormatter({
        locale: locale,
        numeric: 'auto',
      }),
    [locale],
  );
  return intlFormatter;
}
