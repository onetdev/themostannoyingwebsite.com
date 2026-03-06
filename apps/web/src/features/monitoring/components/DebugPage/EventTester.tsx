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
import { useTranslations } from 'next-intl';

import { useEventTestForm } from '../../hooks';
import { eventPresets } from './data/eventPreset';
import { EventHistory } from './EventHistory';

export function EventTester() {
  const t = useTranslations();
  const {
    setValue,
    formState: { errors },
    handleSubmit,
    register,
    onSubmit,
  } = useEventTestForm();

  const testEvents = eventPresets.sort((a, b) =>
    (a.name ?? a.type).localeCompare(b.name ?? b.type),
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {t('monitoring.eventTester.title')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-2">
            <div className="text-sm font-medium text-muted-foreground">
              {t('monitoring.eventTester.commonEvents')}
            </div>
            <div className="flex flex-wrap gap-2">
              {testEvents.map((evt) => (
                <Button
                  key={evt.name ?? evt.type}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setValue('eventType', evt.type);
                    setValue('payload', JSON.stringify(evt.payload));
                  }}
                >
                  {evt.name ?? evt.type}
                </Button>
              ))}
            </div>
          </div>

          <Field>
            <FieldLabel htmlFor="eventType" required>
              {t('monitoring.eventTester.eventTypeLabel')}
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
            <FieldLabel htmlFor="payload">
              {t('monitoring.eventTester.payloadLabel')}
            </FieldLabel>
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
            {t('monitoring.eventTester.dispatch')}
          </Button>
        </CardContent>
      </Card>

      <EventHistory />
    </div>
  );
}
