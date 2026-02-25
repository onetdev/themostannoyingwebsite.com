import type { Meta, StoryObj } from '@storybook/nextjs';

import { Icon } from '../atoms';
import { Alert, AlertDescription, AlertTitle } from './Alert';

const meta = {
  title: 'Molecules/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Core Shadcn Alert component. See [official documentation](https://ui.shadcn.com/docs/components/alert).',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'info', 'success'],
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Alert {...args}>
      <Icon icon="info" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
  ),
  args: {
    variant: 'default',
  },
};

export const Destructive: Story = {
  render: (args) => (
    <Alert {...args}>
      <Icon icon="failed" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
  ),
  args: {
    variant: 'destructive',
  },
};

export const Info: Story = {
  render: (args) => (
    <Alert {...args}>
      <Icon icon="info" />
      <AlertTitle>Information</AlertTitle>
      <AlertDescription>
        This is an informational message for the user.
      </AlertDescription>
    </Alert>
  ),
  args: {
    variant: 'info',
  },
};

export const Success: Story = {
  render: (args) => (
    <Alert {...args}>
      <Icon icon="check" />
      <AlertTitle>Success</AlertTitle>
      <AlertDescription>
        Your changes have been saved successfully.
      </AlertDescription>
    </Alert>
  ),
  args: {
    variant: 'success',
  },
};
