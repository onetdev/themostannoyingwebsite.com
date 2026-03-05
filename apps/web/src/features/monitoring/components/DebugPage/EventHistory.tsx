'use client';

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Checkbox,
  Label,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { useMonitoringStore } from '@/features/monitoring/stores';

export function EventHistory() {
  const t = useTranslations();
  const {
    eventHistory,
    isEventHistoryEnabled: isHistoryEnabled,
    setIsEventHistoryEnabled: setIsHistoryEnabled,
    clearEventHistory,
  } = useMonitoringStore();

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-muted/50 p-4 rounded-lg border border-border">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="enable-history"
            checked={isHistoryEnabled}
            onCheckedChange={(checked) => setIsHistoryEnabled(!!checked)}
          />
          <Label
            htmlFor="enable-history"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
          >
            {t('debug.eventHistory.enable')}
          </Label>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={clearEventHistory}
          disabled={eventHistory.length === 0}
        >
          {t('debug.eventHistory.clear')}
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-0">
          <CardTitle className="text-lg">
            {t('debug.eventHistory.title')}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 pt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px] font-mono text-xs uppercase">
                  {t('debug.eventHistory.table.timestamp')}
                </TableHead>
                <TableHead className="w-[200px] font-mono text-xs uppercase">
                  {t('debug.eventHistory.table.type')}
                </TableHead>
                <TableHead className="font-mono text-xs uppercase">
                  {t('debug.eventHistory.table.payload')}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {eventHistory.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="h-32 text-center text-muted-foreground italic"
                  >
                    {isHistoryEnabled
                      ? t('debug.eventHistory.empty')
                      : t('debug.eventHistory.disabled')}
                  </TableCell>
                </TableRow>
              ) : (
                eventHistory.map((event, i) => (
                  <TableRow key={`${event.timestamp}-${i}`}>
                    <TableCell className="font-mono text-xs opacity-70">
                      {new Date(event.timestamp).toLocaleTimeString()}
                    </TableCell>
                    <TableCell className="font-bold text-primary">
                      {event.type}
                    </TableCell>
                    <TableCell>
                      <pre className="text-[10px] bg-muted/40 p-2 rounded max-h-32 overflow-y-auto w-full max-w-[500px]">
                        {JSON.stringify(event.payload, null, 2)}
                      </pre>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
