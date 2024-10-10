import manifest from '@/root/package.json';

const config = {
  contactEmail: 'info@themostannoyingwebsite.com',
  githubRepo: manifest.repository.url,
  defaultColorScheme: 'dark' as AppTheme,
  isBrowser: typeof window !== 'undefined',
};

export default config;
