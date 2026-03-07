'use client';

import { useTranslations } from 'next-intl';
import type { ComponentProps } from 'react';
import { useAppConfigContext } from '@/core/config/react-app-config';
import { CryptoWallet } from './CryptoWallet';

export type CryptoWalletListProps = ComponentProps<'div'>;

export function CryptoWalletList({
  className,
  ...rest
}: CryptoWalletListProps) {
  const t = useTranslations();
  const configService = useAppConfigContext().funding;
  const btcWallet = configService.btcWallet;
  const ethWallet = configService.ethWallet;

  return (
    <div
      className={`my-8 grid w-full grid-cols-1 gap-6 md:w-auto md:grid-cols-2 ${className ?? ''}`}
      {...rest}
    >
      <CryptoWallet
        title={t('funding.crypto.bitcoin')}
        address={btcWallet.address}
        network={btcWallet.network}
      />
      <CryptoWallet
        title={t('funding.crypto.ethereum')}
        address={ethWallet.address}
        network="Mainnet"
      />
    </div>
  );
}
