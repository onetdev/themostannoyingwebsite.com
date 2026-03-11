import type { MarketingI18nShape } from '../types';
import onlySpamsVariants from './only-spams-variants/en';
import questionVariants from './quiz-variants/hu';

export default {
  dilf: {
    title: 'DILF',
    fullTitle: "DILF - Donut I'd Like to Feast On",
    description:
      'Ha a környéked legfinomabb, legforróbb, legszinglibb és legellenállhatatlanabb fánkjait keresed, a tökéletes helyen jársz. Készen állsz a kihívásra, hogy megtaláld az igazi szerelmet? Kattints az itt található fánkok bármelyikére, hogy megtudd, melyiket rendelte neked a sors.',
    flapLeft: 'DILF. Forró szingli fánkok a közeledben',
    flapRight: 'DILF. A legfinomabb fánkok a szomszédban',
    finderOverlayTitle: 'Találd meg a fánkodat',
  },
  wanPhone: {
    title: 'Gratulálunk! Nyertél egy telefont! Flaimelj most!',
    survey: {
      questionVariants: questionVariants,
      description:
        'Töltsd ki ezt a gyors felmérést, és esélyed nyílhat flaimelni az új telefonodat! Légy pontos és gyors, de ne túl gyors.',
      result: {
        cheatDetected: {
          text: 'Csalás észlelve! Nem flaimelheted a telefonodat.',
          callToAction: 'Vissza a főoldalra',
        },
        completed: {
          text: 'Köszönjük a részvételt! Sajnos a telefont jelenleg nem lehet flaimelni.',
          callToAction: 'Vissza a főoldalra',
        },
        lost: {
          text: 'A fenébe, elvétettél néhány választ. Milyen kár!',
          callToAction: 'Vissza a főoldalra',
        },
        timeout: {
          text: 'Sajnos úgy tűnik, nem fejezted be időben a felmérést.',
          callToAction: 'Vissza a főoldalra',
        },
      },
    },
  },
  suspectBar: {
    title: 'Reklámblokkoló gyanúja!',
    description:
      'Úgy tűnik, reklámblokkolót használsz. Ez egy kicsit fura, nem? Nagy dolgokról maradsz le! Kérlek, fontold meg a kikapcsolását. Addig is, minden alkalommal, amikor meglátogatod ezt az oldalt, ezt a hatalmas piros sávot fogod látni alul. És kérlek, ne zárd be az OK gombbal sem. Egészségedre!',
  },
  newsletterModal: {
    title: 'Csatlakozz a hírlevelünkhöz!',
    description:
      'Prémium hírlevelünk őrült mennyiségű értéket visz egyenesen a postaládádba. Ne maradj le a felismerésekről, amik valódi változást hoznak!',
    placeholder: 'Add meg az e-mail címed',
    onlySpamsLabel: 'Én is szeretnék OnlySpams-et kapni (ajánlott)',
    onlySpamsDetails: '(részletek)',
    initialConfirm: 'Feliratkozás',
    initialCancel: 'Mégse iratkozom fel',
    useFormActions: 'Kérlek, használd helyette a megfelelő gombot',
    confirmations: {
      confirmation_001: {
        text: 'Sajnálattal látjuk, hogy talán nem volt elég időd teljes mértékben átgondolni ezt a fontos és kihívást jelentő döntést.',
        confirm: 'Átgondoltam, még mindig akarom',
        cancel: 'Igazad van, mégse',
      },
      confirmation_002: {
        text: 'Sajnáljuk, hogy feliratkozol, megajándékozhatunk-e azzal az örömmel, hogy egyáltalán nem vagy feliratkozó?',
        confirm: 'Nem, köszi',
        cancel: 'Kérem az ajándékomat!',
      },
      confirmation_003: {
        text: 'Fontolóra vetted már, hogy kihagyod ezt a hírlevelet?',
        confirm: 'Nem',
        cancel: 'Igen',
      },
      confirmation_004: {
        text: 'A hírlevélre való feliratkozásnak káros mellékhatásai lehetnek. Még mindig benne vagy?',
        confirm: 'Elfogadom a mellékhatásokat',
        cancel: 'Vigyél innen el',
      },
    },
  },
  wheelOfFortune: {
    title: 'Szerencsekerék',
    spinStart: 'Kattints vagy koppints ide!',
    spinWin: 'Nyertél! {prize}',
    prizeVariants: {
      freeLifetimeBeer: 'Ingyen sör örökre',
      worldPeace: 'Világbéke',
      absolutelyNothing: 'A nagy büdös semmi',
      complimentaryOtter: 'Ingyen vidra',
      fake70Discount: 'Kamuzott 70%-os kedvezmény',
    },
    wheelTitle: 'Szerencsekerék',
  },
  onlySpams: {
    title: 'OnlySpams - Prémium hírlevél',
    description:
      'Csatlakozz a világ legexkluzívabb postaláda-rajongói köréhez. Mi nem csak e-maileket küldünk; érzelmeket, lehetőségeket és nagyon specifikus orvosi tanácsokat küldünk.',
    testimonials: {
      title: 'Mit mondanak a „Feliratkozóink”',
      items: onlySpamsVariants.testimonials,
    },
    samples: {
      title: 'Példák az értékteremtésre',
      subject: 'Tárgy:',
      items: onlySpamsVariants.samples,
    },
    subscribe: 'Feliratkozás most',
  },
} satisfies MarketingI18nShape;
