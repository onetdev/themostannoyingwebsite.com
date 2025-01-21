import getConfig from 'next/config';

const runtimeConfig = getConfig().publicRuntimeConfig;

const config = {
  defaultColorScheme: 'dark' as AppTheme,
  isBrowser: typeof window !== 'undefined',
  ...runtimeConfig,
};

export default config;
