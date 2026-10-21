import type { Meta, StoryObj } from '@storybook/react';

import { ColorPickerInput } from './ColorPickerInput';

const meta = {
  title: 'Molecules/ColorPickerInput',
  component: ColorPickerInput,
  tags: ['autodocs'],
} satisfies Meta<typeof ColorPickerInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    displayValue: '#ff0000',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    displayValue: '#00ff00',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    displayValue: '#0000ff',
  },
};
