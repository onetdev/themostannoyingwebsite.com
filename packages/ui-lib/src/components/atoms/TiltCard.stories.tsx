import type { Meta, StoryObj } from '@storybook/react';

import { TiltCard } from './TiltCard';

const meta = {
  title: 'Atoms/TiltCard',
  component: TiltCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Mouse-reactive 3D tilt wrapper. Move the pointer over the card to tilt it; touch devices and reduced-motion users get a flat card. Enable `holographic` for a `color-dodge` foil that shifts with the tilt.',
      },
    },
  },
  args: {
    maxAngle: 10,
    scale: 1.02,
    perspective: 800,
    holographic: false,
  },
} satisfies Meta<typeof TiltCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const CardContent = () => (
  <>
    <h3 className="mb-2 text-lg font-semibold">Tilt me</h3>
    <p className="text-muted-foreground text-sm">
      Move your cursor over the card to see the 3D tilt.
    </p>
  </>
);

export const Default: Story = {
  render: (args) => (
    <div className="flex justify-center p-10">
      <TiltCard
        {...args}
        className="w-[320px]"
        planeClassName="bg-card border-border rounded-xl border p-6 shadow-sm"
      >
        <CardContent />
      </TiltCard>
    </div>
  ),
};

export const Holographic: Story = {
  args: {
    holographic: true,
  },
  render: (args) => (
    <div className="flex justify-center p-10">
      <TiltCard
        {...args}
        className="w-[320px]"
        planeClassName="bg-card border-border rounded-xl border shadow-sm"
      >
        <div className="p-6">
          <CardContent />
        </div>
      </TiltCard>
    </div>
  ),
};
