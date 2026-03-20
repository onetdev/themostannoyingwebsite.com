import type { SubscriptionI18nShape } from '../../types';
import socialProofVariants from './purchase-proof-variants';

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
    status: {
      outOfStock: 'Nicht vorrätig',
    },
    table: {
      features: 'Funktionen',
    },
    cancellation: {
      link: 'Abonnement kündigen',
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
  specialDeal: {
    headline: 'WARTEN SIE! GEHEN SIE NICHT! WIR HABEN EIN GESCHENK! 🎁',
    description:
      'Wir haben bemerkt, dass Sie versuchen zu gehen. War es etwas, das wir gesagt haben? Waren es die urteilenden Ellipsen? Wir können uns ändern! (Warten Sie, nein, das können wir nicht).',
    offer:
      'Das Angebot ist aufgrund der hohen Nachfrage nicht vorrätig! Bleiben Sie auf dieser Seite, bis es wieder da ist!',
    backToCancellation: 'Hmm, bringen Sie mich zurück zur Kündigung',
  },
  purchaseProofToast: {
    justSubscribed: '{name} aus {location} hat gerade {plan} abonniert!',
    variants: socialProofVariants,
  },
  cancellation: {
    page: {
      title: 'Abonnement kündigen',
    },
    reasons: {
      title: 'Grund',
      description:
        'Es ist wirklich schwer zu glauben, dass Sie Ihr Abonnement so feige kündigen wollen. Warum???',
      list: [
        'MAW hat alle meine Probleme in meinem Leben gelöst. Aber ich vermisse die Traurigkeit.',
        'Ich habe die Finanzdisziplin eines Waschbären in einem Verkaufsautomaten.',
        'Ich kündige, bevor meine Freunde entdecken, wie sehr mir das gefallen hat.',
        'Ich renne wieder einmal vor meinen Problemen davon wie eine Zeichentrickfigur.',
        'Zu belastend für meinen PC',
        'Bindungsängste.',
        'Ich kann einfach nicht mit so viel persönlichem Wachstum umgehen.',
        'Meine Mutter hat herausgefunden, dass ich ihre Kreditkarte benutzt habe',
      ],
    },
    essay: {
      title: 'Ausstiegsinterview-Essay',
      description:
        'Um sicherzustellen, dass Ihre Entscheidung endgültig und gut überlegt ist, schreiben Sie bitte einen Essay über Ihre Erfahrungen (mind. 3000 Zeichen). Dieser wird persönlich von unserem CEO geprüft, bevor er bearbeitet wird.',
      placeholder:
        'Fangen Sie hier an, Ihr 3000-Zeichen-Meisterwerk zu tippen...',
      characters: 'Zeichen: {count} / 3000',
      action: {
        abort: 'Kündigung abbrechen',
        next: 'Ich habe meinen obligatorischen Essay fertiggestellt und möchte mit dem nächsten Verifizierungsschritt fortfahren',
      },
    },
    valdo: {
      title: 'Schritt 3: Lassen Sie sich vom Licht leiten',
      description:
        'Es gibt nur einen wahren Abbestell-Button auf dieser Seite. Vertrauen Sie Ihrem inneren Licht, um Sie zu führen. Wenn Sie den funktionierenden nicht finden können, schlägt das Universum Ihnen vielleicht sanft vor zu bleiben.',
      buttonLabel: 'Abbestellen',
      error: 'Falscher Button! Gebühr erhoben: {amount}',
    },
    upsell: {
      title:
        'Warten Sie! Gehen Sie nicht! Geben Sie uns bitte noch eine Chance!',
      description:
        'Wir haben bemerkt, dass Sie versuchen, nicht zu gehen. Wie wäre es mit unserem "Platin-Abbestellschutz"-Plan? Er ist nur für Leute verfügbar, die gehen wollen.',
      promo: 'RIESEN-DEAL!\nBIS ZU 99% RABATT!!!',
      action: {
        specialDeal: 'Ich möchte das Sonderangebot',
        stay: 'Ja, ich möchte nicht gehen',
        next: 'Trotz allem beabsichtige ich, mein Abonnement zu kündigen. Ich bin das Problem, nicht ihr.',
      },
    },
    email: {
      title: 'Wer sind Sie?',
      label: 'Geben Sie Ihre E-Mail-Adresse für den Kündigungsvorgang an.',
      placeholder: 'treuer-kunde@themostannoyingwebsite.com',
      action: {
        discount:
          'Wissen Sie was, ich habe meine Meinung geändert, ich möchte den Rabatt!',
        next: 'Ich bin sicher, lassen Sie uns mit der Kündigung fortfahren',
      },
    },
    confirmation: {
      title: 'FINALE VERIFIZIERUNG ERFORDERLICH',
      description:
        'Ihre Anfrage wurde vorbereitet, aber aus Sicherheitsgründen und um versehentliche Abbestellungen zu verhindern, müssen Sie nun den physischen Verifizierungsprozess abschließen.',
      alert: {
        title: 'Anleitung:',
        step1: 'Klicken Sie unten auf den Button "Zur Verifizierung drucken".',
        step2: 'Drucken Sie das Dokument auf physisches Papier aus.',
        step3:
          'Unterschreiben Sie das Dokument in Anwesenheit von ZWEI (2) Zeugen.',
        step4: 'Lassen Sie beide Zeugen unterschreiben.',
        step5:
          'Machen Sie ein hochauflösendes Foto des unterschriebenen Dokuments.',
        step6:
          'Senden Sie das Foto per E-Mail an <email>support@themostannoyingwebsite.com</email>',
        note: 'Bitte beachten Sie, dass die Bearbeitung bis zu 10^15 Werktage dauert.',
      },
      action: {
        print: '🖨️ ZUR VERIFIZIERUNG DRUCKEN 🖨️',
        abort: 'Mein Abonnement behalten',
        upgrade: 'Jetzt upgraden',
        specialDeal: 'Das Sonderangebot holen',
      },
      alternative:
        'Alternativ, falls Sie Ihre Meinung geändert haben (dringend empfohlen):',
    },
    print: {
      title: 'Offizielles Abmeldeformular',
      documentId: 'Dokumenten-ID: {id}',
      sections: {
        account: '1. KONTOINFORMATIONEN',
        details: '2. KÜNDIGUNGSDETAILS',
        signatures: '3. UNTERSCHRIFTEN & ZEUGEN',
      },
      fields: {
        email: 'E-Mail-Adresse:',
        date: 'Datum der Anfrage:',
        reason: 'Hauptgrund für das Verlassen:',
        feedback: 'Detailliertes Feedback:',
      },
      signatures: {
        subscriber: 'Unterschrift des Abonnenten',
        subscriberName: 'Name des Abonnenten (Druckbuchstaben)',
        witness1: 'Unterschrift Zeuge 1',
        witness1Name: 'Name Zeuge 1 (Druckbuchstaben)',
        witness2: 'Unterschrift Zeuge 2',
        witness2Name: 'Name Zeuge 2 (Druckbuchstaben)',
        dateLabel: 'Datum: ____________________',
      },
      footer:
        'Dies ist kein echtes Dokument, sondern nur eine weitere satirische Reflexion von Trends. Besuchen Sie themostannoyingwebsite.com/de/terms-of-use und themostannoyingwebsite.com/de/privacy-policy für weitere Informationen.',
    },
  },
} satisfies SubscriptionI18nShape;
