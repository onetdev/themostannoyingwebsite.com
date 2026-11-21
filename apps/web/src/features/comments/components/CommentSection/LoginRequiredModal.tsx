'use client';

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { useEvent, useNavigationProvider } from '@/core/react';

interface LoginRequiredModalProps {
  show: boolean;
  onClose: () => void;
}

export function LoginRequiredModal({ show, onClose }: LoginRequiredModalProps) {
  const t = useTranslations();
  const { push } = useNavigationProvider();

  useEvent('ui:modal:dismiss-signaled', onClose, show);

  const handleLogin = () => {
    onClose();
    push('user.login');
  };

  return (
    <Dialog open={show} onOpenChange={onClose}>
      <DialogContent data-track-section="comments:login-required">
        <DialogHeader>
          <DialogTitle>{t('comments.loginRequired.title')}</DialogTitle>
          <DialogDescription>
            {t('comments.loginRequired.description')}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            data-track="comments:login-required:cancel"
            onClick={onClose}
          >
            {t('comments.loginRequired.cancel')}
          </Button>
          <Button
            data-track="comments:login-required:login"
            onClick={handleLogin}
          >
            {t('comments.loginRequired.login')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
