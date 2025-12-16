import { getTranslations } from 'next-intl/server';

import { Link } from '@/i18n/navigation';
import { getAppConfigService } from '@/kernel';

export type AppFooterProps = {
  className: JSXProxyProps<'footer'>['className'];
};

export async function AppFooter({ className }: AppFooterProps) {
  const t = await getTranslations();
  const config = getAppConfigService().getAll();

  return (
    <footer
      id="footer"
      role="contentinfo"
      className={`border-border-surface flex flex-col justify-between gap-4 border-t px-5 py-5 text-xs md:flex-row xl:px-8 ${className}`}>
      <span className="mr-2">
        {t('app.copyright', { year: new Date().getFullYear() })}.{' '}
        <Link href="https://onet.dev">Konrád Koller</Link>
      </span>
      <span>
        {t.rich('app.recruiting', {
          linkTag: (chunks) => (
            <Link
              href={config.deploymentMeta.githubUrl}
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
}
