import { FunctionComponent, useMemo } from 'react';

import { mapToLogScale } from '@maw/utils/math';
import { mb_string_to_char_array } from '@maw/utils/string';
import { useTranslations } from 'next-intl';

export type PasswordStrengthBarProps = {
  password: string;
  className?: string;
};

const PasswordStrengthBar: FunctionComponent<PasswordStrengthBarProps> = ({
  password,
  className,
}) => {
  const t = useTranslations();
  const score = useMemo(
    () => mapToLogScale(scorePassword(password || ''), 100, 1),
    [password],
  );

  return (
    <div className={`flex gap-2 text-sm ${className}`}>
      <div className="w-1/3">
        <div className="h-2 w-full max-w-full rounded bg-error" />
        {score <= 0.33 && t('form.validation.passwordStrength.weak')}
      </div>
      <div className="w-1/3">
        {score > 0.33 && (
          <div
            className="h-2 w-full max-w-full rounded bg-warning"
            style={{ width: `${(score - 0.33) * 300}%` }}
          />
        )}
        {score > 0.33 &&
          score <= 0.66 &&
          t('form.validation.passwordStrength.okay')}
      </div>
      <div className="w-1/3">
        {score > 0.66 && (
          <div
            className="h-2 w-full max-w-full rounded bg-success"
            style={{ width: `${(score - 0.66) * 300}%` }}
          />
        )}
        {score > 0.66 && t('form.validation.passwordStrength.veryStrong')}
      </div>
    </div>
  );
};

export const scorePassword = (password: string) => {
  const charArray = mb_string_to_char_array(password);
  const charArrayLength = charArray.length;

  if (charArrayLength <= 12) {
    return 0;
  }

  let score = charArrayLength - 12;

  for (let i = 0; i < charArrayLength; i++) {
    const char = charArray[i];
    if (/[^A-Za-z0-9]/.test(char)) {
      score += 4;
    }
  }

  return score;
};

export default PasswordStrengthBar;
