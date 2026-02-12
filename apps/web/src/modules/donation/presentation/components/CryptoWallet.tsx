'use client';

import { BorderedBox, Button, TextInput } from '@maw/ui-lib';
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
    <BorderedBox>
      <h3>{title}</h3>
      {network && (
        <p className="opacity-75">
          {t('app.donate.crypto.network', { network })}
        </p>
      )}

      <div className="mb-4 flex justify-center rounded bg-white p-4">
        <QRCodeSVG value={address} size={200} level="H" />
      </div>

      <TextInput value={address} readOnly />

      <Button onClick={handleCopy} className="w-full">
        {copied
          ? t('app.donate.crypto.copyFeedback')
          : t('app.donate.crypto.copyAction')}
      </Button>
    </BorderedBox>
  );
}
