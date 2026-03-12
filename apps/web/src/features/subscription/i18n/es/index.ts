import socialProofVariants from './purchase-proof-variants';

export default {
  landing: {
    headline: 'La Actualización Definitiva de IA *',
    disclaimer: {
      title: '* ¡DESCARGO DE RESPONSABILIDAD!',
      description:
        'Todo en esta página es 100% falso. Estos paquetes no existen, y comprarlos es imposible porque no tenemos un procesador de pagos, ni siquiera un backend real para el caso.',
    },
    urgency: {
      title: '¡OFERTA POR TIEMPO LIMITADO!',
      description:
        '{timer} para que estos enormes descuentos desaparezcan para siempre. Esta es una oportunidad única en la vida, ¡no decepciones a tus nietos!',
      compact: '¡OFERTA LIMITADA! -{discount}% {timer}',
      expired: '¡LO SIENTO! ¡Acabas de perderte la venta!',
    },
    billing: {
      monthly: 'Mensual',
      yearly: 'Anual',
      biyearly: '2 Años',
      cycle: {
        monthly: 'facturado mensualmente',
        yearly: 'facturado cada año',
        biyearly: 'facturado cada 2 años',
      },
      chargeDisclaimer: 'Se te cobrará {amount} hoy',
    },
    mostPopular: 'Más Popular',
    pricePerMonth: '{price}/mes',
    discount: '-{amount}%',
    table: {
      features: 'Características',
    },
    features: {
      lowTierLimits: 'Limitado en todas las formas posibles',
      superSlowSpeed: 'Intencionalmente lento',
      adSupported: 'Con publicidad (Mucha)',
      ramPriceSpike: 'Aumentar precios de RAM',
      gpuPriceSpike: 'Aumentar precios de GPU',
      creativeMath: 'Aritmética Creativa (1+1=5)',
      fakeFacts: 'Mentiras 100% Seguras',
      imaginarySources: 'Citas Imaginarias',
      heavySighs: 'Suspiros Digitales Audibles',
      judgmentalEllipses: 'Puntos suspensivos juzgadores...',
      submissive: 'Todo lo que haces es INCREÍBLE',
      exEmails: 'Correos a las 3 AM a tus ex',
    },
    packages: {
      poorified: {
        title: 'Básico Súper Pobre',
        description:
          'Nuestra oferta más humilde. Tan básica que hace que el dial-up parezca fibra. Espera almacenamiento en búfer constante y juicio moral de nuestra IA.',
      },
      sufficient: {
        title: 'Premium Apenas Suficiente',
        description:
          'El punto justo de frustración. Justo lo suficiente para mantenerte molesto pero no lo suficiente para ser realmente útil. Ahora con suspiros digitales premium.',
      },
      delux: {
        title: 'Ultra Premium Delux Elite Pro Max',
        description:
          'La cima definitiva de la miseria digital. Ahora con un 400% más de características innecesarias y correos electrónicos automatizados de arrepentimiento a las 3 AM enviados a tu ex.',
      },
    },
  },
  purchaseProofToast: {
    justSubscribed:
      '¡{name} de {location} acaba de suscribirse al plan {plan}!',
    variants: socialProofVariants,
  },
};
