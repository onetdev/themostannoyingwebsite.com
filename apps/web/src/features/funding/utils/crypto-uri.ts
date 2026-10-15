/**
 * Crypto payment URIs so a scanned QR code pre-fills the amount.
 *
 * - Bitcoin: BIP-21 (`bitcoin:<address>?amount=<btc>`).
 * - Ethereum: EIP-681 (`ethereum:<address>@<chainId>?value=<wei>`).
 *
 * When the amount is not positive the raw address is returned, which every
 * wallet can still scan.
 */

const ETH_MAINNET_CHAIN_ID = 1;
const WEI_DECIMALS = 18;

export function buildBitcoinUri(address: string, amountBtc: number): string {
  if (!(amountBtc > 0)) {
    return address;
  }

  return `bitcoin:${address}?amount=${amountBtc.toFixed(8)}`;
}

export function buildEthereumUri(
  address: string,
  amountEth: number,
  chainId: number = ETH_MAINNET_CHAIN_ID,
): string {
  if (!(amountEth > 0)) {
    return address;
  }

  const wei = BigInt(Math.round(amountEth * 10 ** WEI_DECIMALS)).toString();
  return `ethereum:${address}@${chainId}?value=${wei}`;
}
