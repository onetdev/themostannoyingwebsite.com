import type { Meta, StoryObj } from '@storybook/nextjs';
import { fn } from 'storybook/test';

import { Button, ButtonProps } from '@maw/ui-lib';

const meta: Meta<ButtonProps> = {
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
type Story = StoryObj<ButtonProps>;

export const Primary: Story = {
  args: {
    behavior: 'button',
    variant: 'primary',
    children: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    behavior: 'button',
    variant: 'secondary',
    children: 'Button',
  },
};

export const Link: Story = {
  args: {
    behavior: 'link',
    variant: 'primary',
    children: 'Anchor Link',
    href: 'https://google.com',
    target: '_blank',
  },
};
