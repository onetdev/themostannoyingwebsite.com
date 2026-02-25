import type { Meta, StoryObj } from '@storybook/nextjs';

import { CaptchaTilePuzzle } from './CaptcaTilePuzzle';

const meta = {
  title: 'Atoms/CaptchaTilePuzzle',
  component: CaptchaTilePuzzle,
  tags: ['autodocs'],
} satisfies Meta<typeof CaptchaTilePuzzle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    cols: 4,
    rows: 3,
    size: 60,
  },
};
