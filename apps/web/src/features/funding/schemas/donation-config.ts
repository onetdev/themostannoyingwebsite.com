import * as z from 'zod';

export const FundingConfigSchema = z.object({
  assets: z.object({
    beforeImage: z.string(),
    afterImage: z.string(),
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
