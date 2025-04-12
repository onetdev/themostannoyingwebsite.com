import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { TextInput } from './TextInput';

const meta: Meta<typeof TextInput> = {
  title: 'Example/TextInput',
  component: TextInput,
  tags: ['autodocs'],
  argTypes: {
    onValueChange: {
      description:
        'Simplified change event retuning only the value of the selected option',
    },
    value: {
      description: 'Value of the element',
    },
  },
  args: {
    onValueChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SampleTextInput: Story = {
  args: {
    value: 'Text input',
  },
};
