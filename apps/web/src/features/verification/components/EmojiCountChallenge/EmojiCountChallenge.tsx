import { Input } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import type { ChangeEvent } from 'react';
import { useEmojiCountData } from '../../hooks';
import { EmojiCanvas } from './EmojiCanvas';

interface EmojiCountChallengeProps {
  className?: string;
  onResolved: () => void;
}

export function EmojiCountChallenge({
  className,
  onResolved,
}: EmojiCountChallengeProps) {
  const t = useTranslations();
  const { items, solutions } = useEmojiCountData({});
  const fieldId = 'emojiCountChallengeField';

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (solutions.includes(inputValue)) {
      onResolved();
    }
  };

  return (
    <div className={`w-full max-w-[350px] flex flex-col gap-3 ${className}`}>
      <p className="text-sm">{t('verification.captcha.emojiHint')}</p>
      <EmojiCanvas width={350} height={250} items={items} />
      <Input
        type="text"
        className="w-full"
        id={fieldId}
        placeholder="Emoji with the highest occurance count"
        onChange={handleInputChange}
      />
    </div>
  );
}
