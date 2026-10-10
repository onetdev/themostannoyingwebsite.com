import type { Meta, StoryObj } from '@storybook/nextjs';

import { Button } from './Button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './Collapsible';

const meta = {
  title: 'Atoms/Collapsible',
  component: Collapsible,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Core Shadcn Collapsible component. See [official documentation](https://ui.shadcn.com/docs/components/collapsible).',
      },
    },
  },
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Collapsible className="w-[350px] flex flex-col gap-2" defaultOpen>
      <CollapsibleTrigger
        render={<Button variant="outline" className="w-full" />}
      >
        Toggle details
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="rounded-md border p-4 text-sm">
          Replies and other secondary content live here.
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
};
