import type { Meta, StoryObj } from '@storybook/nextjs';

import { ToggleGroup, ToggleGroupItem } from './ToggleGroup';

const meta = {
  title: 'Atoms/ToggleGroup',
  component: ToggleGroup,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Core Shadcn ToggleGroup component. See [official documentation](https://ui.shadcn.com/docs/components/toggle-group).',
      },
    },
  },
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ToggleGroup defaultValue={['center']}>
      <ToggleGroupItem value="left">Left</ToggleGroupItem>
      <ToggleGroupItem value="center">Center</ToggleGroupItem>
      <ToggleGroupItem value="right">Right</ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Outline: Story = {
  render: () => (
    <ToggleGroup defaultValue={['monthly']}>
      <ToggleGroupItem value="monthly" variant="outline">
        Monthly
      </ToggleGroupItem>
      <ToggleGroupItem value="yearly" variant="outline">
        Yearly
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};
