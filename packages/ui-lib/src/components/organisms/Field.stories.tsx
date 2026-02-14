import type { Meta, StoryObj } from '@storybook/react';

import { Input } from '../atoms';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from './Field';

const meta = {
  title: 'Organisms/Field',
  component: Field,
  tags: ['autodocs'],
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Field>
      <FieldLabel htmlFor="email">Email address</FieldLabel>
      <FieldContent>
        <Input id="email" type="email" placeholder="m@example.com" />
        <FieldDescription>We will never share your email.</FieldDescription>
      </FieldContent>
    </Field>
  ),
};

export const WithError: Story = {
  render: () => (
    <Field>
      <FieldLabel htmlFor="email-error">Email address</FieldLabel>
      <FieldContent>
        <Input
          id="email-error"
          type="email"
          placeholder="m@example.com"
          aria-invalid="true"
        />
        <FieldError errors={[{ message: 'Invalid email address' }]} />
      </FieldContent>
    </Field>
  ),
};
