import type { Meta, StoryObj } from '@storybook/react';

import { CopyMarker } from './CopyMarker';

const meta = {
  title: 'Atoms/CopyMarker',
  component: CopyMarker,
  tags: ['autodocs'],
} satisfies Meta<typeof CopyMarker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Copy this text and paste it somewhere to see the "Read more at" link appended.',
    enabled: true,
    text: {
      readMoreAt: 'Read more at',
    },
  },
};
