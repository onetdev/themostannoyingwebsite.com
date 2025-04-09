import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { DropdownSelect } from './DropdownSelect';

const meta = {
  title: 'Example/DropdownSelect',
  component: DropdownSelect,
  tags: ['autodocs'],
  argTypes: {
    onChange: {
      description: 'The native change event',
    },
    onValueChange: {
      description:
        'Simplified change event retuning only the value of the selected option',
    },
  },
  args: {
    onChange: fn(),
    onValueChange: fn(),
  },
} satisfies Meta<typeof DropdownSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SampleFormSelect: Story = {
  args: {
    values: [
      { value: '1', label: 'One' },
      { value: '2', label: 'Two' },
    ],
  },
};
