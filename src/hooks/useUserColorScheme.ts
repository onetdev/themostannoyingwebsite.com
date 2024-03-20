import { useAppSelector } from '@/redux/hooks';
import { selectColorScheme } from '@/redux/selectors/preference';
import config from '@/config';

import useSystemColorScheme, { type ColorScheme } from './useSystemColorScheme';

/**
 * Calculates color scheme from state and system preference since user color
 * scheme can be auto (which means system scheme will be used)
 */
const useUserColorScheme = (): ColorScheme => {
  const systemColorScheme = useSystemColorScheme({
    defaultScheme: config.defaultColorScheme,
  });
  const userColorScheme = useAppSelector(selectColorScheme);

  let result: ColorScheme;
  switch (userColorScheme) {
    case 'auto':
      result = systemColorScheme;
      break;
    case 'dark':
      result = 'dark';
      break;
    case 'light':
      result = 'light';
      break;
  }

  return result;
};

export default useUserColorScheme;
