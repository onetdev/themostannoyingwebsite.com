import Link from 'next/link';
import { Trans, useTranslation } from 'next-i18next';
import { FunctionComponent } from 'react';

import config from '@/config';

const Footer: FunctionComponent = () => {
  const { t } = useTranslation(['common']);

  return (
    <footer className="mt-12 flex flex-col justify-between gap-4 border-t border-on-surface px-0 py-5 text-xs md:flex-row">
      <span className="mr-2">
        {t('meta.copyright', { year: new Date().getFullYear() })}
      </span>
      <span>
        <Trans
          i18nKey="meta.recruiting"
          t={t}
          components={{
            linkTag: (
              <Link
                href={config.githubRepo}
                target="_blank"
                rel="noopener noreferrer"
                prefetch={false}
              />
            ),
          }}
        />
        &nbsp;
        {t('meta.aiDisclose')}
      </span>
    </footer>
  );
};

export default Footer;
