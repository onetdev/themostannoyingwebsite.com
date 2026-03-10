import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export type TranslationDisclaimerProps = {
  currentLocale: AppLocale;
  fallbackLocale?: AppLocale;
  href: string;
  translationKey?: AppTranslationKey;
};

export function TranslationDisclaimer({
  currentLocale,
  fallbackLocale = 'en',
  href,
  translationKey = 'app.translationDisclaimer',
}: TranslationDisclaimerProps) {
  const t = useTranslations();

  if (currentLocale === fallbackLocale) {
    return null;
  }

  return (
    <p className="border-border bg-muted/30 mb-8 border-l-4 py-4 pl-4 text-sm italic">
      {t.rich(translationKey, {
        linkTag: (chunks) => (
          <Link
            href={href}
            locale={fallbackLocale}
            className="hover:underline font-bold"
          >
            {chunks}
          </Link>
        ),
      })}
    </p>
  );
}
