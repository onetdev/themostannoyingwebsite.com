import type { Meta, StoryObj } from '@storybook/nextjs';

import { PageHeadline } from './PageHeadline';

const meta = {
  title: 'Atoms/PageHeadline',
  component: PageHeadline,
  tags: ['autodocs'],
} satisfies Meta<typeof PageHeadline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Page Headline',
  },
};
