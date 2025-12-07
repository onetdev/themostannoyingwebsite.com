'use client';

import { CryptoWallet } from './CryptoWallet';

import { useAppConfig } from '@/kernel';

export function CryptoWalletList() {
  const configService = useAppConfig().donation;
  const btcWallet = configService.btcWallet;
  const ethWallet = configService.ethWallet;

  return (
    <div className="my-8 grid w-full grid-cols-1 gap-6 md:w-auto md:grid-cols-2">
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
