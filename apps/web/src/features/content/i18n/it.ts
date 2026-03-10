import type { ContentI18nShape } from '../types';

export default {
  paywall: {
    overlay: {
      title:
        'Devi pagare {price}/ora con 24 mesi di impegno per vedere il prossimo paragrafo oppure continuare a cliccare sul pulsante secondario.',
      disclaimer:
        'potrebbe non essere così sicuro e legale, ma non importa perché non puoi effettivamente pagare su questo sito web.',
      confirm: 'Paga! 100% legale e sicuro',
      cancel: 'Voglio roba gratis gratuitamente',
    },
  },
  article: {
    coverImage: 'Immagine di copertina',
    published: 'Pubblicato il {date}',
    moreContentScroll: "C'è altro dal passato, scorri!",
  },
  search: {
    placeholder: 'Cerca...',
    noResults: 'Nessun risultato trovato',
    resultMeta:
      'La ricerca per "{query}" ha richiesto {time}ms e ha trovato {count} risultati',
    searching: 'Ricerca in corso',
    error: 'Ricerca fallita, riprova più tardi',
    peopleAlsoSearched: 'Le persone hanno cercato anche:',
    topSearchVariants: {
      variant_001: 'i pesci hanno sete',
      variant_002: 'testo pasta',
      variant_003: 'le auto finiscono il clacson',
      variant_004: 'internet non funziona',
      variant_005: 'facebook può ascoltare dal telefono',
      variant_006: 'perché sento odore di monetine',
      variant_007: 'si può nuotare nella gelatina',
      variant_008: 'come dire gentilmente a qualcuno che puzza di cipolla',
      variant_009: 'non vedo il riflesso nello specchio',
      variant_010: 'invenzione elettricità',
      variant_011: 'strofina il suo pane',
      variant_012: 'meme e rospo',
      variant_013: 'fratello di palude',
    },
  },
  hotThings: {
    playVideo: 'Riproduci video',
    videoPlaybackFailed: 'Riproduzione video fallita',
    pictureOfYou: 'Foto di te',
  },
} satisfies ContentI18nShape;
