import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../atoms';
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './Drawer';

const meta = {
  title: 'Organisms/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Swipeable bottom sheet built on the Base UI drawer primitive. The sheet opens at 80dvh by default and dismisses with a downward drag, the backdrop, or Esc.',
      },
    },
  },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger render={<Button variant="outline" />}>
        Open drawer
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Comments</DrawerTitle>
          <DrawerDescription>
            Drag the sheet down or press Esc to close it.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerBody className="px-4">
          <div className="space-y-3">
            {Array.from({ length: 12 }, (_, index) => (
              <div
                key={index}
                className="bg-muted h-16 rounded-lg px-4 py-3 text-sm"
              >
                Comment {index + 1}
              </div>
            ))}
          </div>
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};
