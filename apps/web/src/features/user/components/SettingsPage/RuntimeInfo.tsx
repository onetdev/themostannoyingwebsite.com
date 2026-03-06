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
        <CardTitle>{t('user.runtimeInfo.title')}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        <small className="text-muted-foreground">
          <i>{t('user.runtimeInfo.disclaimer')}</i>
        </small>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="w-3/5 font-medium">
                {t('user.runtimeInfo.startedAgo')}
              </TableCell>
              <TableCell>
                {startedAt ? (
                  <ReactTimeAgo date={startedAt} />
                ) : (
                  t('common.state.notAvailable')
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-3/5 font-medium">
                {t('user.runtimeInfo.visibilitySeconds')}
              </TableCell>
              <TableCell>
                {formatSecondsToHHMMSS(runtime.document.visibilitySeconds)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-3/5 font-medium">
                {t('user.runtimeInfo.isDocumentVisible')}
              </TableCell>
              <TableCell>
                {runtime.document.isVisible
                  ? t('common.action.yes')
                  : t('common.action.no')}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-3/5 font-medium">
                {t('user.runtimeInfo.userActivation')}
              </TableCell>
              <TableCell>
                {runtime.userActivation.unlocked
                  ? t('common.state.completed')
                  : t('common.state.pending')}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-3/5 font-medium">
                {t('user.runtimeInfo.lastActivation')}
              </TableCell>
              <TableCell>
                {runtime.userActivation.lastEventAt > 0 ? (
                  <ReactTimeAgo date={runtime.userActivation.lastEventAt} />
                ) : (
                  t('common.state.notAvailable')
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-3/5 font-medium">
                {t('user.runtimeInfo.navigationCount')}
              </TableCell>
              <TableCell>{runtime.navigationCount}</TableCell>
            </TableRow>
            {runtime.adblockerSuspected !== null && (
              <TableRow>
                <TableCell className="w-3/5 font-medium">
                  {runtime.adblockerSuspected
                    ? t('user.runtimeInfo.adblockerSuspected')
                    : t('user.runtimeInfo.adblockerNotDetected')}
                </TableCell>
                <TableCell>✅</TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell className="w-3/5 font-medium">
                {t('user.runtimeInfo.flaimSurveyResult')}
              </TableCell>
              <TableCell>
                {runtime.flaimSurveyResult
                  ? t('common.state.done')
                  : t('common.state.pending')}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
