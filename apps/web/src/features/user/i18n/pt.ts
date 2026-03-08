export default {
  userPreferences: {
    title: 'Preferências',
    colorScheme: 'Esquema de cores / Tema',
    darkMode: 'Modo escuro',
    reducedMotion: 'Movimento reduzido',
    reducedMotionHelp:
      'Pode ser alterado nas definições do seu SO/Navegador, poderá ter de recarregar a página após a alteração.',
    enableSound: 'Som',
    adultFilter: 'Filtrar conteúdos para adultos',
  },
  userGrants: {
    title: 'Consentimento e permissões',
    permissionDisclaimer:
      'As definições de permissão são geridas pelo navegador. Se quiser alterar o tema, pode fazê-lo nas definições do site no seu navegador.',
    essentialCookies: 'Permitir cookies essenciais',
    notificationPermission: 'Permissão de notificações',
    locationPermission: 'Permissão de localização',
  },
  optionalPainPoints: {
    title: 'Pontos de dor opcionais',
    categories: {
      browser: 'Navegador e Separador',
      visual: 'Obstruções Visuais',
      ads: 'Publicidade e Monetização',
      interactivity: 'Popups e Interatividade',
    },
    screensaverTimeout: 'Tempo de espera',
    screensaverVariant: 'Variante',
    screensaverVariantOptions: {
      bouncingLogo: 'Logótipo Saltitante',
      maze: 'Labirinto 3D 95',
    },
    screensaverTimeoutOptions: {
      '15': '15 segundos',
      '30': '30 segundos',
      '60': '1 minuto',
      '300': '5 minutos',
      '900': '15 minutos',
    },
    gifts: {
      detectAdblocker: 'Detetar adblocker',
      flaps: 'Abas laterais de anúncios',
      oneByOne: 'Anúncios um por um',
    },
    achievementNotifications: 'Notificações de conquistas',
    clipboardMarker: 'Marcador de área de transferência',
    contentPaywall: 'Paywall de conteúdo',
    deadPixel: 'Píxel morto',
    disableContextMenu: 'Desativar menu de contexto (clique direito)',
    exitPrompt: 'Aviso de saída',
    historySpam: 'Spam no histórico',
    mockChat: 'Chat de bolha',
    newsletterModal: 'Popup de newsletter',
    notifications: 'Notificações',
    screensaver: 'Protetor de ecrã',
    pageTitleInactiveArrayPaged:
      'Título alternativo quando o separador está inativo',
    searchDelay: 'Atraso falso na pesquisa',
    wheelOfFortune: 'Roda da fortuna',
    stickyVideo: 'Vídeo flutuante',
  },
  optionalPainPointsHints: {
    screensaver:
      'Ativa um protetor de ecrã selecionado após o período especificado de inatividade total.',
    gifts: {
      detectAdblocker:
        'Mostra um grande banner vermelho se for detetado um adblocker.',
      flaps:
        'Mostra abas de anúncios nas laterais da página que podem ser clicadas e levam a páginas diferentes.',
      oneByOne: 'Cobre principalmente um anúncio animado na página inicial.',
    },
    achievementNotifications:
      'Exibe uma notícia sempre que desbloqueia uma nova conquista. O progresso é sempre acompanhado em segundo plano.',
    clipboardMarker:
      'Adiciona um link "Ler mais em..." quando copia texto do website.',
    contentPaywall:
      'Mostra uma sobreposição de paywall falsa em alguns conteúdos; ainda pode revelar o conteúdo.',
    deadPixel:
      'Coloca alguns píxeis "mortos" falsos no seu ecrã para o irritar.',
    disableContextMenu:
      'Impede-o de usar o menu do botão direito e exibe um alerta em vez disso.',
    exitPrompt:
      'Mostra um aviso "Tem a certeza que quer sair?" ao tentar fechar o separador ou navegar para fora.',
    historySpam:
      'Enche o histórico do seu navegador com entradas falsas para que não possa voltar atrás facilmente. Isto pode tornar inconveniente o regresso aos resultados dos motores de busca.',
    mockChat:
      'Mostra uma bolha de chat "humana" irritante que só lhe envia mensagens quando a fecha e que exibe constantemente "agente está a escrever" entretanto.',
    newsletterModal:
      'Mostra periodicamente um popup de subscrição de newsletter, especialmente quando a página regressa da inatividade (troca de separadores).',
    notifications:
      'Pede permissões de notificação e mostra notificações falsas.',
    pageTitleInactiveArrayPaged:
      'Altera o título do separador para algo que chame a atenção quando o separador está inativo.',
    searchDelay:
      'Adiciona um atraso de carregamento falso e longo a todas as pesquisas.',
    wheelOfFortune:
      'Mostra um modal de "Roda da Fortuna" falso que lhe dá prémios absolutamente inúteis.',
    stickyVideo:
      'Mostra um reprodutor de vídeo flutuante que o segue enquanto faz scroll.',
  },
  mandatoryExperienceFlags: {
    title: 'Experiência obrigatória',
    impossibleLogin: 'Login impossível',
    impossibleSignup: 'Registo impossível',
    impossiblePasswordReminder: 'Lembrete de palavra-passe impossível',
    unreasonableContent: 'Conteúdo absurdo',
    flaimYourPhone: 'Reclama o teu telemóvel',
    fakeAiSubscription: 'Planos de subscrição de IA falsos',
  },
  runtimeInfo: {
    title: 'Sobre esta sessão',
    disclaimer:
      'A informação listada abaixo serve como informação de depuração para a sessão atual do navegador (se atualizar a página, tudo será redefinido). Nos bastidores, estes valores também têm um grande impacto no que acontece e como acontece.',
    startedAgo: 'Sessão iniciada',
    visibilitySeconds: 'Tempo em foco',
    isDocumentVisible: 'Atualmente em foco',
    navigationCount: 'Contagem de navegação',
    userActivation: 'Ação inicial do utilizador',
    lastActivation: 'Última atividade do utilizador',
    flaimSurveyResult: 'Resultado do inquérito Flaim',
    adblockerSuspected: 'Suspeita de adblocker',
    adblockerNotDetected: 'Adblocker não detetado',
  },
  myProfile: {
    notSupposedToBeHere: 'Hmm, não devias estar aqui 😡',
  },
  notification: {
    modal: {
      title: 'Oh não, onde está a permissão de notificação!?!',
      description:
        'Gostaríamos de lhe enviar notificações às vezes. Pode dar permissão de notificação a este website nas definições do seu navegador. Poderia fazer isso? 🙏🥺🙏',
    },
  },
  painPreferences: {
    levelSettings: {
      label: 'Nível de dor',
      railTitle: 'Barra deslizante do nível de dor',
      clamps: {
        from_0: 'Inocente',
        from_10: 'É um pouco estranho, não é?',
        from_20: 'Ligeiramente irritante',
        from_30: 'Um pouco amaldiçoado',
        from_40: 'Inquietante de uma forma muito específica',
        from_50: 'A quantidade certa',
        from_60: 'Tolerância acima da média',
        from_70: 'Pisar cocó de cão descalço',
        from_80: 'Quase masoquista',
        from_90: 'Pesadelos? Quero subscrever.',
        from_100: 'Dor Máxima',
      },
    },
  },
};
