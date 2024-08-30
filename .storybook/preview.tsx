import React from 'react';
import type { Preview } from '@storybook/react';
import { withThemeByDataAttribute, withThemeFromJSXProvider } from '@storybook/addon-themes';

import '../src/styles/globals.css';
import ScopedThemeStyle from '../src/styles/ScopedThemeStyle';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    // So `withThemeFromJSXProvider` could've handled global vars but then
    // we would not have `[data-theme=*]` attribute that helps us to apply
    // proper var scope to the components.
    //
    // Hence we need to manually pull in the `<ScopedThemeStyle />` style
    // in a second decorator. Works like charm.
    withThemeByDataAttribute({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'dark',
      attributeName: 'data-theme',
    }),
    (Story) => (
      <>
        <ScopedThemeStyle />
        <Story />
      </>
    ),
  ],
};

export default preview;
