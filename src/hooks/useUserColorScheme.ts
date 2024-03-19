import { useAppSelector } from '@/redux/hooks';
import { selectColorScheme } from '@/redux/selectors/preference';

import useSystemColorScheme, { type ColorScheme } from './useSystemColorScheme';

/**
 * Calculates color scheme from state and system preference since user color
 * scheme can be auto (which means system scheme will be used)
 */
const useColorScheme = (): ColorScheme => {
  const systemColorScheme = useSystemColorScheme();
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

export default useColorScheme;
