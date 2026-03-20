import type { SubscriptionI18nShape } from '../../types';
import socialProofVariants from './purchase-proof-variants';

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
    status: {
      outOfStock: 'Esaurito',
    },
    table: {
      features: 'Funzionalità',
    },
    cancellation: {
      link: 'Annulla abbonamento',
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
  specialDeal: {
    headline: 'ASPETTA! NON TE NE ANDARE! ABBIAMO UN REGALO! 🎁',
    description:
      'Abbiamo notato che stavi cercando di andartene. È stato qualcosa che abbiamo detto? Sono stati i puntini di sospensione giudicanti? Possiamo cambiare! (Aspetta, no, non possiamo).',
    offer:
      "L'offerta è esaurita a causa della forte richiesta! Rimani su questa pagina fino al rifornimento!",
    backToCancellation: 'Hmm, riportami all’annullamento',
  },
  purchaseProofToast: {
    justSubscribed: '{name} da {location} si è appena iscritto a {plan}!',
    variants: socialProofVariants,
  },
  cancellation: {
    page: {
      title: 'Annullamento abbonamento',
    },
    reasons: {
      title: 'Motivo',
      description:
        'È davvero difficile credere che tu voglia annullare vigliaccamente il tuo abbonamento. Perché???',
      list: [
        'MAW ha risolto tutti i miei problemi nella vita. Tuttavia, mi manca la tristezza.',
        'Ho la disciplina finanziaria di un procione in un distributore automatico.',
        'Annullerò prima che i miei amici scoprano quanto mi è piaciuto.',
        'Sto scappando di nuovo dai miei problemi come un personaggio dei cartoni animati.',
        'Troppo pesante per il mio PC',
        'Problemi di impegno.',
        'Semplicemente non riesco a gestire così tanta crescita personale.',
        'Mia madre ha scoperto che stavo usando la sua carta di credito',
      ],
    },
    essay: {
      title: 'Saggio del colloquio di uscita',
      description:
        'Per assicurarci che la tua decisione sia definitiva e ben ponderata, scrivi un saggio sulla tua esperienza (min. 3000 caratteri). Questo sarà revisionato personalmente dal nostro CEO prima dell’elaborazione.',
      placeholder:
        'Inizia a scrivere qui il tuo capolavoro di 3000 caratteri...',
      characters: 'Caratteri: {count} / 3000',
      action: {
        abort: 'Annulla annullamento',
        next: 'Ho completato il mio saggio obbligatorio e desidero procedere con la fase di verifica successiva',
      },
    },
    valdo: {
      title: 'Passaggio 3: Fatti guidare dalla luce',
      description:
        "C'è solo un vero pulsante di disiscrizione su questa pagina. Fidati della tua luce interiore per guidarti. Se non riesci a trovare quello funzionante, potrebbe essere l'universo che ti suggerisce gentilmente di restare.",
      buttonLabel: 'Disiscriviti',
      error: 'Pulsante sbagliato! Commissione applicata: {amount}',
    },
    upsell: {
      title:
        'Aspetta! Non te ne andare! Dacci un’altra possibilità per favore!',
      description:
        'Abbiamo notato che stai cercando di non andartene. Che ne dici del nostro piano "Protezione Annullamento Platinum"? È disponibile solo per le persone che vogliono andarsene.',
      promo: 'GRANDE AFFARE!\nFINO AL 99% DI SCONTO!!!',
      action: {
        specialDeal: 'Voglio l’offerta speciale',
        stay: 'Sì, voglio non andarmene',
        next: 'Nonostante tutto, miro ancora ad annullare il mio abbonamento. Il problema sono io, non voi.',
      },
    },
    email: {
      title: 'Chi sei?',
      label: 'Fornisci il tuo indirizzo email per il processo di annullamento.',
      placeholder: 'cliente-fedele@themostannoyingwebsite.com',
      action: {
        discount: 'Sai cosa, ho cambiato idea, voglio lo sconto!',
        next: 'Sono sicuro, continuiamo l’annullamento',
      },
    },
    confirmation: {
      title: 'VERIFICA FINALE RICHIESTA',
      description:
        'La tua richiesta è stata preparata, ma per motivi di sicurezza e per prevenire disiscrizioni accidentali, devi ora completare il processo di verifica fisica.',
      alert: {
        title: 'Istruzioni:',
        step1: 'Fai clic sul pulsante "Stampa per la verifica" qui sotto.',
        step2: 'Stampa il documento su carta fisica.',
        step3: 'Firma il documento alla presenza di DUE (2) testimoni.',
        step4: 'Fai firmare entrambi i testimoni.',
        step5: 'Scatta una foto ad alta risoluzione del documento firmato.',
        step6:
          'Invia la foto via email a <email>support@themostannoyingwebsite.com</email>',
        note: 'Tieni presente che l’elaborazione richiede fino a 10^15 giorni lavorativi.',
      },
      action: {
        print: '🖨️ STAMPA PER LA VERIFICA 🖨️',
        abort: 'Mantieni il mio abbonamento',
        upgrade: 'Aggiorna ora',
        specialDeal: 'Ottieni l’offerta speciale',
      },
      alternative:
        'In alternativa, se hai cambiato idea (altamente raccomandato):',
    },
    print: {
      title: 'Modulo di richiesta di disiscrizione ufficiale',
      documentId: 'ID documento: {id}',
      sections: {
        account: '1. INFORMAZIONI SULL’ACCOUNT',
        details: '2. DETTAGLI DELL’ANNULLAMENTO',
        signatures: '3. FIRME E TESTIMONI',
      },
      fields: {
        email: 'Indirizzo email:',
        date: 'Data della richiesta:',
        reason: 'Motivo principale per l’abbandono:',
        feedback: 'Feedback dettagliato:',
      },
      signatures: {
        subscriber: 'Firma dell’abbonato',
        subscriberName: 'Nome dell’abbonato in stampatello',
        witness1: 'Firma del testimone 1',
        witness1Name: 'Nome del testimone 1 in stampatello',
        witness2: 'Firma del testimone 2',
        witness2Name: 'Nome del testimone 2 in stampatello',
        dateLabel: 'Data: ____________________',
      },
      footer:
        'Questo non è un documento reale, solo un altro riflesso satirico delle tendenze. Vedi themostannoyingwebsite.com/it/terms-of-use e themostannoyingwebsite.com/it/privacy-policy per ulteriori informazioni.',
    },
  },
} satisfies SubscriptionI18nShape;
