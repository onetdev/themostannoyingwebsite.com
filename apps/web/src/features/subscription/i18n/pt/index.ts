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
    status: {
      outOfStock: 'Esgotado',
    },
    table: {
      features: 'Funcionalidades',
    },
    cancellation: {
      link: 'Cancelar subscrição',
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
  specialDeal: {
    headline: 'ESPERE! NÃO SE VÁ! TEMOS UM PRESENTE! 🎁',
    description:
      'Notámos que estava a tentar sair. Foi algo que dissemos? Foram as reticências julgadoras? Podemos mudar! (Espere, não, não podemos).',
    offer:
      'A oferta está esgotada devido à grande procura! Fique nesta página até à reposição de stock!',
    backToCancellation: 'Hmm, leve-me de volta ao cancelamento',
  },
  purchaseProofToast: {
    justSubscribed: '{name} de {location} acabou de subscrever o {plan}!',
    variants: socialProofVariants,
  },
  cancellation: {
    page: {
      title: 'Cancelamento de subscrição',
    },
    reasons: {
      title: 'Motivo',
      description:
        'É realmente difícil acreditar que quer cancelar cobardemente a sua subscrição. Porquê???',
      list: [
        'O MAW resolveu todos os problemas da minha vida. No entanto, sinto falta da tristeza.',
        'Tenho a disciplina financeira de um guaxinim numa máquina de venda automática.',
        'Vou cancelar antes que os meus amigos descubram o quanto eu gostei disto.',
        'Estou a fugir novamente dos meus problemas como uma personagem de desenhos animados.',
        'Demasiado pesado para o meu PC',
        'Problemas de compromisso.',
        'Simplesmente não consigo lidar com tanto crescimento pessoal.',
        'A minha mãe descobriu que eu estava a usar o cartão de crédito dela',
      ],
    },
    essay: {
      title: 'Ensaio de Entrevista de Saída',
      description:
        'Para garantir que a sua decisão é final e bem ponderada, por favor escreva um ensaio sobre a sua experiência (mín. 3000 caracteres). Este será pessoalmente revisto pelo nosso CEO antes do processamento.',
      placeholder:
        'Comece a escrever a sua obra-prima de 3000 caracteres aqui...',
      characters: 'Caracteres: {count} / 3000',
      action: {
        abort: 'Abortar cancelamento',
        next: 'Concluí o meu ensaio obrigatório e desejo prosseguir com o próximo passo de verificação',
      },
    },
    valdo: {
      title: 'Passo 3: Deixe-se guiar pela luz',
      description:
        'Só existe um botão de cancelamento real nesta página. Confie na sua luz interior para o guiar. Se não conseguir encontrar o que funciona, pode ser o universo a sugerir gentilmente que fique.',
      buttonLabel: 'Cancelar subscrição',
      error: 'Botão errado! Taxa aplicada: {amount}',
    },
    upsell: {
      title: 'ESPERE! NÃO SE VÁ! Dê-nos mais uma oportunidade por favor!',
      description:
        'Notámos que está a tentar não sair. Que tal o nosso plano "Proteção de Cancelamento Platina"? Só está disponível para pessoas que querem sair.',
      promo: 'GRANDE NEGÓCIO!\nATÉ 99% DE DESCONTO!!!',
      action: {
        specialDeal: 'Quero a oferta especial',
        stay: 'Sim, quero não sair',
        next: 'Apesar de tudo, continuo a pretender cancelar a minha subscrição. O problema sou eu, não vocês.',
      },
    },
    email: {
      title: 'Quem é você?',
      label: 'Forneça o seu endereço de email para o processo de cancelamento.',
      placeholder: 'cliente-fiel@themostannoyingwebsite.com',
      action: {
        discount: 'Sabe que mais, mudei de ideias, quero o desconto!',
        next: 'Tenho a certeza, vamos continuar o cancelamento',
      },
    },
    confirmation: {
      title: 'VERIFICAÇÃO FINAL NECESSÁRIA',
      description:
        'O seu pedido foi preparado, mas por razões de segurança e para evitar cancelamentos acidentais, deve agora concluir o processo de verificação física.',
      alert: {
        title: 'Instruções:',
        step1: 'Clique no botão "Imprimir para verificação" abaixo.',
        step2: 'Imprima o documento em papel físico.',
        step3: 'Assine o documento na presença de DUAS (2) testemunhas.',
        step4: 'Peça a ambas as testemunhas que assinem.',
        step5: 'Tire uma fotografia de alta resolução do documento assinado.',
        step6:
          'Envie a fotografia por email para <email>support@themostannoyingwebsite.com</email>',
        note: 'Por favor, note que o processamento demora até 10^15 dias úteis.',
      },
      action: {
        print: '🖨️ IMPRIMIR PARA VERIFICAÇÃO 🖨️',
        abort: 'Manter a minha subscrição',
        upgrade: 'Fazer upgrade agora',
        specialDeal: 'Obter a oferta especial',
      },
      alternative:
        'Alternativamente, se mudou de ideias (altamente recomendado):',
    },
    print: {
      title: 'Formulário Oficial de Pedido de Cancelamento',
      documentId: 'ID do Documento: {id}',
      sections: {
        account: '1. INFORMAÇÃO DA CONTA',
        details: '2. DETALHES DO CANCELAMENTO',
        signatures: '3. ASSINATURAS E TESTEMUNHAS',
      },
      fields: {
        email: 'Endereço de Email:',
        date: 'Data do Pedido:',
        reason: 'Razão Principal para Sair:',
        feedback: 'Feedback Detalhado:',
      },
      signatures: {
        subscriber: 'Assinatura do Subscritor',
        subscriberName: 'Nome do Subscritor em Letra de Imprensa',
        witness1: 'Assinatura da Testemunha 1',
        witness1Name: 'Nome da Testemunha 1 em Letra de Imprensa',
        witness2: 'Assinatura da Testemunha 2',
        witness2Name: 'Nome da Testemunha 2 em Letra de Imprensa',
        dateLabel: 'Data: ____________________',
      },
      footer:
        'Este não é um documento real, apenas mais uma reflexão satírica das tendências. Veja themostannoyingwebsite.com/pt/terms-of-use e themostannoyingwebsite.com/pt/privacy-policy para mais informações.',
    },
  },
};
