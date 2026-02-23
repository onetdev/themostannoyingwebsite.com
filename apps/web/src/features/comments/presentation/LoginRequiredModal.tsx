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

import { useNavigationProvider } from '@/providers/NavigationProvider';

interface LoginRequiredModalProps {
  show: boolean;
  onClose: () => void;
}

export function LoginRequiredModal({ show, onClose }: LoginRequiredModalProps) {
  const t = useTranslations();
  const { navigatePush } = useNavigationProvider();

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
