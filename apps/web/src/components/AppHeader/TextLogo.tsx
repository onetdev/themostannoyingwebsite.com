import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';

export function TextLogo() {
  const t = useTranslations();

  return (
    <div className="font-semibold tracking-tighter">
      <Link href="/" prefetch={false} title={t('app.title')}>
        {/* Mobile */}
        <span className="text-on-surface text-2xl md:hidden">
          <i className="font-light">the</i>{' '}
          <span className="text-primary">MAW</span>
        </span>
        {/* Desktop logo */}
        <span className="hidden text-3xl md:inline-block">
          <span className="text-on-surface">
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
