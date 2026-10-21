import type { Meta, StoryObj } from '@storybook/react';

import { LoaderDots } from './LoaderDots';

const meta = {
  title: 'Atoms/LoaderDots',
  component: LoaderDots,
  tags: ['autodocs'],
} satisfies Meta<typeof LoaderDots>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
