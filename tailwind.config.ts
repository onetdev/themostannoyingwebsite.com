import type { Config } from 'tailwindcss';

// The latest full config: https://github.com/tailwindlabs/tailwindcss/blob/main/stubs/config.full.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      backgroundImage: {
        'bottom-fadeout':
          'linear-gradient(0deg, var(--color-background) 50%, transparent 100%)',
      },
      colors: {
        background: 'var(--color-background)',
        primary: 'var(--color-primary)',
        'primary-alt': 'var(--color-primary-alt)',
        secondary: 'var(--color-secondary)',
        'secondary-alt': 'var(--color-secondary-alt)',
        tertiary: 'var(--color-tertiary)',
        'tertiary-alt': 'var(--color-tertiary-alt)',
        surface: 'var(--color-surface)',
        error: 'var(--color-error)',
        'on-primary': 'var(--color-on-primary)',
        'on-secondary': 'var(--color-on-secondary)',
        'on-tertiary': 'var(--color-on-tertiary)',
        'on-background': 'var(--color-on-background)',
        'on-surface': 'var(--color-on-surface)',
        'on-error': 'var(--color-on-error)',
        dimmer: 'var(--color-dimmer)',
      },
      fontFamily: {
        primary: 'var(--font-family)',
        secondary: 'var(--header-font-family)',
      },
      transitionProperty: {
        'visibility-opacity': 'visibility, opacity',
      },
    },
  },
  plugins: [],
} satisfies Config;
