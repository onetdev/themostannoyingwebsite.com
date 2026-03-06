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
};
