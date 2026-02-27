'use client';

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
  Input,
  Textarea,
} from '@maw/ui-lib';

import { useEventTestForm } from '../../hooks';
import { eventPresets } from './data/eventPreset';

export function EventTester() {
  const {
    setValue,
    formState: { errors },
    handleSubmit,
    register,
    onSubmit,
  } = useEventTestForm();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Event Bus Tester</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-2">
          <div className="text-sm font-medium text-muted-foreground">
            Common Events
          </div>
          <div className="flex flex-wrap gap-2">
            {eventPresets.map((evt) => (
              <Button
                key={evt.type}
                variant="outline"
                size="sm"
                onClick={() => {
                  setValue('eventType', evt.type);
                  setValue('payload', JSON.stringify(evt.payload));
                }}
              >
                {evt.type}
              </Button>
            ))}
          </div>
        </div>

        <Field>
          <FieldLabel htmlFor="eventType" required>
            Event type
          </FieldLabel>
          <FieldContent>
            <Input
              type="text"
              className="w-full"
              id="eventType"
              aria-invalid={!!errors.eventType}
              {...register('eventType')}
            />
            <FieldError errors={[errors.eventType]} />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="payload">Payload (JSON)</FieldLabel>
          <FieldContent>
            <Textarea
              className="w-full"
              id="payload"
              aria-invalid={!!errors.payload}
              placeholder='{"key": "value"}'
              {...register('payload')}
            />
            <FieldError errors={[errors.payload]} />
          </FieldContent>
        </Field>

        <Button className="w-full" onClick={handleSubmit(onSubmit)}>
          Dispatch Event
        </Button>
      </CardContent>
    </Card>
  );
}
