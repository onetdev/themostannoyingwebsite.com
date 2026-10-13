import type { Meta, StoryObj } from '@storybook/nextjs';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from './Card';
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from './Chart';

const meta = {
  title: 'Organisms/Chart',
  component: ChartContainer,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Core Shadcn Chart primitives, built on [Recharts](https://ui.shadcn.com/docs/components/chart). See the [charts gallery](https://ui.shadcn.com/charts) for more examples.',
      },
    },
  },
} satisfies Meta<typeof ChartContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

const data = [
  { month: 'Jan', received: 42, spent: 118 },
  { month: 'Feb', received: 17, spent: 121 },
  { month: 'Mar', received: 88, spent: 130 },
  { month: 'Apr', received: 5, spent: 126 },
  { month: 'May', received: 63, spent: 142 },
  { month: 'Jun', received: 9, spent: 151 },
];

const config = {
  received: {
    label: 'Support received',
    color: 'var(--chart-1)',
  },
  spent: {
    label: 'Running costs',
    color: 'var(--chart-3)',
  },
} satisfies ChartConfig;

export const Default: Story = {
  args: { config, children: null },
  render: () => (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>Support received vs. running costs</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="h-[280px] w-full">
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="received" fill="var(--color-received)" radius={4} />
            <Bar dataKey="spent" fill="var(--color-spent)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  ),
};
