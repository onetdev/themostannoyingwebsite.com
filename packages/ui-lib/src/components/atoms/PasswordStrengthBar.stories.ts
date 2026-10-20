import type { Meta, StoryObj } from '@storybook/react';

import { PasswordStrengthBar } from './PasswordStrengthBar';

const meta: Meta<typeof PasswordStrengthBar> = {
  title: 'Example/PasswordStrengthBar',
  component: PasswordStrengthBar,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SamplePasswordStrengthBar: Story = {
  args: {
    password: 'Password!666',
    text: {
      label: 'Password Strength',
      weak: 'Weak',
      okay: 'Okay',
      veryStrong: 'Very Strong',
    },
  },
};
