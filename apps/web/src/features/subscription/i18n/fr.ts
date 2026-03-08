import socialProofVariants from './purchase-proof-variants/fr';

export default {
  landing: {
    headline: "L'Amélioration IA Ultime *",
    disclaimer: {
      title: '* CLAUSE DE NON-RESPONSABILITÉ !',
      description:
        "Tout sur cette page est 100 % faux. Ces forfaits n'existent pas et il est impossible de les acheter car nous n'avons pas de processeur de paiement, ni même de véritable backend d'ailleurs.",
    },
    urgency: {
      title: 'OFFRE LIMITÉE DANS LE TEMPS !',
      description:
        "Il reste {timer} avant que ces énormes remises ne disparaissent pour de bon. C'est une opportunité unique dans une vie, ne décevez pas vos petits-enfants !",
      compact: 'OFFRE LIMITÉE ! -{discount}% {timer}',
      expired: 'DÉSOLÉ ! Vous venez de rater la vente !',
    },
    billing: {
      monthly: 'Mensuel',
      yearly: 'Annuel',
      biyearly: '2 ans',
      cycle: {
        monthly: 'facturé mensuellement',
        yearly: 'facturé chaque année',
        biyearly: 'facturé tous les 2 ans',
      },
      chargeDisclaimer: "Vous serez débité de {amount} aujourd'hui",
    },
    mostPopular: 'Plus populaire',
    pricePerMonth: '{price}/mois',
    discount: '-{amount}%',
    table: {
      features: 'Fonctionnalités',
    },
    features: {
      lowTierLimits: 'Limité de toutes les manières possibles',
      superSlowSpeed: 'Intentionnellement lent',
      adSupported: 'Financé par la publicité (beaucoup de publicités)',
      ramPriceSpike: 'Faire grimper les prix de la RAM',
      gpuPriceSpike: 'Faire grimper les prix des GPU',
      creativeMath: 'Arithmétique créative (1+1=5)',
      fakeFacts: 'Mensonges 100 % assurés',
      imaginarySources: 'Citations imaginaires',
      heavySighs: 'Soupirs numériques audibles',
      judgmentalEllipses: 'Points de suspension jugeants...',
      submissive: 'Tout ce que vous faites est GÉNIAL',
      exEmails: 'E-mails à vos ex à 3h du matin',
    },
    packages: {
      poorified: {
        title: 'Super Poorified Basic',
        description:
          'Notre offre la plus humble. Si basique que le bas débit ressemble à de la fibre. Attendez-vous à une mise en mémoire tampon constante et au jugement moral de notre IA.',
      },
      sufficient: {
        title: 'Barely Sufficient Premium',
        description:
          'Le juste milieu de la frustration. Juste assez pour vous agacer, mais pas assez pour être réellement utile. Maintenant avec des soupirs numériques premium.',
      },
      delux: {
        title: 'Ultra Premium Delux Elite Pro Max',
        description:
          'Le sommet ultime de la misère numérique. Maintenant avec 400 % de fonctionnalités inutiles en plus et des e-mails de regret automatisés envoyés à votre ex à 3h du matin.',
      },
    },
  },
  purchaseProofToast: {
    justSubscribed: "{name} de {location} vient de s'abonner à {plan} !",
    variants: socialProofVariants,
  },
};
