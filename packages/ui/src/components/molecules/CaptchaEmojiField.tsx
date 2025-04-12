import { FunctionComponent } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { CaptchaEmoji } from '../atoms/CaptchaEmoji';
import { FormFieldError } from '../atoms/FormFieldError';
import { TextInput } from '../atoms/TextInput';

export type CaptchaEmojiFieldProps = {
  errors: FieldErrors<CaptchaFormInputs>;
  register: UseFormRegister<CaptchaFormInputs>;
  text: {
    label: string;
    hint: string;
    required: string;
    invalid: string;
  }
};

export const CaptchaEmojiField: FunctionComponent<CaptchaEmojiFieldProps> = ({
  register,
  errors,
  text
}) => {
  return (
    <div className="flex flex-col">
      <label>
        <h4 className="mb-1">{text.label}</h4>
        <small>{text.hint}</small>
        <CaptchaEmoji
          className="my-3 rounded-md border border-on-background"
          width={300}
          height={100}
        />
        <TextInput
          type="text"
          className="w-[300px]"
          {...register('captcha', {
            required: text.required,
            pattern: {
              value: /^[XyZ123]{444}$/,
              message: text.invalid,
            },
          })}
        />
      </label>
      <FormFieldError error={errors.captcha} />
    </div>
  );
};
