import type { Meta, StoryObj } from '@storybook/nextjs';
import { fn } from 'storybook/test';

import { Button } from '@maw/ui-lib';

const meta: Meta<typeof Button> = {
  title: 'Example/Button',
  component: Button,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'The variant of the button',
    },
    children: {
      description:
        'The content of the button which can be either another component or text',
    },
    size: {
      description: 'The size of the button',
    },
  },
  args: {
    onClick: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Button',
  },
};
