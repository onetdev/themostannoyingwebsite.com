import type { SubscriptionI18nShape } from '../../types';
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
    status: {
      outOfStock: 'Agotado',
    },
    table: {
      features: 'Características',
    },
    cancellation: {
      link: 'Cancelar suscripción',
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
  specialDeal: {
    headline: '¡ESPERA! ¡NO TE VAYAS! ¡TENEMOS UN REGALO! 🎁',
    description:
      'Notamos que intentabas irte. ¿Fue algo que dijimos? ¿Fueron los puntos suspensivos juzgadores? ¡Podemos cambiar! (Espera, no, no podemos).',
    offer:
      '¡La oferta está agotada debido a la gran demanda! ¡Quédate en esta página hasta que se reponga!',
    backToCancellation: 'Mmm, llévame de vuelta a la cancelación',
  },
  purchaseProofToast: {
    justSubscribed:
      '¡{name} de {location} acaba de suscribirse al plan {plan}!',
    variants: socialProofVariants,
  },
  cancellation: {
    page: {
      title: 'Cancelación de suscripción',
    },
    reasons: {
      title: 'Motivo',
      description:
        'Es realmente difícil creer que quieras cancelar cobardemente tu suscripción. ¿Por qué???',
      list: [
        'MAW solucionó todos mis problemas en mi vida. Sin embargo, extraño la tristeza.',
        'Tengo la disciplina financiera de un mapache en una máquina expendedora.',
        'Voy a cancelar antes de que mis amigos descubran cuánto disfruté esto.',
        'Estoy huyendo de nuevo de mis problemas como un personaje de dibujos animados.',
        'Demasiado pesado para mi PC',
        'Problemas de compromiso.',
        'Simplemente no puedo manejar tanto crecimiento personal.',
        'Mi mamá descubrió que estaba usando su tarjeta de crédito',
      ],
    },
    essay: {
      title: 'Ensayo de entrevista de salida',
      description:
        'Para asegurar que tu decisión sea final y bien considerada, por favor escribe un ensayo sobre tu experiencia (mín. 3000 caracteres). Esto será revisado personalmente por nuestro CEO antes de procesarlo.',
      placeholder:
        'Empieza a escribir tu obra maestra de 3000 caracteres aquí...',
      characters: 'Caracteres: {count} / 3000',
      action: {
        abort: 'Cancelar cancelación',
        next: 'He completado mi ensayo obligatorio y deseo proceder con el siguiente paso de verificación',
      },
    },
    valdo: {
      title: 'Paso 3: Guíate por la luz',
      description:
        'Sólo hay un botón de cancelación real en esta página. Confía en tu luz interior para que te guíe. Si no puedes encontrar el que funciona, puede que el universo esté sugiriéndote suavemente que te quedes.',
      buttonLabel: 'Cancelar suscripción',
      error: '¡Botón equivocado! Cargo aplicado: {amount}',
    },
    upsell: {
      title: '¡Espera! ¡No te vayas! ¡Danos una oportunidad más, por favor!',
      description:
        'Hemos notado que estás intentando no irte. ¿Qué tal nuestro plan de "Protección de Cancelación Platino"? Sólo está disponible para personas que quieren irse.',
      promo: '¡GRAN OFERTA!\n¡¡¡HASTA 99% DE DESCUENTO!!!',
      action: {
        specialDeal: 'Quiero la oferta especial',
        stay: 'Sí, quiero no irme',
        next: 'A pesar de todo, sigo intentando cancelar mi suscripción. El problema soy yo, no tú.',
      },
    },
    email: {
      title: '¿Quién eres?',
      label:
        'Proporciona tu dirección de correo electrónico para el proceso de cancelación.',
      placeholder: 'cliente-leal@themostannoyingwebsite.com',
      action: {
        discount: '¡Sabes qué, cambié de opinión, quiero el descuento!',
        next: 'Estoy seguro, continuemos con la cancelación',
      },
    },
    confirmation: {
      title: 'SE REQUIERE VERIFICACIÓN FINAL',
      description:
        'Tu solicitud ha sido preparada, pero por razones de seguridad y para evitar cancelaciones accidentales, ahora debes completar el proceso de verificación física.',
      alert: {
        title: 'Instrucciones:',
        step1: 'Haz clic en el botón "Imprimir para verificación" de abajo.',
        step2: 'Imprime el documento en papel físico.',
        step3: 'Firma el documento en presencia de DOS (2) testigos.',
        step4: 'Haz que ambos testigos firmen.',
        step5: 'Toma una foto de alta resolución del documento firmado.',
        step6:
          'Envía la foto por correo electrónico a <email>support@themostannoyingwebsite.com</email>',
        note: 'Ten en cuenta que el procesamiento tarda hasta 10^15 días hábiles.',
      },
      action: {
        print: '🖨️ IMPRIMIR PARA VERIFICACIÓN 🖨️',
        abort: 'Mantener mi suscripción',
        upgrade: 'Mejorar ahora',
        specialDeal: 'Obtener la oferta especial',
      },
      alternative:
        'Alternativamente, si has cambiado de opinión (muy recomendado):',
    },
    print: {
      title: 'Formulario oficial de solicitud de cancelación',
      documentId: 'ID del documento: {id}',
      sections: {
        account: '1. INFORMACIÓN DE LA CUENTA',
        details: '2. DETALLES DE LA CANCELACIÓN',
        signatures: '3. FIRMAS Y TESTIGOS',
      },
      fields: {
        email: 'Correo electrónico:',
        date: 'Fecha de solicitud:',
        reason: 'Motivo principal para irse:',
        feedback: 'Comentarios detallados:',
      },
      signatures: {
        subscriber: 'Firma del suscriptor',
        subscriberName: 'Nombre del suscriptor en imprenta',
        witness1: 'Firma del testigo 1',
        witness1Name: 'Nombre del testigo 1 en imprenta',
        witness2: 'Firma del testigo 2',
        witness2Name: 'Nombre del testigo 2 en imprenta',
        dateLabel: 'Fecha: ____________________',
      },
      footer:
        'Este no es un documento real, sólo otra reflexión satírica de las tendencias. Consulta themostannoyingwebsite.com/es/terms-of-use y themostannoyingwebsite.com/es/privacy-policy para más información.',
    },
  },
} satisfies SubscriptionI18nShape;
