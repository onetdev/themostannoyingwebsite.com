'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Textarea,
} from '@maw/ui-lib';

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
        <Textarea
          readOnly
          className="min-h-[300px] resize-none bg-muted p-4 font-mono text-xs"
          value={JSON.stringify(data, null, 2)}
        />
      </CardContent>
    </Card>
  );
}
