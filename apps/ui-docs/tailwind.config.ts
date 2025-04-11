import baseConfig from '@maw/tailwind/tailwind.config.ts';

export default {
  ...baseConfig,
  content: [
    './src/*.stories.@(js|ts|jsx|tsx|mdx)',
    './node_modules/@maw/ui/src/*.stories.@(js|ts|jsx|tsx|mdx)',
  ]
}
