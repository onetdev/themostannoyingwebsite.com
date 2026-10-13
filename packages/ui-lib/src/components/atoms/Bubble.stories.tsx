import type { Meta, StoryObj } from '@storybook/nextjs';

import { Bubble, BubbleContent } from './Bubble';

const meta = {
  title: 'Atoms/Bubble',
  component: Bubble,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Shadcn chat Bubble primitive. Compose with `Message` and `MessageScroller`. See [official documentation](https://ui.shadcn.com/docs/components/bubble).',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'secondary',
        'muted',
        'tinted',
        'outline',
        'ghost',
        'destructive',
      ],
    },
    align: {
      control: 'select',
      options: ['start', 'end'],
    },
  },
} satisfies Meta<typeof Bubble>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    align: 'start',
    children: <BubbleContent>Hello! How can I help you today?</BubbleContent>,
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    align: 'end',
    children: <BubbleContent>I would like a refund, please.</BubbleContent>,
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    align: 'start',
    children: <BubbleContent>Something went wrong.</BubbleContent>,
  },
};
