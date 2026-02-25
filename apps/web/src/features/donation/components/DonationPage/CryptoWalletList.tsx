'use client';

import { ComponentProps } from 'react';

import { CryptoWallet } from './CryptoWallet';

import { useAppConfig } from '@/contexts/AppConfig';

export type CryptoWalletListProps = ComponentProps<'div'>;

export function CryptoWalletList({
  className,
  ...rest
}: CryptoWalletListProps) {
  const configService = useAppConfig().donation;
  const btcWallet = configService.btcWallet;
  const ethWallet = configService.ethWallet;

  return (
    <div
      className={`my-8 grid w-full grid-cols-1 gap-6 md:w-auto md:grid-cols-2 ${className ?? ''}`}
      {...rest}>
      <CryptoWallet
        title="Bitcoin (BTC)"
        address={btcWallet.address}
        network={btcWallet.network}
      />
      <CryptoWallet
        title="Ethereum (ETH)"
        address={ethWallet.address}
        network="Mainnet"
      />
    </div>
  );
}
