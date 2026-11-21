import { getInitialThemeAttribute } from './get-initial-theme-attribute';

describe('getInitialThemeAttribute', () => {
  it('omits the attribute when the default defers to the system', () => {
    expect(getInitialThemeAttribute('system')).toBeUndefined();
  });

  it.each(['light', 'dark'] as const)(
    'passes the explicit %s scheme through',
    (theme) => {
      expect(getInitialThemeAttribute(theme)).toBe(theme);
    },
  );
});
