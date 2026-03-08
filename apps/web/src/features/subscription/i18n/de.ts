import socialProofVariants from './purchase-proof-variants/de';

export default {
  landing: {
    headline: 'Das ultimative KI-Upgrade *',
    disclaimer: {
      title: '* HAFTUNGSAUSSCHLUSS!',
      description:
        'Alles auf dieser Seite ist zu 100 % gefälscht. Diese Pakete existieren nicht, und ein Kauf ist unmöglich, da wir weder einen Zahlungsanbieter noch ein echtes Backend haben.',
    },
    urgency: {
      title: 'ZEITLICH BEGRENZTES ANGEBOT!',
      description:
        'Noch {timer} bis diese riesigen Rabatte für immer verschwunden sind. Dies ist eine einmalige Gelegenheit, enttäuschen Sie Ihre Enkelkinder nicht!',
      compact: 'BEGRENZTES ANGEBOT! -{discount}% {timer}',
      expired: 'SORRY! Sie haben den Ausverkauf gerade verpasst!',
    },
    billing: {
      monthly: 'Monatlich',
      yearly: 'Jährlich',
      biyearly: '2 Jahre',
      cycle: {
        monthly: 'monatliche Abrechnung',
        yearly: 'jährliche Abrechnung',
        biyearly: 'Abrechnung alle 2 Jahre',
      },
      chargeDisclaimer: 'Ihnen werden heute {amount} berechnet',
    },
    mostPopular: 'Beliebteste',
    pricePerMonth: '{price}/Monat',
    discount: '-{amount}%',
    table: {
      features: 'Funktionen',
    },
    features: {
      lowTierLimits: 'In jeder Hinsicht begrenzt',
      superSlowSpeed: 'Absichtlich langsam',
      adSupported: 'Werbefinanziert (viele Anzeigen)',
      ramPriceSpike: 'RAM-Preise in die Höhe treiben',
      gpuPriceSpike: 'GPU-Preise in die Höhe treiben',
      creativeMath: 'Kreative Arithmetik (1+1=5)',
      fakeFacts: '100% selbstbewusste Lügen',
      imaginarySources: 'Imaginäre Zitate',
      heavySighs: 'Hörbares digitales Seufzen',
      judgmentalEllipses: 'Urteilende Ellipsen...',
      submissive: 'Alles, was du tust, ist GENIAL',
      exEmails: 'E-Mails um 3 Uhr morgens an Ex-Partner',
    },
    packages: {
      poorified: {
        title: 'Super verarmtes Basis-Paket',
        description:
          'Unser bescheidenstes Angebot. So einfach, dass Einwahlverbindungen wie Glasfaser aussehen. Erwarten Sie ständiges Buffering und moralische Verurteilung durch unsere KI.',
      },
      sufficient: {
        title: 'Gerade noch ausreichendes Premium',
        description:
          'Der Sweet Spot der Frustration. Gerade genug, um Sie zu ärgern, aber nicht genug, um tatsächlich nützlich zu sein. Jetzt mit Premium-Digital-Seufzen.',
      },
      delux: {
        title: 'Ultra Premium Delux Elite Pro Max',
        description:
          'Der ultimative Gipfel des digitalen Elends. Jetzt mit 400 % mehr unnötigen Funktionen und automatisierten Reue-E-Mails um 3 Uhr morgens an Ihren Ex.',
      },
    },
  },
  purchaseProofToast: {
    justSubscribed: '{name} aus {location} hat gerade {plan} abonniert!',
    variants: socialProofVariants,
  },
};
