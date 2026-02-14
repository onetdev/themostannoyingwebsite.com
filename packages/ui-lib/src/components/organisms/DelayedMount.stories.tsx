import type { Meta, StoryObj } from '@storybook/react';

import { DelayedMount } from './DelayedMount';

const meta = {
  title: 'Organisms/DelayedMount',
  component: DelayedMount,
  tags: ['autodocs'],
} satisfies Meta<typeof DelayedMount>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    delay: 2000,
    children: <div>This content appeared after 2 seconds.</div>,
  },
};
