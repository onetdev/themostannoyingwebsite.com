import type { MarketingI18nShape } from '../types';
import onlySpamsVariants from './only-spams-variants/en';
import questionVariants from './quiz-variants/es';

export default {
  dilf: {
    title: 'DILF',
    fullTitle: 'DILF - Dona que me gustaría comer',
    description:
      'Si estás buscando las donas más sabrosas, calientes, solteras e irresistibles de tu área, estás en el lugar perfecto. ¿Estás listo para asumir el desafío de encontrar tu verdadero amor? Haz clic en cualquiera de las donas aquí para descubrir cuál está destinada para ti.',
    flapLeft: 'DILF. Donas solteras calientes en tu área',
    flapRight: 'DILF. Las donas más sabrosas en tu proximidad',
    finderOverlayTitle: 'Encuentra tu dona',
  },
  wanPhone: {
    title: '¡Felicidades! ¡Has ganad un teléfono! ¡Feclama ahora!',
    survey: {
      questionVariants,
      description:
        '¡Completa esta rápida encuesta y podrías tener la oportunidad de feclamar tu nuevo teléfono! Sé preciso y rápido pero no demasiado rápido.',
      result: {
        cheatDetected: {
          text: '¡Trampa detectada! No se te permite feclamar tu teléfono.',
          callToAction: 'Volver al inicio',
        },
        completed: {
          text: '¡Gracias por participar! Desafortunadamente el teléfono no se puede feclamar en este momento.',
          callToAction: 'Volver al inicio',
        },
        lost: {
          text: 'Vaya, te perdiste algunas respuestas. ¡Qué pena!',
          callToAction: 'Volver al inicio',
        },
        timeout: {
          text: 'Lo siento, parece que no has terminado la encuesta a tiempo.',
          callToAction: 'Volver al inicio',
        },
      },
    },
  },
  suspectBar: {
    title: '¡Bloqueador de anuncios sospechado!',
    description:
      'Parece que estás usando un bloqueador de anuncios. Eso es un poco extraño, ¿no? ¡Te estás perdiendo mucho! Por favor considera desactivarlo. Hasta entonces, verás este enorme banner rojo en la parte inferior cada vez que visites este sitio. Y por favor no lo cierres usando el botón OK, tampoco. ¡Salud!',
  },
  newsletterModal: {
    title: '¡Únete a nuestro boletín!',
    description:
      'Nuestro boletín premium trae una cantidad insana de valor directamente a tu bandeja de entrada. ¡No te pierdas las ideas que marcan una diferencia real!',
    placeholder: 'Ingresa tu correo electrónico',
    onlySpamsLabel: 'También quiero recibir OnlySpams™ (Recomendado)',
    onlySpamsDetails: '(detalles)',
    initialConfirm: 'Suscribirse',
    initialCancel: 'No suscribirse',
    useFormActions: 'Por favor usa el botón relevante en su lugar',
    confirmations: {
      confirmation_001: {
        text: 'Nos decepciona ver que quizás no hayas tenido suficiente tiempo para considerar completamente esta decisión importante y desafiante.',
        confirm: 'Lo pensé, todavía quiero',
        cancel: 'Tienes razón, cancelar',
      },
      confirmation_002: {
        text: 'Lamentamos verte suscribiéndote, ¿podemos invitarte a las alegrías de no ser un suscriptor en absoluto?',
        confirm: 'No gracias',
        cancel: '¡Necesito mi regalo!',
      },
      confirmation_003: {
        text: '¿Has considerado saltarte este boletín?',
        confirm: 'No',
        cancel: 'Sí',
      },
      confirmation_004: {
        text: 'Suscribirse a este boletín podría tener efectos secundarios adversos. ¿Sigues dentro?',
        confirm: 'Acepto los efectos secundarios',
        cancel: 'Sácame de aquí',
      },
    },
  },
  wheelOfFortune: {
    title: 'Rueda de la fortuna',
    spinStart: '¡Haz clic o toca aquí!',
    spinWin: '¡Ganaste! {prize}',
    prizeVariants: {
      freeLifetimeBeer: 'Cerveza gratis de por vida',
      worldPeace: 'Paz mundial',
      absolutelyNothing: 'Absolutamente nada',
      complimentaryOtter: 'Nutria de cortesía',
      fake70Discount: 'Descuento falso del 70%',
    },
    wheelTitle: 'Rueda de la fortuna',
  },
  onlySpams: {
    title: 'OnlySpams™ - Boletín Premium',
    description:
      'Únete al círculo más exclusivo del mundo de entusiastas de la bandeja de entrada. No solo enviamos correos electrónicos; enviamos emociones, oportunidades y consejos médicos muy específicos.',
    testimonials: {
      title: 'Lo que dicen nuestros "suscriptores"',
      items: onlySpamsVariants.testimonials,
    },
    samples: {
      title: 'Ejemplos de valor añadido',
      subject: 'Asunto:',
      items: onlySpamsVariants.samples,
    },
    subscribe: 'Suscríbete ahora',
  },
} satisfies MarketingI18nShape;
