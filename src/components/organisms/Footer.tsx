import { Trans, useTranslation } from 'next-i18next';
import Link from 'next/link';
import { FunctionComponent } from 'react';

const Footer: FunctionComponent = () => {
  const { t } = useTranslation(['common']);

  return (
    <footer className="mt-12 border-t border-tertiary px-0 py-5 text-xs">
      <Trans
        i18nKey="meta.recruiting"
        t={t}
        components={{
          linkTag: (
            <Link
              href="https://github.com/onetdev/themostannoyingwebsite.com"
              target="_blank"
              rel="noopener noreferrer"
            />
          ),
        }}
      />
    </footer>
  );
};

export default Footer;
