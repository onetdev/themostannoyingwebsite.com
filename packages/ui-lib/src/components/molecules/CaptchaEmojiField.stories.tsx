import type { Meta, StoryObj } from '@storybook/react';
import { useForm, FormProvider } from 'react-hook-form';

import { CaptchaEmojiField } from './CaptchaEmojiField';

const FormDecorator = (Story: any) => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <Story />
    </FormProvider>
  );
};

const meta = {
  title: 'Molecules/CaptchaEmojiField',
  component: CaptchaEmojiField,
  tags: ['autodocs'],
  decorators: [FormDecorator],
} satisfies Meta<typeof CaptchaEmojiField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: {
      label: 'Security Check',
      hint: 'Find the most frequent emoji',
    },
  },
};
