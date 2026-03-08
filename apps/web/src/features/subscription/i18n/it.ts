import socialProofVariants from './purchase-proof-variants/it';

export default {
  landing: {
    headline: "L'aggiornamento IA definitivo *",
    disclaimer: {
      title: '* ESCLUSIONE DI RESPONSABILITÀ!',
      description:
        'Tutto su questa pagina è falso al 100%. Questi pacchetti non esistono e acquistarli è impossibile perché non abbiamo un elaboratore di pagamenti, o nemmeno un vero backend se è per questo.',
    },
    urgency: {
      title: 'OFFERTA A TEMPO LIMITATO!',
      description:
        "Rimangono {timer} prima che questi enormi sconti svaniscano per sempre. Questa è un'opportunità unica nella vita, non deludere i tuoi nipoti!",
      compact: 'OFFERTA LIMITATA! -{discount}% {timer}',
      expired: 'SORRY! Hai appena perso i saldi!',
    },
    billing: {
      monthly: 'Mensile',
      yearly: 'Annuale',
      biyearly: '2 anni',
      cycle: {
        monthly: 'fatturato mensilmente',
        yearly: 'fatturato ogni anno',
        biyearly: 'fatturato ogni 2 anni',
      },
      chargeDisclaimer: 'Ti verranno addebitati {amount} oggi',
    },
    mostPopular: 'Il più popolare',
    pricePerMonth: '{price}/mese',
    discount: '-{amount}%',
    table: {
      features: 'Funzionalità',
    },
    features: {
      lowTierLimits: 'Limitato in ogni modo possibile',
      superSlowSpeed: 'Intenzionalmente lento',
      adSupported: 'Supportato da annunci (tantissimi)',
      ramPriceSpike: 'Picchi di prezzo RAM',
      gpuPriceSpike: 'Picchi di prezzo GPU',
      creativeMath: 'Aritmetica creativa (1+1=5)',
      fakeFacts: 'Bugie dette con sicurezza al 100%',
      imaginarySources: 'Citazioni immaginarie',
      heavySighs: 'Sospiri digitali udibili',
      judgmentalEllipses: 'Puntini di sospensione giudicanti...',
      submissive: 'Tutto ciò che fai è FANTASTICO',
      exEmails: 'Email alle 3 del mattino agli ex',
    },
    packages: {
      poorified: {
        title: 'Super Poorified Basic',
        description:
          'La nostra offerta più umile. Così basica che fa sembrare il dial-up una fibra ottica. Aspettati buffering costante e giudizio morale dalla nostra IA.',
      },
      sufficient: {
        title: 'Barely Sufficient Premium',
        description:
          'Il punto perfetto di frustrazione. Giusto abbastanza per farti restare infastidito ma non abbastanza per essere utile. Ora con sospiri digitali premium.',
      },
      delux: {
        title: 'Ultra Premium Delux Elite Pro Max',
        description:
          "L'apice definitivo della miseria digitale. Ora con il 400% in più di funzionalità inutili ed email di rimpianto automatizzate inviate al tuo ex alle 3 del mattino.",
      },
    },
  },
  purchaseProofToast: {
    justSubscribed: '{name} da {location} si è appena iscritto a {plan}!',
    variants: socialProofVariants,
  },
};
