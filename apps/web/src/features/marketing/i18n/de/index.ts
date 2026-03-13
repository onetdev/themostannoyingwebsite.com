import type { MarketingI18nShape } from '../../types';
import onlySpamsVariants from './only-spams-variants';
import questionVariants from './quiz-variants';

export default {
  dilf: {
    title: 'DILF',
    fullTitle:
      "DILF - Donut I'd Like to Feast On (Donut, den ich gerne verspeisen würde)",
    description:
      'Wenn Sie nach den leckersten, heißesten, einzelnsten und unwiderstehlichsten Donuts in Ihrer Nähe suchen, sind Sie hier genau richtig. Sind Sie bereit für die Herausforderung, Ihre wahre Liebe zu finden? Klicken Sie auf einen der Donuts hier, um zu entdecken, welcher für Sie bestimmt ist.',
    flapLeft: 'DILF. Heiße Single-Donuts in Ihrer Nähe',
    flapRight: 'DILF. Leckerste Donuts in Ihrer Umgebung',
    finderOverlayTitle: 'Finden Sie Ihren Donut',
  },
  wanPhone: {
    title: 'Glückwunsch! Sie haben ein Telefon gewunnen! Jetzt beanspruchen!',
    survey: {
      questionVariants,
      description:
        'Füllen Sie diese kurze Umfrage aus und Sie haben vielleicht die Chance, Ihr neues Telefon zu beanspruchen! Seien Sie präzise und schnell, aber nicht zu schnell.',
      result: {
        cheatDetected: {
          text: 'Betrug erkannt! Es ist Ihnen nicht erlaubt, Ihr Telefon zu beanspruchen.',
          callToAction: 'Zurück zur Startseite',
        },
        completed: {
          text: 'Vielen Dank für Ihre Teilnahme! Leider kann das Telefon derzeit nicht beansprucht werden.',
          callToAction: 'Zurück zur Startseite',
        },
        lost: {
          text: 'Mist, Sie haben ein paar Antworten verpasst. Wie schade!',
          callToAction: 'Zurück zur Startseite',
        },
        timeout: {
          text: 'Entschuldigung, es sieht so aus, als hätten Sie die Umfrage nicht rechtzeitig beendet.',
          callToAction: 'Zurück zur Startseite',
        },
      },
    },
  },
  suspectBar: {
    title: 'Adblocker vermutet!',
    description:
      'Es sieht so aus, als würden Sie einen Werbeblocker verwenden. Das ist ein bisschen merkwürdig, oder? Sie verpassen eine Menge! Bitte ziehen Sie in Erwägung, ihn auszuschalten. Bis dahin sehen Sie bei jedem Besuch dieser Seite dieses riesige rote Banner am unteren Rand. Und bitte schließen Sie es auch nicht über den OK-Button. Beste Grüße!',
  },
  newsletterModal: {
    title: 'Melden Sie sich für unseren Newsletter an!',
    description:
      'Unser Premium-Newsletter bringt eine wahnsinnige Menge an Mehrwert direkt in Ihren Posteingang. Verpassen Sie keine Erkenntnisse, die einen echten Unterschied machen!',
    placeholder: 'Geben Sie Ihre E-Mail ein',
    onlySpamsLabel: 'Ich möchte auch OnlySpams erhalten (empfohlen)',
    onlySpamsDetails: '(Details)',
    initialConfirm: 'Abonnieren',
    initialCancel: 'Nicht abonnieren',
    useFormActions: 'Bitte verwenden Sie stattdessen den entsprechenden Button',
    confirmations: {
      confirmation_001: {
        text: 'Wir sind enttäuscht zu sehen, dass Sie sich möglicherweise nicht genug Zeit genommen haben, um diese wichtige und herausfordernde Entscheidung vollständig zu überdenken.',
        confirm: 'Ich habe darüber nachgedacht, ich will immer noch',
        cancel: 'Sie haben recht, abbrechen',
      },
      confirmation_002: {
        text: 'Es tut uns leid zu sehen, dass Sie abonnieren. Können wir Sie mit den Freuden verwöhnen, überhaupt kein Abonnent zu sein?',
        confirm: 'Nein danke',
        cancel: 'Ich will meine Belohnung!',
      },
      confirmation_003: {
        text: 'Haben Sie in Erwägung gezogen, diesen Newsletter zu überspringen?',
        confirm: 'Nein',
        cancel: 'Ja',
      },
      confirmation_004: {
        text: 'Das Abonnieren dieses Newsletters könnte unerwünschte Nebenwirkungen haben. Sind Sie immer noch dabei?',
        confirm: 'Ich akzeptiere die Nebenwirkungen',
        cancel: 'Holen Sie mich hier raus',
      },
    },
  },
  wheelOfFortune: {
    title: 'Glücksrad',
    spinStart: 'Hier klicken oder tippen!',
    spinWin: 'Sie haben gewonnen! {prize}',
    prizeVariants: {
      freeLifetimeBeer: 'Gratis Bier auf Lebenszeit',
      worldPeace: 'Weltfrieden',
      absolutelyNothing: 'Absolut gar nichts',
      complimentaryOtter: 'Kostenloser Otter',
      fake70Discount: 'Gefälschter 70 % Rabatt',
    },
    wheelTitle: 'Glücksrad',
  },
  onlySpams: {
    title: 'OnlySpams - Premium-Newsletter',
    description:
      'Treten Sie dem exklusivsten Kreis von Posteingangs-Enthusiasten der Welt bei. Wir verschicken nicht nur E-Mails; wir verschicken Emotionen, Gelegenheiten und sehr spezifische medizinische Ratschläge.',
    testimonials: {
      title: 'Was unsere „Abonnenten“ sagen',
      verified: 'Verifiziert',
      items: onlySpamsVariants.testimonials,
    },
    samples: {
      title: 'Beispielhafte Mehrwerte',
      sender: 'Absender:',
      subject: 'Betreff:',
      folder: 'Ordner:',
      spam: 'SPAM',
      cta: 'ICH BIN INTERESSIERT',
      items: onlySpamsVariants.samples,
    },
    subscribe: 'Jetzt abonnieren',
  },
} satisfies MarketingI18nShape;
