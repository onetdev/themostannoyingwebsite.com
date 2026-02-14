import type { Meta, StoryObj } from '@storybook/react';

import { ShareModal } from './ShareModal';

const meta = {
  title: 'Organisms/ShareModal',
  component: ShareModal,
  tags: ['autodocs'],
} satisfies Meta<typeof ShareModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    show: true,
    url: 'https://themostannoyingwebsite.com',
    texts: {
      title: 'Share this masterpiece',
      description: 'Make your friends suffer too by sharing this incredibly annoying website.',
    },
    onClose: () => console.log('Close Modal'),
  },
};
