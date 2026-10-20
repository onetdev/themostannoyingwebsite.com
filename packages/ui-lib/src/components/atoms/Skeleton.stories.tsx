import type { Meta, StoryObj } from '@storybook/react';

import { Skeleton } from './Skeleton';

const meta = {
  title: 'Atoms/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Core Shadcn Skeleton component for loading placeholders. See [official documentation](https://ui.shadcn.com/docs/components/skeleton).',
      },
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Skeleton className="h-4 w-[250px]" />,
};

export const ArticleRow: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Skeleton className="h-5 w-2/3" />
      <Skeleton className="h-3.5 w-full" />
      <Skeleton className="h-3.5 w-5/6" />
    </div>
  ),
};
