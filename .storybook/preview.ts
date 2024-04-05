import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    theme: {
      selector: "body (or your selector with data attribute)",
      dataAttr: "data-theme (or your data attribute)",
      nameLightTheme: "light (or your name of light theme)",
      nameDarkTheme: "dark (or your name of dark theme)",
    },
  },
};

export default preview;
