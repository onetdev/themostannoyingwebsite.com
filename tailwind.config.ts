import type { Config } from 'tailwindcss';

// The latest full config: https://github.com/tailwindlabs/tailwindcss/blob/main/stubs/config.full.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      animation: {
        'dot-dot-dot': 'dot-dot-dot 2s infinite',
        highlight: 'highlight 1s infinite',
        'flashing-invert-1/2': 'flashing-invert-1/2 500ms infinite',
        'wiggle-15deg': 'wiggle-15deg 0.2s linear infinite;',
        'wiggle-8deg': 'wiggle-8deg 8s infinite',
        'width-0-100': 'width-0/100 2s infinite',
        'width-100-0': 'width-0/100 2s reverse infinite',
        'gift-callout': 'gift-callout 5s infinite',
      },
      backgroundImage: {
        'bottom-fadeout':
          'linear-gradient(0deg, var(--color-surface) 60%, transparent 100%)',
        'cover-placeholder': "url('/assets/cover-placeholder.svg')",
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
        'surface-alt': 'var(--color-surface-alt)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error: 'var(--color-error)',
        'on-primary': 'var(--color-on-primary)',
        'on-secondary': 'var(--color-on-secondary)',
        'on-tertiary': 'var(--color-on-tertiary)',
        'on-background': 'var(--color-on-background)',
        'on-surface': 'var(--color-on-surface)',
        'on-success': 'var(--color-on-success)',
        'on-warning': 'var(--color-on-warning)',
        'on-error': 'var(--color-on-error)',
        dimmer: 'var(--color-dimmer)',
        'hr-surface': 'var(--color-hr-surface)',
        'hr-surface-alt': 'var(--color-hr-surface-alt)',
        'hr-primary': 'var(--color-hr-primary)',
        'hr-secondary': 'var(--color-hr-secondary)',
        'hr-tertiary': 'var(--color-hr-tertiary)',
      },
      fontFamily: {
        primary: [
          'Open Sans',
          '"Segoe UI"',
          'Ubuntu',
          '"Helvetica Neue"',
          'sans-serif',
        ],
      },
      keyframes: {
        'dot-dot-dot': {
          '0%': { content: '.' },
          '25%': { content: '..' },
          '50%': { content: '...' },
          '75%': { content: '' },
          '100%': { content: '.' },
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
        'width-0/100': {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        'gift-callout': {
          '0%': { filter: 'invert(0.8)', transform: 'scale(1)' },
          '5%': { filter: 'invert(0.4)', transform: 'scale(1.1)' },
          '10%': {
            filter: 'invert(0) hue-rotate(0deg)',
            transform: 'scale(1)',
          },
          '15%': { filter: 'hue-rotate(180deg)', transform: 'scale(1)' },
          '20%': {
            filter: 'invert(0) hue-rotate(360deg)',
            transform: 'scale(1.2) rotate(360deg)',
          },
          '25%': {
            filter: 'invert(0) hue-rotate(180deg)',
            transform: 'scale(1) rotate(0deg)',
          },
          '30%': {
            filter: 'invert(0) hue-rotate(0deg)',
            transform: 'scale(1) rotate(0deg)',
          },
        },
      },
      minWidth: {
        'clamp-400': 'min(400px,100%)',
        'clamp-400-2/3': 'min(400px, 66%)',
      },
      maxWidth: {
        'screen-dimension-min': 'min(100vw, 100vh)',
      },
      maxHeight: {
        'clamp-300-screen-2/1': 'min(300px, 50vh)',
        'screen-dimension-min': 'min(100vw, 100vh)',
        'screen-3/4': '75vh',
        'screen-1/2': '50vh',
      },
      padding: {
        '16/9': '56.25%',
        '9/16': '177.78%',
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
