import questionVariants from './quiz-variants/pt';

export default {
  dilf: {
    title: 'DILF',
    fullTitle:
      "DILF - Donut I'd Like to Feast On (Donut que Gostaria de Devorar)",
    description:
      'Se procura os donuts mais saborosos, quentes, solteiros e irresistíveis da sua área, está no lugar perfeito. Está pronto para aceitar o desafio de encontrar o seu verdadeiro amor? Clique em qualquer um dos donuts aqui para descobrir qual é o ideal para si.',
    flapLeft: 'DILF. Donuts solteiros e quentes na sua área',
    flapRight: 'DILF. Os donuts mais saborosos na sua proximidade',
    finderOverlayTitle: 'Encontre o seu donut',
  },
  wanPhone: {
    title: 'Parabéns! Ganhaste um telemóvel! Reclama agora!',
    survey: {
      questionVariants,
      description:
        'Preencha este inquérito rápido e poderá ter a oportunidade de reclamar o seu novo telemóvel! Seja preciso e rápido, mas não demasiado rápido.',
      result: {
        cheatDetected: {
          text: 'Batota detetada! Não tem permissão para reclamar o seu telemóvel.',
          callToAction: 'Voltar ao início',
        },
        completed: {
          text: 'Obrigado por participar! Infelizmente, o telemóvel não pode ser reclamado neste momento.',
          callToAction: 'Voltar ao início',
        },
        lost: {
          text: 'Bolas, falhou algumas respostas. Que pena!',
          callToAction: 'Voltar ao início',
        },
        timeout: {
          text: 'Desculpe, parece que não terminou o inquérito a tempo.',
          callToAction: 'Voltar ao início',
        },
      },
    },
  },
  suspectBar: {
    title: 'Suspeita de Adblocker!',
    description:
      'Parece que está a usar um bloqueador de anúncios. Isso é um pouco estranho, não é? Está a perder imenso! Por favor, considere desativá-lo. Até lá, verá este enorme banner vermelho no fundo sempre que visitar este site. E, por favor, não o feche usando o botão OK. Cumprimentos!',
  },
  newsletterModal: {
    title: 'Adira à nossa newsletter!',
    description:
      'A nossa newsletter premium traz uma quantidade insana de valor diretamente para a sua caixa de entrada. Não perca informações que fazem uma diferença real!',
    placeholder: 'Introduza o seu email',
    initialConfirm: 'Subscrever',
    initialCancel: 'Não Subscrever',
    useFormActions: 'Por favor, use o botão relevante em vez disso',
    confirmations: {
      confirmation_001: {
        text: 'Estamos desapontados por ver que pode não ter tido tempo suficiente para considerar totalmente esta decisão importante e desafiante.',
        confirm: 'Pensei sobre o assunto, ainda quero',
        cancel: 'Tem razão, cancelar',
      },
      confirmation_002: {
        text: 'Lamentamos vê-lo a subscrever, podemos oferecer-lhe os prazeres de não ser subscritor de todo?',
        confirm: 'Não, obrigado',
        cancel: 'Eu quero o meu brinde!',
      },
      confirmation_003: {
        text: 'Já considerou saltar esta newsletter?',
        confirm: 'Não',
        cancel: 'Sim',
      },
      confirmation_004: {
        text: 'Subscrever esta newsletter pode ter efeitos secundários adversos. Ainda está interessado?',
        confirm: 'Aceito os efeitos secundários',
        cancel: 'Tirem-me daqui',
      },
    },
  },
  wheelOfFortune: {
    title: 'Roda da Fortuna',
    spinStart: 'Clique ou Toque aqui!',
    spinWin: 'Ganhou! {prize}',
    prizeVariants: {
      freeLifetimeBeer: 'Cerveja grátis para a vida',
      worldPeace: 'Paz no mundo',
      absolutelyNothing: 'Absolutamente nada',
      complimentaryOtter: 'Lontra de cortesia',
      fake70Discount: 'Desconto falso de 70%',
    },
    wheelTitle: 'Roda da Fortuna',
  },
};
