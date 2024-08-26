// This is the bridge over css variables and tailwind, you are most likely
// will be fine by using utility classes, but if you really need it, you can

// For more info:
// https://material.io/design/color/the-color-system.html#color-theme-creation

const cssVars = {
  color: {
    background: 'var(--color-background)',
    primary: 'var(--color-primary)',
    primaryAlt: 'var(--color-primary-alt)',
    secondary: 'var(--color-secondary)',
    secondaryAlt: 'var(--color-secondary-alt)',
    tertiary: 'var(--color-tertiary)',
    tertiaryAlt: 'var(--color-tertiary-alt)',
    surface: 'var(--color-surface)',
    error: 'var(--color-error)',
    onPrimary: 'var(--color-on-primary)',
    onSecondary: 'var(--color-on-secondary)',
    onTertiary: 'var(--color-on-tertiary)',
    onBackground: 'var(--color-on-background)',
    onSurface: 'var(--color-on-surface)',
    onError: 'var(--color-on-error)',
    dimmer: 'var(--color-dimmer)',
  },
  fontFamily: {
    primary: 'var(--font-family)',
    secondary: 'var(--header-font-family)',
  },
};

export default cssVars;
