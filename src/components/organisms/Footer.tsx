import Link from 'next/link';
import { FunctionComponent } from 'react';

import config from '@/config';
import { useTranslations } from 'next-intl';

const Footer: FunctionComponent = () => {
  const t = useTranslations('common');

  return (
    <footer
      id="footer"
      className="mt-12 flex flex-col justify-between gap-4 border-t border-hr-surface px-0 py-5 text-xs md:flex-row">
      <span className="mr-2">
        {t('app.copyright', { year: new Date().getFullYear() })}.{' '}
        <Link href="https://onet.dev">Konrád Koller</Link>
      </span>
      <span>
        <Trans
          i18nKey="app.recruiting"
          t={t}
          components={{
            linkTag: (
              <Link
                href={config.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                prefetch={false}
              />
            ),
          }}
        />
        &nbsp;
        {t('app.aiDisclose')}
        &nbsp;
        {t('app.dataStorageDisclaimer')}
      </span>
    </footer>
  );
};

export default Footer;
