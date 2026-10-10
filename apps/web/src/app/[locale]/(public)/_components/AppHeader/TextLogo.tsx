import { useTranslations } from 'next-intl';

import { Link } from '@/core/i18n/navigation';

export function TextLogo() {
  const t = useTranslations();

  return (
    <div className="font-semibold tracking-tighter">
      <Link href="/" prefetch={false} title={t('common.app.title')}>
        {/* Short logo: mobile, and large desktop where the nav sits inline */}
        <span className="text-card-foreground text-2xl lg:hidden xl:inline-block">
          {t.rich('common.app.logoShort', {
            the: (chunks) => <i className="font-light">{chunks}</i>,
            most: (chunks) => <span className="text-primary">{chunks}</span>,
          })}
        </span>
        {/* Full wordmark: medium desktop only */}
        <span className="hidden text-2xl lg:inline-block xl:hidden">
          <span className="text-card-foreground">
            {t.rich('common.app.logoAlt', {
              the: (chunks) => (
                <i className="text-2xl font-light opacity-80">{chunks}</i>
              ),
              most: (chunks) => <span className="text-primary">{chunks}</span>,
            })}
          </span>
        </span>
      </Link>
    </div>
  );
}
