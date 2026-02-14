import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from './Checkbox';

const meta = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Core Shadcn Checkbox component. See [official documentation](https://ui.shadcn.com/docs/components/checkbox).',
      },
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'terms',
  },
};

export const Checked: Story = {
  args: {
    id: 'terms-checked',
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    id: 'terms-disabled',
    disabled: true,
  },
};
