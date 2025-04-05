import { FunctionComponent } from 'react';
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';

import CaptchaTilePuzzle from '@/components/atoms/CaptchaTilePuzzle';
import FormFieldError from '@/components/atoms/FormFieldError';
import { useTranslations } from 'next-intl';

export type CaptchaTitlePuzzleFieldProps = {
  errors: FieldErrors<CaptchaFormInputs>;
  register: UseFormRegister<CaptchaFormInputs>;
  setValue: UseFormSetValue<CaptchaFormInputs>;
};

const CaptchaTitlePuzzleField: FunctionComponent<
  CaptchaTitlePuzzleFieldProps
> = ({ register, errors, setValue }) => {
  const t = useTranslations();

  return (
    <div className="flex flex-col">
      <h4 className="mb-1">{t('form.captcha.field')}</h4>
      <small>{t('form.captcha.captchaTilePuzzleHint')}</small>
      <CaptchaTilePuzzle
        className="my-3 rounded-md border border-on-background"
        cols={6}
        rows={4}
        imageSrc="/assets/images/captcha-tile-abstract.jpg"
        onResolved={() => setValue('captcha', 'true')}
      />
      <input
        type="hidden"
        {...register('captcha', {
          required: t('form.validation.error.captchaInvalid'),
        })}
      />
      <FormFieldError error={errors.captcha} />
    </div>
  );
};

export default CaptchaTitlePuzzleField;
