import type { Preview } from '@storybook/react'
import {
  withThemeByDataAttribute,
} from '@storybook/addon-themes';
import React from 'react';

import './global.css';

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
        <Story />
      </>
    ),
  ],
};

export default preview;
