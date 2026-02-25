import type { Meta, StoryObj } from '@storybook/nextjs';

import { Button } from '../atoms';
import { EscapingElement } from './EscapingElement';

const meta = {
  title: 'Organisms/EscapingElement',
  component: EscapingElement,
  tags: ['autodocs'],
} satisfies Meta<typeof EscapingElement>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Hover: Story = {
  args: {
    trigger: 'hover',
    children: <Button>Try to click me</Button>,
  },
};

export const Click: Story = {
  args: {
    trigger: 'activationStart',
    children: <Button>Click me if you can</Button>,
  },
};
