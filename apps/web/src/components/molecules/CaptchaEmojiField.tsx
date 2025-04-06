import { FunctionComponent } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import CaptchaEmoji from '@/root/apps/web/src/components/atoms/CaptchaEmoji';
import FormFieldError from '@/root/apps/web/src/components/atoms/FormFieldError';
import TextInput from '@/root/apps/web/src/components/atoms/TextInput';
import { useTranslations } from 'next-intl';

export type CaptchaEmojiFieldProps = {
  errors: FieldErrors<CaptchaFormInputs>;
  register: UseFormRegister<CaptchaFormInputs>;
};

const CaptchaEmojiField: FunctionComponent<CaptchaEmojiFieldProps> = ({
  register,
  errors,
}) => {
  const t = useTranslations();

  return (
    <div className="flex flex-col">
      <label>
        <h4 className="mb-1">{t('form.captcha.field')}</h4>
        <small>{t('form.captcha.captchaEmojiHint')}</small>
        <CaptchaEmoji
          className="my-3 rounded-md border border-on-background"
          width={300}
          height={100}
        />
        <TextInput
          type="text"
          className="w-[300px]"
          {...register('captcha', {
            required: t('form.validation.error.required'),
            pattern: {
              value: /^[XyZ123]{444}$/,
              message: t('form.validation.error.captchaInvalid'),
            },
          })}
        />
      </label>
      <FormFieldError error={errors.captcha} />
    </div>
  );
};

export default CaptchaEmojiField;
