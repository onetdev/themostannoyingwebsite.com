import type { MarketingI18nShape } from '../types';
import onlySpamsVariants from './only-spams-variants/en';
import questionVariants from './quiz-variants/fr';

export default {
  dilf: {
    title: 'DILF',
    fullTitle:
      "DILF - Donut I'd Like to Feast On (Donut que j'aimerais dévorer)",
    description:
      "Si vous cherchez les donuts les plus savoureux, les plus chauds, les plus célibataires et les plus irrésistibles de votre région, vous êtes au bon endroit. Êtes-vous prêt à relever le défi de trouver votre véritable amour ? Cliquez sur n'importe quel donut ici pour découvrir celui qui vous est destiné.",
    flapLeft: 'DILF. Donuts célibataires et chauds dans votre région',
    flapRight: 'DILF. Les donuts les plus savoureux à proximité',
    finderOverlayTitle: 'Trouvez votre donut',
  },
  wanPhone: {
    title:
      'Félicitations ! Vous avez ganié un téléphone ! Réclamez mintenant !',
    survey: {
      questionVariants,
      description:
        'Remplissez ce sondage rapide et vous aurez peut-être une chance de réclamer votre nouveau téléphone ! Soyez précis et rapide, mais pas trop rapide.',
      result: {
        cheatDetected: {
          text: "Triche détectée ! Vous n'êtes pas autorisé à réclamer votre téléphone.",
          callToAction: "Retour à l'accueil",
        },
        completed: {
          text: 'Merci de votre participation ! Malheureusement, le téléphone ne peut pas être réclamé pour le moment.',
          callToAction: "Retour à l'accueil",
        },
        lost: {
          text: 'Mince, vous avez raté quelques réponses. Quel dommage !',
          callToAction: "Retour à l'accueil",
        },
        timeout: {
          text: "Désolé, il semble que vous n'ayez pas terminé le sondage à temps.",
          callToAction: "Retour à l'accueil",
        },
      },
    },
  },
  suspectBar: {
    title: 'Adblocker suspecté !',
    description:
      "Il semble que vous utilisiez un bloqueur de publicités. C'est un peu bizarre, non ? Vous ratez quelque chose d'énorme ! S'il vous plaît, envisagez de le désactiver. En attendant, vous verrez cette énorme bannière rouge en bas à chaque fois que vous visiterez ce site. Et s'il vous plaît, ne la fermez pas en utilisant le bouton OK non plus. Santé !",
  },
  newsletterModal: {
    title: 'Rejoignez notre newsletter !',
    description:
      'Notre newsletter premium apporte une valeur folle directement dans votre boîte de réception. Ne manquez pas les informations qui font une vraie différence !',
    placeholder: 'Entrez votre email',
    onlySpamsLabel: 'Je souhaite également recevoir OnlySpams™ (Recommandé)',
    onlySpamsDetails: '(détails)',
    initialConfirm: "S'abonner",
    initialCancel: "Ne pas s'abonner",
    useFormActions: 'Veuillez utiliser le bouton approprié à la place',
    confirmations: {
      confirmation_001: {
        text: "Nous sommes déçus de voir que vous n'avez peut-être pas eu assez de temps pour réfléchir pleinement à cette décision importante et difficile.",
        confirm: "J'y ai réfléchi, je veux toujours",
        cancel: 'Vous avez raison, annuler',
      },
      confirmation_002: {
        text: 'Nous sommes désolés de vous voir vous abonner, pouvons-nous vous offrir les joies de ne pas être abonné du tout ?',
        confirm: 'Non merci',
        cancel: 'Je veux mon cadeau !',
      },
      confirmation_003: {
        text: 'Avez-vous envisagé de ne pas vous inscrire à cette newsletter ?',
        confirm: 'Non',
        cancel: 'Oui',
      },
      confirmation_004: {
        text: "L'abonnement à cette newsletter pourrait avoir des effets secondaires indésirables. Êtes-vous toujours partant ?",
        confirm: "J'accepte les effets secondaires",
        cancel: 'Sortez-moi de là',
      },
    },
  },
  wheelOfFortune: {
    title: 'Roue de la fortune',
    spinStart: 'Cliquez ou Appuyez ici !',
    spinWin: 'Vous avez gagné ! {prize}',
    prizeVariants: {
      freeLifetimeBeer: 'Bière gratuite à vie',
      worldPeace: 'La paix dans le monde',
      absolutelyNothing: 'Absolument rien',
      complimentaryOtter: 'Une loutre offerte',
      fake70Discount: 'Fausse remise de 70 %',
    },
    wheelTitle: 'Roue de la fortune',
  },
  onlySpams: {
    title: 'OnlySpams™ - Newsletter Premium',
    description:
      "Rejoignez le cercle le plus exclusif d'amateurs de boîtes de réception au monde. Nous n'envoyons pas seulement des e-mails ; nous envoyons des émotions, des opportunités et des conseils médicaux très spécifiques.",
    testimonials: {
      title: 'Ce que disent nos "abonnés"',
      items: onlySpamsVariants.testimonials,
    },
    samples: {
      title: 'Exemples de valeur ajoutée',
      subject: 'Sujet :',
      items: onlySpamsVariants.samples,
    },
    subscribe: "S'abonner maintenant",
  },
} satisfies MarketingI18nShape;
