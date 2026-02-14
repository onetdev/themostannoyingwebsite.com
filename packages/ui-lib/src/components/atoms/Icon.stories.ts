import type { Meta, StoryObj } from '@storybook/react';

import { Icon } from '@maw/ui-lib';

const meta = {
  title: 'Example/Icon',
  component: Icon,
  tags: ['autodocs'],
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SampleIcon: Story = {
  args: {
    icon: 'search',
    size: 'md',
    className: 'text-card-foreground',
  },
};
