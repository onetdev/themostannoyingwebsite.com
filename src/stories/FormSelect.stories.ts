import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import FormSelect from '@/components/atoms/Select';

const meta = {
  title: 'Example/FormSelect',
  component: FormSelect,
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
} satisfies Meta<typeof FormSelect>;

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
