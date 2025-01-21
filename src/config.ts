import deploymentMeta from '@/public/deployment-meta.json';

const config = {
  defaultColorScheme: 'dark' as AppTheme,
  isBrowser: typeof window !== 'undefined',
  ...deploymentMeta,
};

export default config;
