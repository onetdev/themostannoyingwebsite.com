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

import { useMonitoringStore } from '@/features/monitoring/stores';

export function EventHistory() {
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
            Enable Event History Recording
          </Label>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={clearEventHistory}
          disabled={eventHistory.length === 0}
        >
          Clear History
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-0">
          <CardTitle className="text-lg">Event History</CardTitle>
        </CardHeader>
        <CardContent className="p-0 pt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px] font-mono text-xs uppercase">
                  Timestamp
                </TableHead>
                <TableHead className="w-[200px] font-mono text-xs uppercase">
                  Type
                </TableHead>
                <TableHead className="font-mono text-xs uppercase">
                  Payload
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
                      ? 'No events captured yet...'
                      : 'Event history recording is disabled.'}
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
