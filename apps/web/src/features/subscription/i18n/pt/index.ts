import socialProofVariants from './purchase-proof-variants';

export default {
  landing: {
    headline: 'O Upgrade de IA Definitivo *',
    disclaimer: {
      title: '* AVISO LEGAL!',
      description:
        'Tudo nesta página é 100% falso. Estes pacotes não existem e comprá-los é impossível porque não temos um processador de pagamentos, nem sequer um backend real.',
    },
    urgency: {
      title: 'OFERTA POR TEMPO LIMITADO!',
      description:
        'Faltam {timer} para que estes grandes descontos desapareçam para sempre. Esta é uma oportunidade única na vida, não desiluda os seus netos!',
      compact: 'OFERTA LIMITADA! -{discount}% {timer}',
      expired: 'DESCULPE! Acabou de perder a promoção!',
    },
    billing: {
      monthly: 'Mensal',
      yearly: 'Anual',
      biyearly: '2 Anos',
      cycle: {
        monthly: 'faturado mensalmente',
        yearly: 'faturado todos os anos',
        biyearly: 'faturado a cada 2 anos',
      },
      chargeDisclaimer: 'Será cobrado {amount} hoje',
    },
    mostPopular: 'Mais Popular',
    pricePerMonth: '{price}/mês',
    discount: '-{amount}%',
    table: {
      features: 'Funcionalidades',
    },
    features: {
      lowTierLimits: 'Limitado de todas as formas possíveis',
      superSlowSpeed: 'Intencionalmente lento',
      adSupported: 'Com anúncios (Muitos deles)',
      ramPriceSpike: 'Picos nos preços da RAM',
      gpuPriceSpike: 'Picos nos preços do GPU',
      creativeMath: 'Aritmética Criativa (1+1=5)',
      fakeFacts: 'Mentiras 100% Confiantes',
      imaginarySources: 'Citações Imaginárias',
      heavySighs: 'Suspiros Digitais Audíveis',
      judgmentalEllipses: 'Reticências Julgadoras...',
      submissive: 'Tudo o que faz é INCRÍVEL',
      exEmails: 'Emails às 3 da manhã para Ex-namorados(as)',
    },
    packages: {
      poorified: {
        title: 'Super Pobrificado Básico',
        description:
          'A nossa oferta mais humilde. Tão básico que faz o dial-up parecer fibra. Espere carregamentos constantes e julgamento moral da nossa IA.',
      },
      sufficient: {
        title: 'Premium Apenas Suficiente',
        description:
          'O ponto ideal da frustração. O suficiente para o manter irritado, mas não o suficiente para ser realmente útil. Agora com suspiros digitais premium.',
      },
      delux: {
        title: 'Ultra Premium Delux Elite Pro Max',
        description:
          'O pico máximo da miséria digital. Agora com 400% mais funcionalidades desnecessárias e emails automáticos de arrependimento enviados para o seu ex às 3 da manhã.',
      },
    },
  },
  purchaseProofToast: {
    justSubscribed: '{name} de {location} acabou de subscrever o {plan}!',
    variants: socialProofVariants,
  },
};
