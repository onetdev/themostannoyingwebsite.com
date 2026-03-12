import type { MarketingI18nShape } from '../../types';
import onlySpamsVariants from './only-spams-variants';
import questionVariants from './quiz-variants';

export default {
  dilf: {
    title: 'DILF',
    fullTitle: "DILF - Donut I'd Like to Feast On (Donut che vorrei divorare)",
    description:
      'Se stai cercando le ciambelle più gustose, calde, singole e irresistibili della tua zona, sei nel posto perfetto. Sei pronto ad accettare la sfida di trovare il tuo vero amore? Clicca su una qualsiasi delle ciambelle qui per scoprire quale è destinata a te.',
    flapLeft: 'DILF. Calde ciambelle singole nella tua zona',
    flapRight: 'DILF. Le ciambelle più gustose nelle tue vicinanze',
    finderOverlayTitle: 'Trova la tua ciambella',
  },
  wanPhone: {
    title: 'Congratulazioni! Hai vinto un telefono! Richiedilo ora!',
    survey: {
      questionVariants,
      description:
        'Compila questo breve sondaggio e potresti avere la possibilità di richiedere il tuo nuovo telefono! Sii preciso e veloce, ma non troppo veloce.',
      result: {
        cheatDetected: {
          text: 'Trucco rilevato! Non ti è permesso richiedere il tuo telefono.',
          callToAction: 'Torna alla home',
        },
        completed: {
          text: 'Grazie per aver partecipato! Sfortunatamente il telefono non può essere richiesto in questo momento.',
          callToAction: 'Torna alla home',
        },
        lost: {
          text: 'Accidenti, hai sbagliato alcune risposte. Che peccato!',
          callToAction: 'Torna alla home',
        },
        timeout: {
          text: 'Spiacenti, sembra che tu non abbia finito il sondaggio in tempo.',
          callToAction: 'Torna alla home',
        },
      },
    },
  },
  suspectBar: {
    title: 'Sospetto Adblocker!',
    description:
      "Sembra che tu stia usando un ad blocker. È un po' strano, no? Ti stai perdendo il meglio! Per favore, considera di disattivarlo. Fino ad allora, vedrai questo enorme banner rosso in fondo ogni volta che visiterai questo sito. E per favore, non chiuderlo usando il pulsante OK. Saluti!",
  },
  newsletterModal: {
    title: 'Iscriviti alla nostra newsletter!',
    description:
      'La nostra newsletter premium porta un valore pazzesco direttamente nella tua casella di posta. Non perderti approfondimenti che fanno davvero la differenza!',
    placeholder: 'Inserisci la tua email',
    onlySpamsLabel: 'Voglio ricevere anche OnlySpams (Consigliato)',
    onlySpamsDetails: '(dettagli)',
    initialConfirm: 'Iscriviti',
    initialCancel: 'Non iscrivermi',
    useFormActions: 'Per favore usa il pulsante pertinente invece',
    confirmations: {
      confirmation_001: {
        text: 'Siamo delusi nel vedere che potresti non aver avuto abbastanza tempo per considerare appieno questa decisione importante e impegnativa.',
        confirm: 'Ci ho pensato, voglio ancora iscrivermi',
        cancel: 'Hai ragione, annulla',
      },
      confirmation_002: {
        text: 'Ci dispiace vederti iscrivere, possiamo offrirti le gioie di non essere affatto un iscritto?',
        confirm: 'No grazie',
        cancel: 'Voglio il mio premio!',
      },
      confirmation_003: {
        text: 'Hai considerato di saltare questa newsletter?',
        confirm: 'No',
        cancel: 'Sì',
      },
      confirmation_004: {
        text: "L'iscrizione a questa newsletter potrebbe avere effetti collaterari avversi. Sei ancora dei nostri?",
        confirm: 'Accetto gli effetti collaterali',
        cancel: 'Fammi uscire di qui',
      },
    },
  },
  wheelOfFortune: {
    title: 'Ruota della fortuna',
    spinStart: 'Clicca o tocca qui!',
    spinWin: 'Hai vinto! {prize}',
    prizeVariants: {
      freeLifetimeBeer: 'Birra gratis a vita',
      worldPeace: 'Pace nel mondo',
      absolutelyNothing: 'Assolutamente nulla',
      complimentaryOtter: 'Lontra in omaggio',
      fake70Discount: 'Finto sconto del 70%',
    },
    wheelTitle: 'Ruota della fortuna',
  },
  onlySpams: {
    title: 'OnlySpams - Newsletter Premium',
    description:
      'Unisciti alla cerchia più esclusiva al mondo di entusiasti della posta in arrivo. Non inviamo solo e-mail; inviamo emozioni, opportunità e consigli medici molto specifici.',
    testimonials: {
      title: 'Cosa dicono i nostri "abbonati"',
      verified: 'Verificato',
      items: onlySpamsVariants.testimonials,
    },
    samples: {
      title: 'Esempi di valore aggiunto',
      sender: 'Mittente:',
      subject: 'Oggetto:',
      folder: 'Cartella:',
      spam: 'SPAM',
      cta: 'SONO INTERESSATO',
      items: onlySpamsVariants.samples,
    },
    subscribe: 'Iscriviti ora',
  },
} satisfies MarketingI18nShape;
