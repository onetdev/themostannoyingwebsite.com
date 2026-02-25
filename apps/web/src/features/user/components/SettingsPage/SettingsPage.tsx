import { PageHeadline } from '@maw/ui-lib';
import { getTranslations } from 'next-intl/server';

import { MandatoryExperienceInfo } from './MandatoryExperienceInfo';
import { PainPreferences } from './PainPreferences';
import { RuntimeInfo } from './RuntimeInfo';
import { UserGrantsSettings } from './UserGrantsSettings';
import { UserPreferences } from './UserPreferences';

export async function SettingsPage() {
  const t = await getTranslations();

  return (
    <>
      <PageHeadline>{t('navigation.settings')}</PageHeadline>

      <div className="grid gap-3 md:grid-cols-2">
        <UserPreferences />
        <UserGrantsSettings />
        <PainPreferences
          className="md:col-span-2"
          listClassName="grid gap-3 grid-cols-1 md:gap-x-10 md:grid-cols-2 lg:grid-cols-3"
        />
        <MandatoryExperienceInfo />
        <RuntimeInfo />
      </div>
    </>
  );
}
