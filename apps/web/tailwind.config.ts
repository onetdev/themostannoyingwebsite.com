import baseConfig from '@maw/tailwind/tailwind.config.ts';

export default {
  ...baseConfig,
  content: [
    './src/**/*.@(js|ts|jsx|tsx|mdx)',
    './node_modules/@maw/ui/src/**/*.@(js|ts|jsx|tsx|mdx)',
  ]
}
