import type { Config } from 'tailwindcss'
import baseConfig from '@maw/tailwind/tailwind.config.ts';

export default {
  ...baseConfig,
  content: [
    './src/**/*.stories.{js|ts|jsx|tsx|mdx}',
    './node_modules/@maw/ui/**/*.stories.{js|ts|jsx|tsx|mdx}',
  ]
} satisfies Config
