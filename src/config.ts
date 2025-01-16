import environment from '@/root/environment.config';
import manifest from '@/root/package.json';

const config = {
  contactEmail: manifest.bugs.email,
  githubRepo: manifest.repository.url,
  defaultColorScheme: 'dark' as AppTheme,
  isBrowser: typeof window !== 'undefined',
  isLocalDevelopment: environment.isLocalDevelopment,
  publicUrl: environment.publicUrl,
};

export default config;
