import { Link } from '@/i18n/navigation';
import { FunctionComponent } from 'react';

import config from '@/config';
import { useTranslations } from 'next-intl';

export const AppFooter: FunctionComponent = () => {
  const t = useTranslations();

  return (
    <footer
      id="footer"
      role="contentinfo"
      className="border-hr-surface mt-12 flex flex-col justify-between gap-4 border-t px-0 py-5 text-xs md:flex-row">
      <span className="mr-2">
        {t('app.copyright', { year: new Date().getFullYear() })}.{' '}
        <Link href="https://onet.dev">Konrád Koller</Link>
      </span>
      <span>
        {t.rich('app.recruiting', {
          linkTag: (chunks) => (
            <Link
              href={config.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              prefetch={false}>
              {chunks}
            </Link>
          ),
        })}
        &nbsp;
        {t('app.aiDisclose')}
        &nbsp;
        {t('app.dataStorageDisclaimer')}
      </span>
    </footer>
  );
};
