import deploymentMeta from '@/root/apps/web/public/deployment-meta.json';

const config = {
  defaultColorScheme: 'dark' as AppTheme,
  ...deploymentMeta,
};

export default config;
