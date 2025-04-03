import { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';
import { PasswordReminderPage } from './password-reminder-page';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    title: t('navigation.passwordReminder'),
  };
}

export default function Page() {
  return <PasswordReminderPage />
};
