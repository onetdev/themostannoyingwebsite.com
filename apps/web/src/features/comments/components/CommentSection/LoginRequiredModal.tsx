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
import { useNavigationProvider } from '@/core/navigation/react/NavigationContext';
import { useEvent } from '@/hooks';

interface LoginRequiredModalProps {
  show: boolean;
  onClose: () => void;
}

export function LoginRequiredModal({ show, onClose }: LoginRequiredModalProps) {
  const t = useTranslations();
  const { navigatePush } = useNavigationProvider();

  useEvent('ui:modal:dismiss-signaled', onClose, show);

  const handleLogin = () => {
    onClose();
    navigatePush('user.login');
  };

  return (
    <Dialog open={show} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('comments.loginRequired.title')}</DialogTitle>
          <DialogDescription>
            {t('comments.loginRequired.description')}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {t('comments.loginRequired.cancel')}
          </Button>
          <Button onClick={handleLogin}>
            {t('comments.loginRequired.login')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
