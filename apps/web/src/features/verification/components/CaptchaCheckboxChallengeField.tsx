'use client';

import { Field, FieldContent, FieldError, FieldLabel } from '@maw/ui-lib';
import { useFormContext } from 'react-hook-form';
import { CaptchaCheckboxChallenge } from './CaptchaCheckboxChallenge';

export type CaptchaCheckboxChallengeFieldProps = {
  fieldName?: string;
  required?: boolean;
  text: {
    label: string;
    proveYouAreRobot: string;
    emojiHint: string;
    tilePuzzleHint: string;
    gridSelectHint: string;
    gridSelectPrompts: string[];
    invalid: string;
  };
  assets: {
    captchaTile: string;
    captchaRandom: string[];
  };
};

export function CaptchaCheckboxChallengeField({
  fieldName = 'captcha',
  required,
  text,
  assets,
}: CaptchaCheckboxChallengeFieldProps) {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();

  return (
    <Field>
      <FieldLabel required={required}>{text.label}</FieldLabel>
      <FieldContent>
        <div className="my-3">
          <CaptchaCheckboxChallenge
            text={text}
            assets={assets}
            onResolved={() => setValue(fieldName, 'true')}
          />
        </div>
        <input
          type="hidden"
          {...register(fieldName, {
            required: text.invalid,
          })}
        />
        <FieldError errors={[errors[fieldName]]} />
      </FieldContent>
    </Field>
  );
}
