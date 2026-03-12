import type { SubscriptionI18nShape } from '../../types';
import socialProofVariants from './purchase-proof-variants';

export default {
  landing: {
    headline: 'A Végső MI Frissítés *',
    disclaimer: {
      title: '* JOGI NYILATKOZAT!',
      description:
        'Ezen az oldalon minden 100%-ban hamis. Ezek a csomagok nem léteznek, és a megvásárlásuk lehetetlen, mivel nincs fizetési feldolgozónk, sőt, még valódi háttérrendszerünk sem.',
    },
    urgency: {
      title: 'KORLÁTOZOTT IDEIG TARTÓ AJÁNLAT!',
      description:
        '{timer} maradt, amíg ezek a hatalmas kedvezmények örökre el nem tűnnek. Ez egy egyszeri lehetőség az életben, ne okozz csalódást az unokáidnak!',
      compact: 'LIMITÁLT AJÁNLAT! -{discount}% {timer}',
      expired: 'SAJNÁLJUK! Épp most maradtál le az akcióról!',
    },
    billing: {
      monthly: 'Havi',
      yearly: 'Éves',
      biyearly: '2 éves',
      cycle: {
        monthly: 'havonta számlázva',
        yearly: 'évente számlázva',
        biyearly: '2 évente számlázva',
      },
      chargeDisclaimer: 'Ma {amount} kerül felszámításra',
    },
    mostPopular: 'Legnépszerűbb',
    pricePerMonth: '{price}/hó',
    discount: '-{amount}%',
    table: {
      features: 'Funkciók',
    },
    features: {
      lowTierLimits: 'Minden lehetséges módon korlátozott',
      superSlowSpeed: 'Szándékosan lassú',
      adSupported: 'Hirdetésekkel támogatott (nagyon sokkal)',
      ramPriceSpike: 'RAM árak felverése',
      gpuPriceSpike: 'GPU árak felverése',
      creativeMath: 'Kreatív aritmetika (1+1=5)',
      fakeFacts: '100% magabiztos hazugságok',
      imaginarySources: 'Képzeletbeli idézetek',
      heavySighs: 'Hallható digitális sóhajtozás',
      judgmentalEllipses: 'Ítélkező három pont...',
      submissive: 'Minden, amit teszel, CSODÁLATOS',
      exEmails: 'Hajnali 3-as e-mailek az exeknek',
    },
    packages: {
      poorified: {
        title: 'Szuper Lecsó Alap',
        description:
          'A legszerényebb ajánlatunk. Olyan alapvető, hogy a betárcsázós net mellette optikai szálasnak tűnik. Számíts folyamatos pufferelésre és erkölcsi ítélkezésre az MI-nktől.',
      },
      sufficient: {
        title: 'Épphogy Elégséges Prémium',
        description:
          'A frusztráció aranyközépútja. Pont elég ahhoz, hogy bosszantson, de nem elég ahhoz, hogy valóban hasznos legyen. Mostantól prémium digitális sóhajtozással.',
      },
      delux: {
        title: 'Ultra Prémium Delux Elite Pro Max',
        description:
          'A digitális nyomorúság végső csúcsa. Most 400%-kal több felesleges funkcióval és automatizált hajnali 3-as bűnbánó e-mailekkel az exednek.',
      },
    },
  },
  purchaseProofToast: {
    justSubscribed:
      '{name} innen: {location} épp most fizetett elő erre: {plan}!',
    variants: socialProofVariants,
  },
} satisfies SubscriptionI18nShape;
