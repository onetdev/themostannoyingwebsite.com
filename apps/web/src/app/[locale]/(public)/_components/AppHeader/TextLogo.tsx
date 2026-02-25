import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';

export function TextLogo() {
  const t = useTranslations();

  return (
    <div className="font-semibold tracking-tighter">
      <Link href="/" prefetch={false} title={t('app.title')}>
        {/* Mobile */}
        <span className="text-card-foreground text-2xl lg:hidden">
          <i className="font-light">the</i>{' '}
          <span className="text-primary">MAW</span>
        </span>
        {/* Desktop logo */}
        <span className="hidden text-3xl lg:inline-block">
          <span className="text-card-foreground">
            <i className="text-3xl font-light opacity-80">the</i>{' '}
            <span>
              <span className="text-primary">Most</span> Annoying Website
            </span>
          </span>
        </span>
      </Link>
    </div>
  );
}
