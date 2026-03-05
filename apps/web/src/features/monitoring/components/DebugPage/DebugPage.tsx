'use client';

import {
  Button,
  PageHeadline,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import config from '@/core/config';
import { useAchievementsStore } from '@/features/achievements/stores';
import { useMonitoringStore } from '@/features/monitoring/stores';
import {
  usePainPreferencesStore,
  useRuntimeStore,
  useUserGrantsStore,
  useUserPreferencesStore,
} from '@/stores';
import { useDebugAuth } from '../../hooks';
import { DebugAuthGate } from './DebugAuthGate';
import { EventTester } from './EventTester';
import { StoreInspector } from './StoreInspector';

export function DebugPage() {
  const t = useTranslations();
  const runtime = useRuntimeStore();
  const monitoring = useMonitoringStore();
  const painPreferences = usePainPreferencesStore();
  const achievements = useAchievementsStore();
  const userPreferences = useUserPreferencesStore();
  const userGrants = useUserGrantsStore();
  const { logout } = useDebugAuth();

  return (
    <DebugAuthGate>
      <div className="container mx-auto space-y-8 py-10 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-4">
            <PageHeadline className="mb-0 text-destructive">
              DEBUG_MODE
            </PageHeadline>
            <span className="font-mono text-xs opacity-50 uppercase tracking-widest hidden sm:inline">
              {t('debug.internalOnly')}
            </span>
          </div>
          <Button variant="outline" size="sm" onClick={logout}>
            {t('debug.logout')}
          </Button>
        </div>

        <Tabs defaultValue="stores" className="w-full">
          <TabsList
            variant="line"
            className="flex w-full justify-start border-b rounded-none bg-transparent h-auto p-0 mb-8 whitespace-nowrap"
          >
            <TabsTrigger
              value="stores"
              className="px-6 py-3 font-medium transition-colors"
            >
              {t('debug.tabs.stores')}
            </TabsTrigger>
            <TabsTrigger
              value="events"
              className="px-6 py-3 font-medium transition-colors"
            >
              {t('debug.tabs.events')}
            </TabsTrigger>
            <TabsTrigger
              value="config"
              className="px-6 py-3 font-medium transition-colors"
            >
              {t('debug.tabs.config')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stores">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <StoreInspector
                title={t('debug.storeInspector.runtime')}
                data={runtime}
              />
              <StoreInspector
                title={t('debug.storeInspector.monitoring')}
                data={monitoring}
              />
              <StoreInspector
                title={t('debug.storeInspector.painPreferences')}
                data={painPreferences}
              />
              <StoreInspector
                title={t('debug.storeInspector.achievements')}
                data={achievements}
              />
              <StoreInspector
                title={t('debug.storeInspector.userPreferences')}
                data={userPreferences}
              />
              <StoreInspector
                title={t('debug.storeInspector.userGrants')}
                data={userGrants}
              />
            </div>
          </TabsContent>

          <TabsContent value="events">
            <div className="max-w-4xl mx-auto">
              <EventTester />
            </div>
          </TabsContent>

          <TabsContent value="config">
            <div className="space-y-6">
              <StoreInspector
                title={t('debug.storeInspector.appConfig')}
                data={config}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DebugAuthGate>
  );
}
