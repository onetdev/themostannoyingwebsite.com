import baseConfig from '@maw/tailwind/tailwind.config.ts';

export default {
  ...baseConfig,
  content: [
    './**/*.stories.@(js|ts|jsx|tsx|mdx)',
    '../../../packages/ui/src/**/*.{js,jsx,ts,tsx}',
  ]
}
