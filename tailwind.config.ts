import type { Config } from 'tailwindcss';

// The latest full config: https://github.com/tailwindlabs/tailwindcss/blob/main/stubs/config.full.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      animation: {
        'dot-dot-dot': 'dot-dot-dot 2s infinite',
        'flashing-error': 'flashing-error 1s infinite',
        highlight: 'highlight 1s infinite',
        'flashing-invert-1/2': 'flashing-invert-1/2 500ms infinite',
        'wiggle-15deg': 'wiggle-15deg 0.2s linear infinite;',
        'wiggle-8deg': 'wiggle-8deg 8s infinite',
      },
      backgroundImage: {
        'bottom-fadeout':
          'linear-gradient(0deg, var(--color-background) 50%, transparent 100%)',
        'cover-placeholder': "url('/assets/assets/cover-placeholder.svg')",
        'radial-primary': 'radial-gradient(transparent, var(--color-primary))',
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
        primary: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          '"Fira Sans"',
          '"Droid Sans"',
          '"Helvetica Neue"',
          'sans-serif',
        ],
        secondary: ['"Bonheur Royale"', 'sans-serif'],
      },
      keyframes: {
        'dot-dot-dot': {
          '0%': { content: '.' },
          '25%': { content: '..' },
          '50%': { content: '...' },
          '75%': { content: '' },
          '100%': { content: '.' },
        },
        'flashing-error': {
          '0%, 25%, 75%, 100%,': { background: 'transparent' },
          '30%, 70%': { background: 'var(--color-error)' },
        },
        highlight: {
          from: { background: 'var(--color-error)' },
          to: { background: 'var(--color-error)' },
        },
        'flashing-invert-1/2': {
          '0%': { filter: 'invert(0)' },
          '50%': { filter: 'invert(0.5)' },
          '100%': { filter: 'invert(0)' },
        },
        'wiggle-15deg': {
          '0%': { transform: 'rotate(0deg)' },
          '30%': { transform: 'rotate(-15deg)' },
          '40%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        'wiggle-8deg': {
          '0%': { transform: 'rotate(0deg)' },
          '90%': { transform: 'rotate(0deg)' },
          '92%': { transform: 'rotate(8deg)' },
          '94%': { transform: 'rotate(-8deg)' },
          '96%': { transform: 'rotate(8deg)' },
          '98%': { transform: 'rotate(-8deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
      },
      minWidth: {
        'clamp-400': 'min(400px,100%)',
        'clamp-400-2/3': 'min(400px, 66%)',
      },
      maxWidth: {
        'manual-modal': 'min(calc(100vw - 10rem), 30rem)',
      },
      maxHeight: {
        'clamp-300-2/1': 'min(300px, 50vh)',
      },
      transitionProperty: {
        'visibility-opacity': 'visibility, opacity',
      },
      translate: {
        'screen-h-1/2': '50vh',
      },
    },
  },
  plugins: [],
} satisfies Config;