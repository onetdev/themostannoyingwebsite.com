import type { Meta, StoryObj } from '@storybook/react';

import { FormFieldError } from './FormFieldError';

const meta = {
  title: 'Atoms/FormFieldError',
  component: FormFieldError,
  tags: ['autodocs'],
} satisfies Meta<typeof FormFieldError>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    error: {
      type: 'required',
      message: 'This field is required',
    },
  },
};
