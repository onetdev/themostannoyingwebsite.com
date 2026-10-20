import type { Meta, StoryObj } from '@storybook/nextjs';

import { Progress, ProgressLabel, ProgressValue } from './Progress';

const meta = {
  title: 'Atoms/Progress',
  component: Progress,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Core Shadcn Progress component. See [official documentation](https://ui.shadcn.com/docs/components/progress).',
      },
    },
  },
  args: {
    value: 60,
    className: 'w-[300px]',
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabelAndValue: Story = {
  render: () => (
    <Progress value={60} className="w-[300px]">
      <ProgressLabel>Uploading</ProgressLabel>
      <ProgressValue />
    </Progress>
  ),
};
