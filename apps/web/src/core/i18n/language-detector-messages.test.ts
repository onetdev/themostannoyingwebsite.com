import i18nConfig from '@/root/i18n.config';
import { LANGUAGE_DETECTOR_MESSAGES } from './language-detector-messages';

const MESSAGE_KEYS = ['detected', 'switch', 'stay'] as const;

describe('LANGUAGE_DETECTOR_MESSAGES', () => {
  it('covers every configured locale', () => {
    expect(Object.keys(LANGUAGE_DETECTOR_MESSAGES).sort()).toEqual(
      [...i18nConfig.locales].sort(),
    );
  });

  it('provides non-empty copy carrying the {language} placeholder', () => {
    for (const messages of Object.values(LANGUAGE_DETECTOR_MESSAGES)) {
      for (const key of MESSAGE_KEYS) {
        expect(messages[key].trim().length).toBeGreaterThan(0);
        expect(messages[key]).toContain('{language}');
      }
    }
  });
});
