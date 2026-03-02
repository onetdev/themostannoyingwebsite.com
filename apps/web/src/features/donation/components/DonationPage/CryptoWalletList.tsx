'use client';

import type { ComponentProps } from 'react';
import { useAppConfigContext } from '@/core/config/react-app-config';
import { CryptoWallet } from './CryptoWallet';

export type CryptoWalletListProps = ComponentProps<'div'>;

export function CryptoWalletList({
  className,
  ...rest
}: CryptoWalletListProps) {
  const configService = useAppConfigContext().donation;
  const btcWallet = configService.btcWallet;
  const ethWallet = configService.ethWallet;

  return (
    <div
      className={`my-8 grid w-full grid-cols-1 gap-6 md:w-auto md:grid-cols-2 ${className ?? ''}`}
      {...rest}
    >
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
