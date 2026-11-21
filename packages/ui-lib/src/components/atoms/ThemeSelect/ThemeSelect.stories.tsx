import type { Meta, StoryObj } from '@storybook/react';

import { ThemeSelect } from './ThemeSelect';

const meta = {
  title: 'Atoms/ThemeSelect',
  component: ThemeSelect,
  tags: ['autodocs'],
  args: {
    text: {
      label: 'Theme',
      system: 'System (auto)',
      light: 'Light',
      dark: 'Dark',
    },
    onValueChange: (theme) => console.log(`Theme set to ${theme}`),
  },
} satisfies Meta<typeof ThemeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const System: Story = {
  args: { value: 'system' },
};

export const Light: Story = {
  args: { value: 'light' },
};

export const Dark: Story = {
  args: { value: 'dark' },
};

export const IconOnly: Story = {
  args: { value: 'dark', displayOnlyIcon: true },
};
