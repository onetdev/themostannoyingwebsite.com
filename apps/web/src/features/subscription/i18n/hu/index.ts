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
    status: {
      outOfStock: 'Elfogyott',
    },
    table: {
      features: 'Funkciók',
    },
    cancellation: {
      link: 'Előfizetés lemondása',
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
  specialDeal: {
    headline: 'VÁRJ! NE MENJ EL! VAN EGY AJÁNDÉKUNK! 🎁',
    description:
      'Észrevettük, hogy megpróbáltál elmenni. Valami olyat mondtunk? Az ítélkező három pont volt az? Meg tudunk változni! (Várj, nem, nem tudunk).',
    offer:
      'Az ajánlat a nagy kereslet miatt elfogyott! Maradj ezen az oldalon a készletfeltöltésig!',
    backToCancellation: 'Hmm, vigyél vissza a lemondáshoz',
  },
  purchaseProofToast: {
    justSubscribed:
      '{name} innen: {location} épp most fizetett elő erre: {plan}!',
    variants: socialProofVariants,
  },
  cancellation: {
    page: {
      title: 'Előfizetés lemondása',
    },
    reasons: {
      title: 'Indok',
      description:
        'Nagyon nehéz elhinni, hogy gyáván le akarod mondani az előfizetésedet. Miért???',
      list: [
        'A MAW minden problémámat megoldotta az életemben. Azonban hiányzik a szomorúság.',
        'Egy automata gépben lévő mosómedve pénzügyi fegyelmével rendelkezem.',
        'Még azelőtt lemondom, hogy a barátaim rájönnének, mennyire élveztem ezt.',
        'Már megint úgy menekülök a problémáim elől, mint egy rajzfilmfigura.',
        'Túlságosan megterheli a PC-met',
        'Elköteleződési problémák.',
        'Egyszerűen nem tudok megbirkózni ennyi személyes fejlődéssel.',
        'Anyukám rájött, hogy az ő bankkártyáját használtam',
      ],
    },
    essay: {
      title: 'Kilépési Interjú Esszé',
      description:
        'Annak érdekében, hogy döntésed végleges és jól megfontolt legyen, kérjük, írj egy esszét a tapasztalataidról (min. 3000 karakter). Ezt a vezérigazgatónk személyesen fogja átnézni a feldolgozás előtt.',
      placeholder: 'Kezdd el gépelni a 3000 karakteres remekművedet itt...',
      characters: 'Karakterek: {count} / 3000',
      action: {
        abort: 'Lemondás megszakítása',
        next: 'Befejeztem a kötelező esszémet, és szeretnék továbblépni a következő ellenőrzési lépésre',
      },
    },
    valdo: {
      title: '3. lépés: Vezessen a fény',
      description:
        'Csak egyetlen valódi leiratkozási gomb van ezen az oldalon. Bízz a belső fényedben, hogy vezessen. Ha nem találod a működőt, az lehet, hogy az univerzum gyengéd javaslata, hogy maradj.',
      buttonLabel: 'Leiratkozás',
      error: 'Rossz gomb! Díj felszámítva: {amount}',
    },
    upsell: {
      title: 'Várj! Ne menj el! Adj nekünk még egy esélyt kérlek!',
      description:
        'Észrevettük, hogy megpróbálsz nem elmenni. Mit szólnál a "Platina Leiratkozás Elleni Védelem" tervünkhöz? Ez csak azoknak érhető el, akik el akarnak menni.',
      promo: 'HATALMAS AJÁNLAT!\nAKÁR 99% KEDVEZMÉNY!!!',
      action: {
        specialDeal: 'Kérem a különleges ajánlatot',
        stay: 'Igen, nem akarok elmenni',
        next: 'Mindennek ellenére továbbra is az előfizetésem lemondására törekszem. Én vagyok a hiba, nem te.',
      },
    },
    email: {
      title: 'Ki vagy te?',
      label: 'Add meg az e-mail címedet a lemondási folyamathoz.',
      placeholder: 'huseges-ugyfel@themostannoyingwebsite.com',
      action: {
        discount: 'Tudod mit, meggondoltam magam, kérem a kedvezményt!',
        next: 'Biztos vagyok benne, folytassuk a lemondást',
      },
    },
    confirmation: {
      title: 'VÉGLEGES ELLENŐRZÉS SZÜKSÉGES',
      description:
        'Kérelmedet előkészítettük, de biztonsági okokból és a véletlen leiratkozások megelőzése érdekében most be kell fejezned a fizikai ellenőrzési folyamatot.',
      alert: {
        title: 'Utasítások:',
        step1: 'Kattints az alábbi "Nyomtatás az ellenőrzéshez" gombra.',
        step2: 'Nyomtasd ki a dokumentumot fizikai papírra.',
        step3: 'Írd alá a dokumentumot KÉT (2) tanú jelenlétében.',
        step4: 'Mindkét tanúval írasd alá.',
        step5: 'Készíts egy nagy felbontású fotót az aláírt dokumentumról.',
        step6:
          'Küldd el a fotót e-mailben a <email>support@themostannoyingwebsite.com</email> címre',
        note: 'Kérjük, vedd figyelembe, hogy a feldolgozás akár 10^15 munkanapot is igénybe vehet.',
      },
      action: {
        print: '🖨️ NYOMTATÁS AZ ELLENŐRZÉSHEZ 🖨️',
        abort: 'Előfizetésem megtartása',
        upgrade: 'Frissítés most',
        specialDeal: 'Kérem a különleges ajánlatot',
      },
      alternative:
        'Alternatív megoldásként, ha meggondoltad magad (erősen ajánlott):',
    },
    print: {
      title: 'Hivatalos Leiratkozási Kérelem',
      documentId: 'Dokumentum azonosító: {id}',
      sections: {
        account: '1. FIÓKINFORMÁCIÓK',
        details: '2. LEMONDÁSI RÉSZLETEK',
        signatures: '3. ALÁÍRÁSOK ÉS TANÚK',
      },
      fields: {
        email: 'E-mail cím:',
        date: 'Kérelem dátuma:',
        reason: 'Távozás elsődleges oka:',
        feedback: 'Részletes visszajelzés:',
      },
      signatures: {
        subscriber: 'Előfizető aláírása',
        subscriberName: 'Előfizető olvasható neve',
        witness1: '1. tanú aláírása',
        witness1Name: '1. tanú olvasható neve',
        witness2: '2. tanú aláírása',
        witness2Name: '2. tanú olvasható neve',
        dateLabel: 'Dátum: ____________________',
      },
      footer:
        'Ez nem egy valódi dokumentum, csak a trendek újabb szatirikus tükröződése. További információkért lásd: themostannoyingwebsite.com/hu/terms-of-use és themostannoyingwebsite.com/hu/privacy-policy.',
    },
  },
} satisfies SubscriptionI18nShape;
