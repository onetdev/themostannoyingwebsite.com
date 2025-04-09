import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Checkbox } from './Checkbox';

const meta = {
  title: 'Example/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    onValueChange: {
      description:
        'Simplified change event retuning only the value of the selected option',
    },
    checked: {
      control: 'boolean',
      defaultValue: false,
    },
  },
  args: {
    onValueChange: fn(),
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SampleCheckbox: Story = {
  args: {
    checked: false,
  },
};
