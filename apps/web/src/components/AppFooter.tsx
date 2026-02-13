import { getTranslations } from 'next-intl/server';

import { Link } from '@/i18n/navigation';
import { getAppConfigService } from '@/kernel';

export type AppFooterProps = {
  className: JSXProxyProps<'footer'>['className'];
};

export async function AppFooter({ className }: AppFooterProps) {
  const t = await getTranslations();
  const config = getAppConfigService().getAll();

  const sections = [
    {
      title: t('navigation.home'),
      links: [
        { href: '/', label: t('navigation.home') },
        { href: '/hot-things', label: t('navigation.hotThings') },
        { href: '/dilf', label: t('navigation.dilf') },
        { href: '/about', label: t('navigation.about') },
        { href: '/contact', label: t('navigation.contact') },
        { href: '/donate', label: t('navigation.donate') },
      ],
    },
    {
      title: t('navigation.login'),
      links: [
        { href: '/user/login', label: t('navigation.login') },
        { href: '/user/signup', label: t('navigation.signup') },
        {
          href: '/user/password-reminder',
          label: t('navigation.passwordReminder'),
        },
      ],
    },
    {
      title: t('navigation.settings'),
      links: [
        { href: '/settings', label: t('navigation.settings') },
        { href: '/privacy-policy', label: t('navigation.privacyPolicy') },
      ],
    },
  ];

  return (
    <footer
      id="footer"
      role="contentinfo"
      className={`border-border-surface border-t px-5 py-10 xl:px-8 ${className}`}>
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 md:grid-cols-4">
        {sections.map((section) => (
          <div key={section.title}>
            <h3 className="mb-4 text-sm font-semibold">{section.title}</h3>
            <ul className="space-y-2">
              {section.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-xs hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-border-surface mt-10 flex flex-col justify-between gap-4 border-t pt-8 text-xs md:flex-row">
        <span className="mr-2">
          {t('app.copyright', { year: new Date().getFullYear() })}.{' '}
          <Link href="https://onet.dev" className="hover:underline">
            Konrád Koller
          </Link>
        </span>
        <span className="flex flex-wrap gap-x-4 gap-y-2">
          {t.rich('app.recruiting', {
            linkTag: (chunks) => (
              <Link
                href={config.deploymentMeta.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                prefetch={false}
                className="hover:underline">
                {chunks}
              </Link>
            ),
          })}
          <span>{t('app.aiDisclose')}</span>
          <span>{t('app.dataStorageDisclaimer')}</span>
        </span>
      </div>
    </footer>
  );
}
