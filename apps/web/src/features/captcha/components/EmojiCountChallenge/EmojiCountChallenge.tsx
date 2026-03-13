import { Input } from '@maw/ui-lib';
import { clsx } from '@maw/ui-lib/utils';
import { useTranslations } from 'next-intl';
import type { ChangeEvent } from 'react';
import { useAppConfigContext } from '@/core/config/react/AppConfig';
import { useEmojiCountChallengeData } from '../../hooks';
import { EmojiCanvas } from './EmojiCanvas';

interface EmojiCountChallengeProps {
  className?: string;
  onProgress: (score: number) => void;
}

export function EmojiCountChallenge({
  className,
  onProgress,
}: EmojiCountChallengeProps) {
  const t = useTranslations();
  const {
    captcha: { emojiChallengeCount },
  } = useAppConfigContext();
  const { items, solutions } = useEmojiCountChallengeData({
    count: emojiChallengeCount,
  });
  const fieldId = 'emojiCountChallengeField';

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    onProgress(solutions.includes(inputValue) ? 1 : 0);
  };

  return (
    <div
      className={clsx(`w-full max-w-[350px] flex flex-col gap-3`, className)}
    >
      <p className="text-sm">{t('humanVerification.captcha.emojiHint')}</p>
      <EmojiCanvas width={350} height={250} items={items} />
      <Input
        type="text"
        className="w-full"
        id={fieldId}
        placeholder={t('humanVerification.captcha.emojiChallengePlaceholder')}
        onChange={handleInputChange}
      />
    </div>
  );
}
