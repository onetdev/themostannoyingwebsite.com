import { Theme } from './types';

const config = {
  contactEmail: 'info@themostannoyingwebsite.com',
  defaultColorScheme: 'dark' as Theme,
  isBrowser: typeof window !== 'undefined',
};

export default config;
