import type { Meta, StoryObj } from '@storybook/react';

import { FormError } from './FormError';

const meta = {
  title: 'Atoms/FormError',
  component: FormError,
  tags: ['autodocs'],
} satisfies Meta<typeof FormError>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    error: {
      type: 'server',
      message: 'A global error occurred',
    },
  },
};
