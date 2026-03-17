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
    status: {
      outOfStock: 'Out of stock',
    },
    table: {
      features: 'Features',
    },
    cancellation: {
      link: 'Cancel Subscription',
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
  specialDeal: {
    headline: "WAIT! DON'T GO! WE HAVE A GIFT! 🎁",
    description:
      "We noticed you were trying to leave. Is it something we said? Was it the judgmental ellipses? We can change! (Wait, no we can't).",
    offer:
      'The offer is out of stock due to popular demand! Stay on this page until restock!',
    backToCancellation: 'Hmm, get me back to the cancellation',
  },
  purchaseProofToast: {
    justSubscribed: '{name} from {location} just subscribed to {plan}!',
    variants: socialProofVariants,
  },
  cancellation: {
    page: {
      title: 'Subscription cancellation',
    },
    reasons: {
      title: 'Reason',
      description:
        'It is really difficult to believe that you want to cowardly cancel your subscription. Why???',
      list: [
        'MAW fixed all my problems in my life. However, I miss the sadness.',
        'I have the financial discipline of a raccoon in a vending machine.',
        'I’m cancelling before my friends discover how much I enjoyed this.',
        'I am once again running from my problems like a cartoon character.',
        'Too taxing on my PC',
        'Commitment issues.',
        'I simply cannot handle this much personal growth.',
        'My mom figured out that I was using her credit card',
      ],
    },
    essay: {
      title: 'Exit Interview Essay',
      description:
        'To ensure your decision is final and well-considered, please write an essay on your experience (min. 3000 characters). This will be personally reviewed by our CEO before processing.',
      placeholder: 'Start typing your 3000 character masterpiece here...',
      characters: 'Characters: {count} / 3000',
      action: {
        abort: 'Cancel cancellation',
        next: 'I have completed my mandatory essay and wish to proceed with the next verification step',
      },
    },
    valdo: {
      title: 'Step 3: Lead by light',
      description:
        'There is only one true unsubscribe button on this page. Trust your inner light to guide you. If you cannot find the working one, it may be the universe gently suggesting you stay.',
      buttonLabel: 'Unsubscribe',
      error: 'Wrong button! Fee applied: {amount}',
    },
    upsell: {
      title: "Wait! Don't go! Give us one more chance please!",
      description:
        'We\'ve noticed you\'re trying to not leave. How about our "Platinum Unsubscribe Protection" plan? It is only available for people who want to leave.',
      promo: 'HUGE DEAL!\nUP TO 99% OFF!!!',
      action: {
        specialDeal: 'I want the special deal',
        stay: 'Yes, I want to not leave',
        next: "Despite everything, I'm still aiming to cancel my subscription. I am the problem, not you.",
      },
    },
    email: {
      title: 'Who are you?',
      label: 'Provide your email address for the cancellation process.',
      placeholder: 'loyal-customer@themostannoyingwebsite.com',
      action: {
        discount: 'You know what, I changed my mind, I want the discount!',
        next: "I'm sure, let's continue cancellation",
      },
    },
    confirmation: {
      title: 'FINAL VERIFICATION REQUIRED',
      description:
        'Your request has been prepared, but for security reasons and to prevent accidental un-subscriptions, you must now complete the physical verification process.',
      alert: {
        title: 'Instructions:',
        step1: 'Click the "Print for verification" button below.',
        step2: 'Print the document on physical paper.',
        step3: 'Sign the document in the presence of TWO (2) witnesses.',
        step4: 'Have both witnesses sign.',
        step5: 'Take a high-resolution photo of the signed document.',
        step6:
          'Email the photo to <email>support@themostannoyingwebsite.com</email>',
        note: 'Please note that processing takes up to 10^15 business days.',
      },
      action: {
        print: '🖨️ PRINT FOR VERIFICATION 🖨️',
        abort: 'Keep My Subscription',
        upgrade: 'Upgrade Now',
        specialDeal: 'Get the special deal',
      },
      alternative:
        "Alternatively, if you've changed your mind (highly recommended):",
    },
    print: {
      title: 'Official Unsubscription Request Form',
      documentId: 'Document ID: {id}',
      sections: {
        account: '1. ACCOUNT INFORMATION',
        details: '2. CANCELLATION DETAILS',
        signatures: '3. SIGNATURES & WITNESSES',
      },
      fields: {
        email: 'Email Address:',
        date: 'Date of Request:',
        reason: 'Primary Reason for Leaving:',
        feedback: 'Detailed Feedback:',
      },
      signatures: {
        subscriber: 'Subscriber Signature',
        subscriberName: 'Subscriber Printed Name',
        witness1: 'Witness 1 Signature',
        witness1Name: 'Witness 1 Printed Name',
        witness2: 'Witness 2 Signature',
        witness2Name: 'Witness 2 Printed Name',
        dateLabel: 'Date: ____________________',
      },
      footer:
        'This is not a real document, just another satiric reflection of trends. See themostannoyingwebsite.com/en/terms-of-use and themostannoyingwebsite.com/en/privacy-policy for more information.',
    },
  },
};
