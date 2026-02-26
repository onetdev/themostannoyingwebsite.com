import { Icon } from '@maw/ui-lib';
import type { Meta, StoryObj } from '@storybook/nextjs';

const meta = {
  title: 'Example/Icon',
  component: Icon,
  tags: ['autodocs'],
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SampleIcon: Story = {
  args: {
    icon: 'search',
    className: 'text-card-foreground',
  },
};
