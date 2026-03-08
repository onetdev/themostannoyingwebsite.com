import type { ContentI18nShape } from '../types';

export default {
  paywall: {
    overlay: {
      title:
        'Vagy fizetned kell {price}/órát 24 hónapos hűségidővel a következő bekezdés megtekintéséhez, vagy folyamatosan a másodlagos gombra kell kattintanod.',
      disclaimer:
        'lehet, hogy nem annyira biztonságos és legális, de ez nem számít, mert ezen a weboldalon valójában nem tudsz fizetni.',
      confirm: 'Fizetés! 100% legális és biztonságos',
      cancel: 'Add oda ingyen az ingyenes cuccot',
    },
  },
  article: {
    coverImage: 'Borítókép',
    published: 'Közzétéve: {date}',
    moreContentScroll: 'Van még itt tartalom a múltból, görgess!',
  },
  search: {
    placeholder: 'Keresés...',
    noResults: 'Nincs találat',
    resultMeta:
      'A(z) "{query}" kifejezésre történő keresés {time}ms-ig tartott és {count} találatot hozott',
    searching: 'Keresés',
    peopleAlsoSearched: 'Mások ezekre kerestek még:',
    topSearchVariants: {
      variant_001: 'szomjasak-e a halak',
      variant_002: 'tészta dalszöveg',
      variant_003: 'elfogy-e az autóból a duda',
      variant_004: 'nem működik az internet',
      variant_005: 'hallgatózik-e a facebook a telefonon keresztül',
      variant_006: 'miért van pénz szagom',
      variant_007: 'lehet-e zselében úszni',
      variant_008:
        'hogyan mondjam meg udvariasan valakinek hogy hagyma szaga van',
      variant_009: 'nem látom a tükörképem a tükörben',
      variant_010: 'áram feltalálása',
      variant_011: 'megkenni a kenyerét',
      variant_012: 'mém és varangy',
      variant_013: 'mocsári tesó',
    },
  },
  hotThings: {
    playVideo: 'Videó lejátszása',
    videoPlaybackFailed: 'A videó lejátszása sikertelen',
    pictureOfYou: 'Kép rólad',
    hotThingsVtt: 'Magyar',
  },
} satisfies ContentI18nShape;
