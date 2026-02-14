import type { Meta, StoryObj } from '@storybook/react';

import { CaptchaEmoji } from './CaptchaEmoji';

const meta = {
  title: 'Atoms/CaptchaEmoji',
  component: CaptchaEmoji,
  tags: ['autodocs'],
} satisfies Meta<typeof CaptchaEmoji>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    count: 50,
    width: 300,
    height: 150,
  },
};
