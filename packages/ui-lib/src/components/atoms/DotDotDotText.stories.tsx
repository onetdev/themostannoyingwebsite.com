import type { Meta, StoryObj } from '@storybook/react';

import { DotDotDotText } from './DotDotDotText';

const meta = {
  title: 'Atoms/DotDotDotText',
  component: DotDotDotText,
  tags: ['autodocs'],
} satisfies Meta<typeof DotDotDotText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: 'Loading',
  },
};
