import type { Meta, StoryObj } from '@storybook/nextjs';

import { DarkModeToggle } from './DarkModeToggle';

const meta = {
  title: 'Atoms/DarkModeToggle',
  component: DarkModeToggle,
  tags: ['autodocs'],
} satisfies Meta<typeof DarkModeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    resolvedTheme: 'light',
    text: {
      lightMode: 'Light Mode',
      darkMode: 'Dark Mode',
    },
    setTheme: (theme) => console.log(`Theme set to ${theme}`),
  },
};

export const Dark: Story = {
  args: {
    resolvedTheme: 'dark',
    text: {
      lightMode: 'Light Mode',
      darkMode: 'Dark Mode',
    },
    setTheme: (theme) => console.log(`Theme set to ${theme}`),
  },
};
