import type { Meta, StoryObj } from '@storybook/react';
import { useForm, FormProvider } from 'react-hook-form';

import { CaptchaTitlePuzzleField } from './CaptchaTitlePuzzleField';

const FormDecorator = (Story: any) => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <Story />
    </FormProvider>
  );
};

const meta = {
  title: 'Molecules/CaptchaTitlePuzzleField',
  component: CaptchaTitlePuzzleField,
  tags: ['autodocs'],
  decorators: [FormDecorator],
} satisfies Meta<typeof CaptchaTitlePuzzleField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: {
      label: 'Solve this puzzle',
      hint: 'Move the tiles to restore the image',
      invalid: 'Please solve the puzzle first',
    },
  },
};
