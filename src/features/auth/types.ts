import {
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';

export const userGenderList = [
  'female',
  'male',
  'other',
  'alien',
  'robot',
  'cyborg',
] as const;
export type UserGender = (typeof userGenderList)[number];

export type RegistrationFormInputs = CaptchaFormInputs & {
  consentNewsletter: boolean;
  consentPrivacyPolicy: boolean;
  dateOfBirth: string;
  gender: UserGender;
  countryCode: string;
  email: string;
  firstName: string;
  lastName: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
  phoneNumberCountry?: string;
  phoneNumber?: number;
  username: string;
};

export type LoginFormInputs = CaptchaFormInputs & {
  email: string;
  password: string;
  remember: boolean;
};

export type PasswordReminderFormInputs = CaptchaFormInputs & {
  email: string;
};

export type CommonRegistrationFormFieldProps = {
  errors: FieldErrors<RegistrationFormInputs>;
  register: UseFormRegister<RegistrationFormInputs>;
  watch: UseFormWatch<RegistrationFormInputs>;
  setValue: UseFormSetValue<RegistrationFormInputs>;
  getValues: UseFormGetValues<RegistrationFormInputs>;
};
