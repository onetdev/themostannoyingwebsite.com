import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-themes',
    '@storybook/addon-styling-webpack',
    '@storybook/addon-docs',
  ],
  core: {
    disableTelemetry: true,
  },
  docs: {},
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  staticDirs: ['../public'],
  stories: [
    '../node_modules/@maw/ui-lib/src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../node_modules/@maw/ui-lib/src/**/*.mdx',
  ],
};
export default config;
