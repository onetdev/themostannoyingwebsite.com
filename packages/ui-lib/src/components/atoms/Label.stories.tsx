import type { Meta, StoryObj } from '@storybook/nextjs';

import { Label } from './Label';

const meta = {
  title: 'Atoms/Label',
  component: Label,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Core Shadcn Label component. See [official documentation](https://ui.shadcn.com/docs/components/label).',
      },
    },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Your email address',
    htmlFor: 'email',
  },
};
