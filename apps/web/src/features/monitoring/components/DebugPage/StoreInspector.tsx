'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@maw/ui-lib';

interface StoreInspectorProps {
  title: string;
  data: object;
}

export function StoreInspector({ title, data }: StoreInspectorProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg font-mono">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <textarea
          readOnly
          className="w-full min-h-[300px] p-4 rounded-md border bg-muted font-mono text-xs resize-none border-border"
          value={JSON.stringify(data, null, 2)}
        />
      </CardContent>
    </Card>
  );
}
