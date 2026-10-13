'use client';

import { Button, Card, CardContent } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { QRCodeSVG } from 'qrcode.react';
import { type ComponentProps, useState } from 'react';

type CryptoWalletProps = {
  title: string;
  address: string;
  network?: string;
} & ComponentProps<'div'>;

export function CryptoWallet({
  title,
  address,
  network,
  className,
  ...rest
}: CryptoWalletProps) {
  const t = useTranslations();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card
      className={`items-center py-8 text-center ${className ?? ''}`}
      {...rest}
    >
      <CardContent className="flex w-full flex-col items-center gap-5">
        <div className="rounded-2xl bg-white p-4">
          <QRCodeSVG value={address} size={180} level="H" />
        </div>

        <div className="flex flex-col gap-1">
          <p className="font-semibold">{title}</p>
          {network && (
            <p className="text-muted-foreground text-sm">
              {t('funding.crypto.network', { network })}
            </p>
          )}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className="w-full"
        >
          {copied
            ? t('funding.crypto.copyFeedback')
            : t('funding.crypto.copyAction')}
        </Button>
      </CardContent>
    </Card>
  );
}
