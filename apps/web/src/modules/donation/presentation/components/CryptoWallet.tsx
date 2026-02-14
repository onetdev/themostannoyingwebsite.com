'use client';

import { Card, CardContent, CardHeader, CardTitle, Button, Input } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { QRCodeSVG } from 'qrcode.react';
import { useState } from 'react';

type CryptoWalletProps = {
  title: string;
  address: string;
  network?: string;
};

export function CryptoWallet({ title, address, network }: CryptoWalletProps) {
  const t = useTranslations();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {network && (
          <p className="text-muted-foreground text-sm">
            {t('app.donate.crypto.network', { network })}
          </p>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex justify-center rounded bg-white p-4">
          <QRCodeSVG value={address} size={200} level="H" />
        </div>

        <Input value={address} readOnly />

        <Button onClick={handleCopy} className="w-full">
          {copied
            ? t('app.donate.crypto.copyFeedback')
            : t('app.donate.crypto.copyAction')}
        </Button>
      </CardContent>
    </Card>
  );
}
