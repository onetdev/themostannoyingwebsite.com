'use client';

import { DonationCounter } from './DonationCounter';
import { useDonationBalance } from '../../application';

export function DonationBalance() {
  const balance = useDonationBalance();

  return <DonationCounter amount={balance} currency="€" />;
}
