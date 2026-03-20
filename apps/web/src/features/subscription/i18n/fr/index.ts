import type { SubscriptionI18nShape } from '../../types';
import socialProofVariants from './purchase-proof-variants';

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
    status: {
      outOfStock: 'En rupture de stock',
    },
    table: {
      features: 'Fonctionnalités',
    },
    cancellation: {
      link: "Résilier l'abonnement",
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
      exEmails: 'E-Mails à vos ex à 3h du matin',
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
  specialDeal: {
    headline: 'ATTENDEZ ! NE PARTEZ PAS ! NOUS AVONS UN CADEAU ! 🎁',
    description:
      'Nous avons remarqué que vous essayiez de partir. Est-ce quelque chose que nous avons dit ? Était-ce les points de suspension jugeants ? Nous pouvons changer ! (Attendez, non, nous ne pouvons pas).',
    offer:
      "L'offre est en rupture de stock en raison de la forte demande ! Restez sur cette page jusqu'au réapprovisionnement !",
    backToCancellation: 'Hmm, ramenez-moi à la résiliation',
  },
  purchaseProofToast: {
    justSubscribed: "{name} de {location} vient de s'abonner à {plan} !",
    variants: socialProofVariants,
  },
  cancellation: {
    page: {
      title: "Résiliation de l'abonnement",
    },
    reasons: {
      title: 'Raison',
      description:
        'Il est vraiment difficile de croire que vous voulez lâchement résilier votre abonnement. Pourquoi ???',
      list: [
        'MAW a résolu tous mes problèmes dans ma vie. Cependant, la tristesse me manque.',
        "J'ai la discipline financière d'un raton laveur dans un distributeur automatique.",
        "Je résilie avant que mes amis ne découvrent à quel point j'ai apprécié cela.",
        'Je fuis une fois de plus mes problèmes comme un personnage de dessin animé.',
        'Trop gourmand pour mon PC',
        "Problèmes d'engagement.",
        'Je ne peux tout simplement pas gérer autant de croissance personnelle.',
        "Ma mère a découvert que j'utilisais sa carte de crédit",
      ],
    },
    essay: {
      title: 'Essai d’entretien de départ',
      description:
        "Pour s'assurer que votre décision est définitive et mûrement réfléchie, veuillez rédiger un essai sur votre expérience (min. 3000 caractères). Celui-ci sera personnellement examiné par notre PDG avant traitement.",
      placeholder:
        "Commencez à taper votre chef-d'œuvre de 3000 caractères ici...",
      characters: 'Caractères : {count} / 3000',
      action: {
        abort: 'Annuler la résiliation',
        next: 'J’ai terminé mon essai obligatoire et je souhaite passer à l’étape de vérification suivante',
      },
    },
    valdo: {
      title: 'Étape 3 : Laissez-vous guider par la lumière',
      description:
        "Il n'y a qu'un seul vrai bouton de désabonnement sur cette page. Faites confiance à votre lumière intérieure pour vous guider. Si vous ne trouvez pas celui qui fonctionne, c'est peut-être l'univers qui vous suggère doucement de rester.",
      buttonLabel: 'Se désabonner',
      error: 'Mauvais bouton ! Frais appliqués : {amount}',
    },
    upsell: {
      title:
        'Attendez ! Ne partez pas ! Donnez-nous une chance de plus s’il vous plaît !',
      description:
        'Nous avons remarqué que vous essayez de ne pas partir. Que diriez-vous de notre plan "Protection Résiliation Platine" ? Il n\'est disponible que pour les personnes qui souhaitent partir.',
      promo: "GROS DEAL !\nJUSQU'À 99% DE RÉDUCTION !!!",
      action: {
        specialDeal: "Je veux l'offre spéciale",
        stay: 'Oui, je veux ne pas partir',
        next: 'Malgré tout, je cherche toujours à résilier mon abonnement. C’est moi le problème, pas vous.',
      },
    },
    email: {
      title: 'Qui êtes-vous ?',
      label:
        'Fournissez votre adresse e-mail pour le processus de résiliation.',
      placeholder: 'client-fidele@themostannoyingwebsite.com',
      action: {
        discount: 'Vous savez quoi, j’ai changé d’avis, je veux la remise !',
        next: 'Je suis sûr, continuons la résiliation',
      },
    },
    confirmation: {
      title: 'VÉRIFICATION FINALE REQUISE',
      description:
        'Votre demande a été préparée, mais pour des raisons de sécurité et pour éviter les désabonnements accidentels, vous devez maintenant terminer le processus de vérification physique.',
      alert: {
        title: 'Instructions :',
        step1: 'Cliquez sur le bouton "Imprimer pour vérification" ci-dessous.',
        step2: 'Imprimez le document sur du papier physique.',
        step3: 'Signez le document en présence de DEUX (2) témoins.',
        step4: 'Faites signer les deux témoins.',
        step5: 'Prenez une photo haute résolution du document signé.',
        step6:
          'Envoyez la photo par e-mail à <email>support@themostannoyingwebsite.com</email>',
        note: 'Veuillez noter que le traitement prend jusqu’à 10^15 jours ouvrables.',
      },
      action: {
        print: '🖨️ IMPRIMER POUR VÉRIFICATION 🖨️',
        abort: 'Garder mon abonnement',
        upgrade: 'Mettre à niveau maintenant',
        specialDeal: 'Obtenir l’offre spéciale',
      },
      alternative:
        'Alternativement, si vous avez changé d’avis (fortement recommandé) :',
    },
    print: {
      title: 'Formulaire officiel de demande de désabonnement',
      documentId: 'ID du document : {id}',
      sections: {
        account: '1. INFORMATIONS SUR LE COMPTE',
        details: '2. DÉTAILS DE LA RÉSILIATION',
        signatures: '3. SIGNATURES & TÉMOINS',
      },
      fields: {
        email: 'Adresse e-mail :',
        date: 'Date de la demande :',
        reason: 'Raison principale du départ :',
        feedback: 'Commentaires détaillés :',
      },
      signatures: {
        subscriber: 'Signature de l’abonné',
        subscriberName: 'Nom de l’abonné en lettres d’imprimerie',
        witness1: 'Signature du témoin 1',
        witness1Name: 'Nom du témoin 1 en lettres d’imprimerie',
        witness2: 'Signature du témoin 2',
        witness2Name: 'Nom du témoin 2 en lettres d’imprimerie',
        dateLabel: 'Date : ____________________',
      },
      footer:
        'Ceci n’est pas un vrai document, juste une autre réflexion satirique des tendances. Voir themostannoyingwebsite.com/fr/terms-of-use et themostannoyingwebsite.com/fr/privacy-policy pour plus d’informations.',
    },
  },
} satisfies SubscriptionI18nShape;
