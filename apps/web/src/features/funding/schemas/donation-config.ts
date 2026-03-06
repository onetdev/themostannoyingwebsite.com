import { z } from 'zod';

export const DonationConfigSchema = z.object({
  assets: z.object({
    moneyJarAnimation: z.string(),
  }),
  buyMeACoffeeUrl: z.string(),
  paypalUrl: z.string(),
  ethWallet: z.object({
    address: z.string(),
  }),
  btcWallet: z.object({
    network: z.string(),
    address: z.string(),
  }),
  alternativeOptionsUrl: z.string(),
  costStartEpoch: z.number(),
  costDailyAvgInEuro: z.number().min(0),
  totalDonationInEuro: z.number(),
});

export type DonationConfig = z.infer<typeof DonationConfigSchema>;
