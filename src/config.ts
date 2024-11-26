import manifest from '@/root/package.json';

const isDev = process.env.NEXT_PUBLIC_IS_DEV === 'true';
let url =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.themostannoyingwebsite.com';

if (isDev) {
  url = `https://localhost:${process.env.PORT || 3000}`;
} else if (process.env.VERCEL_ENV === 'preview') {
  url = `https://${process.env.VERCEL_BRANCH_URL}`;
} else if (process.env.VERCEL_ENV === 'production') {
  url = `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
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
