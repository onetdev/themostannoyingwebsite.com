import { useState, useEffect } from 'react';

export type ColorScheme = 'light' | 'dark';

export type SystemColorSchemeProps = {
  defaultScheme: ColorScheme;
};

/**
 * Loads and watches for system color scheme changes.
 *
 * IMPORTANT: This hook only works propery in the browser environment and
 *  should not be directly used for theme switching.
 *  Use `useUserColorScheme` instead which also takes user preference
 *  into account.
 */
const useSystemColorScheme = ({
  defaultScheme,
}: SystemColorSchemeProps): ColorScheme => {
  const [preferredColorScheme, setPreferredColorScheme] =
    useState<ColorScheme>(defaultScheme);

  useEffect(() => {
    if (!window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    setPreferredColorScheme(mediaQuery.matches ? 'dark' : 'light');

    const onChange = (event: MediaQueryListEvent): void =>
      setPreferredColorScheme(event.matches ? 'dark' : 'light');

    mediaQuery.addEventListener('change', onChange);
    return () => mediaQuery.removeEventListener('change', onChange);
  }, []);

  return preferredColorScheme;
};

export default useSystemColorScheme;
