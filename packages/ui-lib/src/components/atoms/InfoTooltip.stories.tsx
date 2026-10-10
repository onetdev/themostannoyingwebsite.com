import type { Meta, StoryObj } from '@storybook/nextjs';

import { InfoTooltip } from './InfoTooltip';
import { TooltipProvider } from './Tooltip';

const meta = {
  title: 'Atoms/InfoTooltip',
  component: InfoTooltip,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Info icon that reveals help text in a tooltip. The trigger is a real, labelled `<button>` so it stays keyboard reachable.',
      },
    },
  },
  argTypes: {
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
    },
  },
} satisfies Meta<typeof InfoTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'More information',
    children: 'Adds a fake, long loading delay to all searches.',
  },
  render: (args) => (
    <TooltipProvider>
      <InfoTooltip {...args} />
    </TooltipProvider>
  ),
};

export const LongContent: Story = {
  args: {
    label: 'More information',
    side: 'right',
    children:
      'Periodically shows a newsletter subscription modal, especially when the page comes back from inactivity (switching tabs).',
  },
  render: (args) => (
    <TooltipProvider>
      <InfoTooltip {...args} />
    </TooltipProvider>
  ),
};
