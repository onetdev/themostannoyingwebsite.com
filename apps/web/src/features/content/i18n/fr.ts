import type { ContentI18nShape } from '../types';

export default {
  paywall: {
    overlay: {
      title:
        "Vous devez soit payer {price}/heure avec 24 mois d'engagement pour voir le paragraphe suivant, soit continuer à cliquer sur le bouton secondaire.",
      disclaimer:
        "ce n'est peut-être pas aussi sécurisé et légitime, mais cela n'a pas d'importance car vous ne pouvez pas réellement payer sur ce site.",
      confirm: 'Payer ! 100 % légit et sécurisé',
      cancel: 'Donnez-moi des trucs gratuits gratuitement',
    },
  },
  article: {
    coverImage: 'Image de couverture',
    published: 'Publié le {date}',
    moreContentScroll: "Il y en a d'autres du passé, faites défiler !",
  },
  search: {
    placeholder: 'Rechercher...',
    noResults: 'Aucun résultat trouvé',
    resultMeta:
      'La recherche pour "{query}" a pris {time} ms et a trouvé {count} résultats',
    searching: 'Recherche en cours',
    error: 'La recherche a échoué, veuillez réessayer plus tard',
    peopleAlsoSearched: 'Les gens ont aussi cherché :',
    topSearchVariants: {
      variant_001: 'les poissons ont-ils soif',
      variant_002: 'paroles de pasta',
      variant_003: 'est-ce que les voitures tombent en panne de klaxon',
      variant_004: 'internet ne fonctionne pas',
      variant_005: 'est-ce que facebook écoute via le téléphone',
      variant_006: 'pourquoi je sens la pièce de monnaie',
      variant_007: 'peut-on nager dans de la gelée',
      variant_008: "comment dire poliment à quelqu'un qu'il sent l'oignon",
      variant_009: 'je ne vois pas mon reflet dans le miroir',
      variant_010: "invention de l'électricité",
      variant_011: 'frotter son pain',
      variant_012: 'mème et crapaud',
      variant_013: 'grand frère marécage',
    },
  },
  hotThings: {
    playVideo: 'Lire la vidéo',
    videoPlaybackFailed: 'Échec de la lecture de la vidéo',
    pictureOfYou: 'Photo de vous',
  },
} satisfies ContentI18nShape;
