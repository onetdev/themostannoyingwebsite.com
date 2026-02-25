'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@maw/ui-lib';
import { formatSecondsToHHMMSS } from '@maw/utils/formatter';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import ReactTimeAgo from 'react-timeago';

import { useRuntimeStore } from '@/stores';

export function RuntimeInfo() {
  const runtime = useRuntimeStore();
  const t = useTranslations();

  const startedAt = useMemo(
    () => (runtime.startedAt ? new Date(runtime.startedAt) : undefined),
    [runtime.startedAt],
  );

  return (
    <Card data-testid="runtime-settings">
      <CardHeader>
        <CardTitle>{t('settings.runtime.title')}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        <small className="text-muted-foreground">
          <i>{t('settings.runtime.disclaimer')}</i>
        </small>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="w-3/5 font-medium">
                {t('settings.runtime.startedAgo')}
              </TableCell>
              <TableCell>
                {startedAt ? (
                  <ReactTimeAgo date={startedAt} />
                ) : (
                  t('common.notAvailable')
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-3/5 font-medium">
                {t('settings.runtime.visibilitySeconds')}
              </TableCell>
              <TableCell>
                {formatSecondsToHHMMSS(runtime.document.visibilitySeconds)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-3/5 font-medium">
                {t('settings.runtime.isDocumentVisible')}
              </TableCell>
              <TableCell>
                {runtime.document.isVisible ? t('common.yes') : t('common.no')}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-3/5 font-medium">
                {t('settings.runtime.userActivation')}
              </TableCell>
              <TableCell>
                {runtime.userActivation.unlocked
                  ? t('common.completed')
                  : t('common.pending')}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-3/5 font-medium">
                {t('settings.runtime.lastActivation')}
              </TableCell>
              <TableCell>
                {runtime.userActivation.lastEventAt > 0 ? (
                  <ReactTimeAgo date={runtime.userActivation.lastEventAt} />
                ) : (
                  t('common.notAvailable')
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-3/5 font-medium">
                {t('settings.runtime.navigationCount')}
              </TableCell>
              <TableCell>{runtime.navigationCount}</TableCell>
            </TableRow>
            {runtime.adblockerSuspected !== null && (
              <TableRow>
                <TableCell className="w-3/5 font-medium">
                  {runtime.adblockerSuspected
                    ? t('settings.runtime.adblockerSuspected')
                    : t('settings.runtime.adblockerNotDetected')}
                </TableCell>
                <TableCell>✅</TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell className="w-3/5 font-medium">
                {t('settings.runtime.flaimSurveyResult')}
              </TableCell>
              <TableCell>
                {runtime.flaimSurveyResult
                  ? t('common.done')
                  : t('common.pending')}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
