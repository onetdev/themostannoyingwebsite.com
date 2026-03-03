import { useTranslations } from 'next-intl';
import { EmojiCanvas } from './EmojiCanvas';

interface EmojiCountChallengeProps {
  onResolved: () => void;
}

export function EmojiCountChallenge({ onResolved }: EmojiCountChallengeProps) {
  const t = useTranslations();

  return (
    <>
      <p className="mb-2 text-sm">{t('verification.captcha.emojiHint')}</p>
      <EmojiCanvas width={300} height={150} onResolved={onResolved} />
    </>
  );
}
