import manifest from '@/root/package.json';

const isDev = process.env.NEXT_PUBLIC_IS_DEV === 'true';
let url =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.themostannoyingwebsite.com';
if (isDev) {
  url = `https://localhost:${process.env.PORT || 3000}`;
}

const config = {
  contactEmail: 'info@themostannoyingwebsite.com',
  githubRepo: manifest.repository.url,
  defaultColorScheme: 'dark' as AppTheme,
  isBrowser: typeof window !== 'undefined',
  isDev,
  url,
};

export default config;
