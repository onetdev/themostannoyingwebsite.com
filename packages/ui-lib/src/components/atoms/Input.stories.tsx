import type { Meta, StoryObj } from '@storybook/react';

import { Input } from './Input';

const meta = {
  title: 'Atoms/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Core Shadcn Input component. See [official documentation](https://ui.shadcn.com/docs/components/input).',
      },
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Email',
    type: 'email',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled Input',
    disabled: true,
  },
};
