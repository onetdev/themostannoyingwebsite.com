import { getTranslations } from 'next-intl/server';
import type { ComponentProps } from 'react';

import { FOOTER_NAVIGATION_LINKS } from '@/app/navigation';
import { Link } from '@/i18n/navigation';
import { getAppConfigService } from '@/services';

export type AppFooterProps = {
  className: ComponentProps<'footer'>['className'];
};

export async function AppFooter({ className }: AppFooterProps) {
  const t = await getTranslations();
  const config = getAppConfigService().getAll();

  const links = FOOTER_NAVIGATION_LINKS.map((link) => ({
    href: link.path,
    label: t(link.labelKey),
  }));

  return (
    <footer id="footer" className={`border-border border-t ${className}`}>
      <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 px-5 py-5">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-xs hover:underline"
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="text-muted-foreground border-border border-t px-5 py-5 text-center text-xs">
        <span>
          {t('app.copyright', { year: new Date().getFullYear() })}{' '}
          <Link href="https://onet.dev" className="hover:underline">
            Konrád Koller
          </Link>
        </span>
        {' — '}
        <span>
          {t.rich('app.recruiting', {
            linkTag: (chunks) => (
              <Link
                href={config.deploymentMeta.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                prefetch={false}
                className="hover:underline"
              >
                {chunks}
              </Link>
            ),
          })}
        </span>
        {' — '}
        <span>{t('app.aiDisclose')}</span>
        {' — '}
        <span>{t('app.dataStorageDisclaimer')}</span>
        {' — '}
        <span>{t('app.noWarranties')}</span>
      </div>
    </footer>
  );
}
