// Using styled-components provided theme is great and all but I'm losing
// in-browser variable modifications. It's easy to get the current OS
// theme but when it comes down to user defined in-browser dark mode,
// the story changes quickly.
// So, even though this is not the perfect solution, it works fine.

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
  fontSize: {
    small: 'var(--font-size-small)',
    normal: 'var(--font-size-normal)',
    large: 'var(--font-size-large)',
    headline: 'var(--font-size-headline)',
    title: 'var(--font-size-title)',
  },
  spacing: {
    gap: 'var(--gap)',
    gap2x: 'calc(var(--gap) * 2)',
    container: '1200px',
  },
};

export default cssVars;
