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

export type RegistrationFormInputs = {
  consentNewsletter: boolean;
  consentPrivacyPolicy: boolean;
  dateOfBirth: string;
  captcha: string;
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

export type LoginFormInputs = {
  email: string;
  password: string;
  remember: boolean;
  captcha: string;
};

export type PasswordReminderFormInputs = {
  email: string;
  captcha: string;
};

export type CommonRegistrationFormFieldProps = {
  errors: FieldErrors<RegistrationFormInputs>;
  register: UseFormRegister<RegistrationFormInputs>;
  watch: UseFormWatch<RegistrationFormInputs>;
  setValue: UseFormSetValue<RegistrationFormInputs>;
  getValues: UseFormGetValues<RegistrationFormInputs>;
};
