import * as z from 'zod';

export const FundingConfigSchema = z.object({
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
});

export type FundingConfig = z.infer<typeof FundingConfigSchema>;
