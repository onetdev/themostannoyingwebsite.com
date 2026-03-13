import socialProofVariants from './purchase-proof-variants';

export default {
  landing: {
    headline: 'The Ultimate AI Upgrade *',
    disclaimer: {
      title: '* DISCLAIMER!',
      description:
        "Everything on this page is 100% fake. These packages do not exist, and purchasing them is impossible because we don't have a payment processor, or even a real backend for that matter.",
    },
    urgency: {
      title: 'LIMITED TIME OFFER!',
      description:
        '{timer} left until these huge discounts are gone for good. This is a once in a lifetime opportunity, do not let your grandkids down!',
      compact: 'LIMITED OFFER! -{discount}% {timer}',
      expired: 'SORRY! You just missed the sale!',
    },
    billing: {
      monthly: 'Monthly',
      yearly: 'Yearly',
      biyearly: '2 Years',
      cycle: {
        monthly: 'billed monthly',
        yearly: 'billed every year',
        biyearly: 'billed every 2 years',
      },
      chargeDisclaimer: 'You will be charged {amount} today',
    },
    mostPopular: 'Most Popular',
    pricePerMonth: '{price}/mo',
    discount: '-{amount}%',
    table: {
      features: 'Features',
    },
    features: {
      lowTierLimits: 'Limited in every possible ways',
      superSlowSpeed: 'Intentionally slow',
      adSupported: 'Ad-supported (Lots of them)',
      ramPriceSpike: 'Spike RAM prices',
      gpuPriceSpike: 'Spike GPU prices',
      creativeMath: 'Creative Arithmetic (1+1=5)',
      fakeFacts: '100% Confident Lies',
      imaginarySources: 'Imaginary Citations',
      heavySighs: 'Audible Digital Sighing',
      judgmentalEllipses: 'Judgmental Ellipses...',
      submissive: 'Everything you do is AWESOME',
      exEmails: '3 AM Emails to Exes',
    },
    packages: {
      poorified: {
        title: 'Super Poorified Basic',
        description:
          'Our most humble offering. So basic it makes dial-up look like fiber. Expect constant buffering and moral judgment from our AI.',
      },
      sufficient: {
        title: 'Barely Sufficient Premium',
        description:
          'The sweet spot of frustration. Just enough to keep you annoyed but not enough to actually be useful. Now with premium digital sighing.',
      },
      delux: {
        title: 'Ultra Premium Delux Elite Pro Max',
        description:
          'The ultimate peak of digital misery. Now with 400% more unnecessary features and automated 3 AM regret emails sent to your ex.',
      },
    },
  },
  purchaseProofToast: {
    justSubscribed: '{name} from {location} just subscribed to {plan}!',
    variants: socialProofVariants,
  },
};
