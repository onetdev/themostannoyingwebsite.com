import { buildBitcoinUri, buildEthereumUri } from './crypto-uri';

const BTC = 'bc1qe0mr42jg6lwhhcxkdkj7fpjdwn6g0fh4pmva3t';
const ETH = '0x8E804CFeeCc031bB97FeC97208510003Cc247454';

describe('buildBitcoinUri', () => {
  it('encodes the amount with BIP-21', () => {
    expect(buildBitcoinUri(BTC, 0.0000525)).toBe(
      `bitcoin:${BTC}?amount=0.00005250`,
    );
  });

  it('falls back to the raw address without an amount', () => {
    expect(buildBitcoinUri(BTC, 0)).toBe(BTC);
  });
});

describe('buildEthereumUri', () => {
  it('encodes the amount in wei with EIP-681', () => {
    expect(buildEthereumUri(ETH, 0.001)).toBe(
      `ethereum:${ETH}@1?value=1000000000000000`,
    );
  });

  it('honours a custom chain id', () => {
    expect(buildEthereumUri(ETH, 0.001, 10)).toContain(`ethereum:${ETH}@10?`);
  });

  it('falls back to the raw address without an amount', () => {
    expect(buildEthereumUri(ETH, 0)).toBe(ETH);
  });
});
