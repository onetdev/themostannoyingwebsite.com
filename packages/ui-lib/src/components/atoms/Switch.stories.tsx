import type { Meta, StoryObj } from '@storybook/nextjs';

import { Switch } from './Switch';

const meta = {
  title: 'Atoms/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Core Shadcn Switch component. See [official documentation](https://ui.shadcn.com/docs/components/switch).',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'default'],
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
