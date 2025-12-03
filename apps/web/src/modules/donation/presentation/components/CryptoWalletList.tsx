import { CryptoWallet } from './CryptoWallet';

import config from '@/config';

export function CryptoWalletList() {
  return (
    <div className="my-8 grid w-full grid-cols-1 gap-6 md:w-auto md:grid-cols-2">
      <CryptoWallet
        title="Bitcoin (BTC)"
        address={config.donation.btcWallet.address}
        network={config.donation.btcWallet.network}
      />
      <CryptoWallet
        title="Ethereum (ETH)"
        address={config.donation.ethWallet.address}
        network="Mainnet"
      />
    </div>
  );
}
