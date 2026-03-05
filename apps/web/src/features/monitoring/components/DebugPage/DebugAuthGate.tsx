'use client';

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
  Input,
} from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import type { PropsWithChildren } from 'react';
import { useDebugAuth } from '../../hooks';

export function DebugAuthGate({ children }: PropsWithChildren) {
  const t = useTranslations();
  const {
    loginForm: {
      register,
      handleSubmit,
      formState: { errors },
    },
    onLogin,
    isAuthorized,
  } = useDebugAuth();

  if (isAuthorized) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{t('debug.auth.title')}</CardTitle>
          <CardDescription>{t('debug.auth.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onLogin)} className="space-y-4">
            <Field>
              <FieldLabel htmlFor="password" required>
                {t('debug.auth.passwordLabel')}
              </FieldLabel>
              <FieldContent>
                <Input
                  id="password"
                  type="password"
                  placeholder={t('debug.auth.passwordPlaceholder')}
                  autoFocus
                  aria-invalid={!!errors.password}
                  {...register('password')}
                />
                <FieldError errors={[errors.password]} />
              </FieldContent>
            </Field>
            <Button type="submit" className="w-full">
              {t('debug.auth.submit')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
