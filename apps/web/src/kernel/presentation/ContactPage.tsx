import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  PageHeadline,
  Separator,
} from '@maw/ui-lib';
import { getTranslations } from 'next-intl/server';

import { ContactForm } from './forms';

import { getAppConfigService } from '@/kernel';

export async function ContactPage() {
  const t = await getTranslations();
  const config = getAppConfigService().getDeploymentMeta();
  const githubUrl = getAppConfigService().getDeploymentMeta().githubUrl;

  return (
    <>
      <PageHeadline className="mx-auto w-full max-w-screen-lg">
        {t('navigation.contact')}
      </PageHeadline>

      <div className="mx-auto mt-10 grid w-full max-w-screen-lg grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-6">
          <p className="text-xl leading-relaxed">
            {t('app.contactForm.intro')}
          </p>
          <p className="text-muted-foreground text-base">
            {t.rich('app.contactForm.reportIssues', {
              linkTag: (chunks) => (
                <a
                  href={`${githubUrl}/issues`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline">
                  {chunks}
                </a>
              ),
            })}
          </p>
          <div className="hidden lg:block">
            <Separator className="my-4" />
            <p className="text-muted-foreground text-sm italic">
              {t.rich('app.contactForm.alternative', {
                email: config.contactEmail,
                linkTag: (chunks) => (
                  <a
                    href={`mailto:${config.contactEmail}`}
                    className="text-primary hover:underline">
                    {chunks}
                  </a>
                ),
              })}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>{t('app.contactForm.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <ContactForm contactEmail={config.contactEmail} />
            </CardContent>
          </Card>

          <div className="lg:hidden">
            <Separator className="my-4" />
            <p className="text-muted-foreground text-center text-sm italic">
              {t.rich('app.contactForm.alternative', {
                email: config.contactEmail,
                linkTag: (chunks) => (
                  <a
                    href={`mailto:${config.contactEmail}`}
                    className="text-primary hover:underline">
                    {chunks}
                  </a>
                ),
              })}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
