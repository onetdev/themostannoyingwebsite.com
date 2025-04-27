import { mapToLogScale } from '@maw/utils/math';
import { mb_string_to_char_array } from '@maw/utils/string';
import { FunctionComponent, useMemo } from 'react';

export type PasswordStrengthBarProps = {
  password: string;
  className?: string;
  text: {
    label: string;
    weak: string;
    okay: string;
    veryStrong: string;
  };
};

export const PasswordStrengthBar: FunctionComponent<
  PasswordStrengthBarProps
> = ({ password, className, text }) => {
  const score = useMemo(
    () => mapToLogScale(scorePassword(password || ''), 100, 1),
    [password],
  );

  return (
    <div className={`flex gap-2 text-sm ${className}`} aria-label={text.label}>
      <div className="w-1/3">
        <div className="bg-error h-2 w-full max-w-full rounded" />
        {score <= 0.33 && <p className="py-1 pl-1">{text.weak}</p>}
      </div>
      <div className="w-1/3">
        {score > 0.33 && (
          <div
            className="bg-warning h-2 w-full max-w-full rounded transition duration-100 ease-in-out"
            style={{ width: `${(score - 0.33) * 300}%` }}
          />
        )}
        {score > 0.33 && score <= 0.66 && (
          <p className="py-1 pl-1">{text.okay}</p>
        )}
      </div>
      <div className="w-1/3">
        {score > 0.66 && (
          <div
            className="bg-success h-2 w-full max-w-full rounded transition duration-100 ease-in-out"
            style={{ width: `${(score - 0.66) * 300}%` }}
          />
        )}
        {score > 0.66 && <p className="py-1 pl-1">{text.veryStrong}</p>}
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
