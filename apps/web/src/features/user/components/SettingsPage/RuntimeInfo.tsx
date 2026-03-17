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
import { type PropsWithChildren, useMemo } from 'react';
import ReactTimeAgo from 'react-timeago';
import { useTimeagoFormatter } from '@/hooks';
import { useRuntimeStore } from '@/stores';

export function RuntimeInfo() {
  const intlFormatter = useTimeagoFormatter();
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
              <TableCellLabel>
                {t('user.runtimeInfo.startedAgo')}
              </TableCellLabel>
              <TableCellValue>
                {startedAt ? (
                  <ReactTimeAgo date={startedAt} formatter={intlFormatter} />
                ) : (
                  t('common.state.notAvailable')
                )}
              </TableCellValue>
            </TableRow>
            <TableRow>
              <TableCellLabel>
                {t('user.runtimeInfo.visibilitySeconds')}
              </TableCellLabel>
              <TableCellValue>
                {formatSecondsToHHMMSS(runtime.document.visibilitySeconds)}
              </TableCellValue>
            </TableRow>
            <TableRow>
              <TableCellLabel>
                {t('user.runtimeInfo.isDocumentVisible')}
              </TableCellLabel>
              <TableCellValue>
                {runtime.document.isVisible
                  ? t('common.action.yes')
                  : t('common.action.no')}
              </TableCellValue>
            </TableRow>
            <TableRow>
              <TableCellLabel>
                {t('user.runtimeInfo.userActivation')}
              </TableCellLabel>
              <TableCellValue>
                {runtime.userActivation.unlocked
                  ? t('common.state.completed')
                  : t('common.state.pending')}
              </TableCellValue>
            </TableRow>
            <TableRow>
              <TableCellLabel>
                {t('user.runtimeInfo.lastActivation')}
              </TableCellLabel>
              <TableCellValue>
                {runtime.userActivation.lastEventAt > 0 ? (
                  <ReactTimeAgo
                    date={runtime.userActivation.lastEventAt}
                    formatter={intlFormatter}
                  />
                ) : (
                  t('common.state.notAvailable')
                )}
              </TableCellValue>
            </TableRow>
            <TableRow>
              <TableCellLabel>
                {t('user.runtimeInfo.navigationCount')}
              </TableCellLabel>
              <TableCellValue>{runtime.navigationCount}</TableCellValue>
            </TableRow>
            {runtime.adblockerSuspected !== null && (
              <TableRow>
                <TableCellLabel>
                  {runtime.adblockerSuspected
                    ? t('user.runtimeInfo.adblockerSuspected')
                    : t('user.runtimeInfo.adblockerNotDetected')}
                </TableCellLabel>
                <TableCellValue>✅</TableCellValue>
              </TableRow>
            )}
            <TableRow>
              <TableCellLabel>
                {t('user.runtimeInfo.flaimSurveyResult')}
              </TableCellLabel>
              <TableCellValue>
                {runtime.flaimSurveyResult
                  ? t('common.state.done')
                  : t('common.state.pending')}
              </TableCellValue>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function TableCellLabel({ children }: PropsWithChildren) {
  return (
    <TableCell className="w-3/5 font-medium block sm:table-cell pb-0 sm:py-2">
      {children}
    </TableCell>
  );
}

function TableCellValue({ children }: PropsWithChildren) {
  return <TableCell className="block sm:table-cell">{children}</TableCell>;
}
