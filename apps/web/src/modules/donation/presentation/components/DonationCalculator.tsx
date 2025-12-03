'use client';

import { DonationCounter } from './DonationCounter';
import { useDonationBalance } from '../../application';

import config from '@/config';

export function DonationBalance() {
  const balance = useDonationBalance(config.donation);

  return <DonationCounter amount={balance} currency="€" />;
}
