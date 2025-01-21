import deploymentMeta from '@/public/deployment-meta.json';

const config = {
  defaultColorScheme: 'dark' as AppTheme,
  ...deploymentMeta,
};

export default config;
