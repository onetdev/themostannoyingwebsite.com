'use client';

import {
  Button,
  Icon,
  type IconAliaseKey,
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from '@maw/ui-lib';
import { cn } from '@maw/ui-lib/utils';
import { useTranslations } from 'next-intl';
import { QRCodeSVG } from 'qrcode.react';
import { type ComponentProps, useState } from 'react';

export type CryptoDonationButtonProps = {
  /** Localized method label, e.g. "Bitcoin (BTC)". */
  label: string;
  /** Brand/donation icon shown in the trigger. */
  icon: IconAliaseKey;
  /** Wallet address encoded into the QR code. */
  address: string;
  /** Optional chain/network name shown above the address. */
  network?: string;
} & ComponentProps<'div'>;

/**
 * Crypto support option: a button that reveals the wallet QR code, network and
 * copy-to-clipboard address in a popover instead of occupying a permanent card.
 */
export function CryptoDonationButton({
  label,
  icon,
  address,
  network,
  className,
  ...rest
}: CryptoDonationButtonProps) {
  const t = useTranslations();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn(className)} {...rest}>
      <Popover>
        <PopoverTrigger
          render={<Button variant="secondary" className="w-full" />}
        >
          <Icon icon={icon} aria-hidden />
          {label}
        </PopoverTrigger>
        <PopoverContent className="items-center gap-3 text-center">
          <PopoverTitle className="sr-only">{label}</PopoverTitle>
          <PopoverDescription className="sr-only">
            {t('funding.crypto.qrHint')}
          </PopoverDescription>

          <div className="rounded-2xl bg-white p-4" data-testid="crypto-qr">
            <QRCodeSVG value={address} size={180} level="H" />
          </div>

          {network && (
            <p className="text-muted-foreground text-sm">
              {t('funding.crypto.network', { network })}
            </p>
          )}

          <p className="text-muted-foreground w-full text-xs break-all">
            {address}
          </p>

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
        </PopoverContent>
      </Popover>
    </div>
  );
}
