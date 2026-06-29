export default {
  sidebar: {
    discover: 'Descobrir',
    myLibrary: 'A Minha Biblioteca',
    overview: 'Visão Geral',
    books: 'Livros',
    categories: 'Categorias',
    loans: 'Empréstimos',
    users: 'Utilizadores',
    administration: 'Administração',
    settings: 'Definições',
    admin: 'Admin',
    feedback: 'Feedback',
    wishlist: 'Favoritos',
    activity: 'Atividade'
  },
  wishlist: {
    title: 'Lista de desejos',
    subtitle: 'Livros que guardou para ler mais tarde',
    empty: 'Ainda não adicionou livros aos favoritos.',
    toggle: 'Adicionar aos favoritos',
    added: 'Adicionado aos favoritos',
    removed: 'Removido dos favoritos',
    error: 'Não foi possível atualizar a lista'
  },
  aiChat: {
    open: 'Assistente de livros',
    title: 'Assistente BibliotecaTC',
    welcome: 'Descreva um tema, disciplina ou autor — recomendo livros do nosso catálogo que combinem com o que procura.',
    placeholder: 'Ex: recomenda um livro de filosofia...',
    thinking: 'A pensar...',
    viewBook: 'Ver livro no catálogo',
    error: 'Não consegui responder. Tente novamente.',
    noApiKey: 'O assistente não está disponível de momento.',
    loginRequired: 'Inicie sessão para usar o assistente.'
  },
  navbar: {
    searchPlaceholder: 'Pesquisar livros, autores...',
    myAccount: 'A Minha Conta',
    myLoans: 'Meus Empréstimos',
    manageBooks: 'Gerir Livros',
    manageLoans: 'Empréstimos',
    newBook: 'Novo Livro',
    logout: 'Sair',
    login: 'Entrar',
    register: 'Registar',
    adminMenu: 'Administração',
    docs: 'Documentação',
    notifications: 'Notificações',
    loading: 'Carregando...',
    all: 'Tudo',
    home: 'Início',
    settings: 'Definições'
  },
  landing: {
    badge: 'Biblioteca Digital',
    title: 'Escola Secundária Tomás Cabreira',
    subtitle: 'Bem-vindo ao portal digital da nossa biblioteca. Explore o nosso vasto catálogo de livros, teses e recursos educativos.',
    exploreBtn: 'Explorar Catálogo',
    ctaTitle: 'Pronto para requisitar um livro?',
    ctaDesc: 'Crie a sua conta agora e explore o catálogo digital da biblioteca.',
    aboutTitle: 'Sobre a nossa Biblioteca',
    aboutDesc: 'A Biblioteca da Escola Secundária Tomás Cabreira é um espaço de aprendizagem, descoberta e partilha. Agora, com a nossa versão digital, pode consultar a disponibilidade de livros e gerir as suas requisições de qualquer lugar.',
    features: {
      search: 'Pesquisa Inteligente',
      searchDesc: 'Encontre facilmente o que procura por título, autor ou categoria.',
      manage: 'Gestão Online',
      manageDesc: 'Acompanhe os seus empréstimos e receba notificações de devolução.',
      access: 'Acesso Facilitado',
      accessDesc: 'Disponível em qualquer dispositivo para toda a comunidade escolar.'
    }
  },
  settings: {
    title: 'Definições',
    subtitle: 'Faça a gestão da sua conta e preferências',
    profile: 'Perfil',
    name: 'Nome',
    email: 'E-mail',
    appearance: 'Aparência',
    theme: 'Tema',
    light: 'Claro',
    dark: 'Escuro',
    languageSection: 'Idioma',
    languageDesc: 'Escolha o seu idioma preferido',
    administration: 'Administração',
    adminActive: 'Sessão de Admin Ativa',
    adminDesc: 'Iniciou sessão como administrador',
    adminLogout: 'Sair',
    account: 'Conta',
    signOutTitle: 'Sair da conta',
    signOutDesc: 'Será redirecionado para a página de login',
    logoutBtn: 'Sair',
    feedback: {
      title: 'Enviar Feedback',
      question: 'Problemas ou Sugestões?',
      questionDesc: 'Ajude-nos a melhorar a plataforma descrevendo a sua experiência.',
      writeBtn: 'Escrever',
      viewTitle: 'Ver Feedbacks Recebidos',
      viewDesc: 'Consulte as sugestões e problemas reportados pelos utilizadores.',
      viewBtn: 'Ver Feedbacks',
      placeholder: 'Descreva o problema que encontrou ou a sua sugestão de melhoria...',
      cancelBtn: 'Cancelar',
      sendBtn: 'Enviar Feedback',
      errorToast: 'Erro ao enviar feedback',
      successToast: 'Obrigado pelo seu feedback!'
    },
    newsletter: {
      title: 'Newsletter — curiosidades',
      desc: 'Receba factos sobre livros, história, filosofia e mundo às 8:20 (dias úteis).',
      enabled: 'Receber newsletter',
      weeklyPicks: 'Receber recomendações semanais de livros',
      categories: 'Categorias',
      catBooks: 'Livros',
      catHistory: 'História',
      catPhilosophy: 'Filosofia',
      catWorld: 'Mundo',
      save: 'Guardar preferências',
      saved: 'Preferências guardadas'
    },
  },
  routes: {
    login: '/entrar',
    signup: '/registar',
    adminLogin: '/console/entrar',
    book: '/livro/:id',
    myLoans: '/emprestimos',
    settings: '/definicoes',
    notifications: '/notificacoes',
    adminBooks: '/console/livros',
    adminCategories: '/console/categorias',
    adminLoans: '/console/emprestimos',
    adminBooksNew: '/console/livros/novo',
    adminBooksEdit: '/console/livros/editar/:id'
  },
  admin: {
    dashboard: {
      totalBooks: 'TOTAL LIVROS',
      activeLoans: 'EMPRÉSTIMOS ATIVOS',
      pendingRequests: 'PEDIDOS PENDENTES',
      overdue: 'EM ATRASO',
      recentActivity: 'Atividade Recente',
      viewAll: 'Ver Tudo',
      quickActions: 'Ações Rápidas',
      addNewBook: 'Adicionar Livro',
      updateCatalog: 'ATUALIZAR CATÁLOGO',
      manageBooks: 'Gerir Livros',
      editOrRemove: 'EDITAR OU REMOVER',
      manageLoans: 'Gerir Empréstimos',
      approveReject: 'APROVAR / REJEITAR'
    },
    activity: {
      title: 'Registo de atividade',
      subtitle: 'Ações recentes na plataforma',
      when: 'Data',
      user: 'Utilizador',
      action: 'Ação',
      details: 'Detalhes',
      empty: 'Sem registos.'
    },
    reports: {
      exportPdf: 'Exportar relatório PDF',
      popupBlocked: 'Permita pop-ups para exportar o relatório.'
    },
    login: {
      title: 'Console Admin',
      subtitle: 'Insira as credenciais de administrador',
      backToLibrary: 'Voltar à Biblioteca',
      authorize: 'Autorizar',
      secureDb: 'Autenticação de Base de Dados Segura',
      accessDenied: 'Acesso negado. Apenas administradores.'
    },
    common: {
      approve: 'Aprovar',
      reject: 'Rejeitar',
      rejectBtn: 'Rejeitar',
      returnBtn: 'Devolver',
      loadingRequests: 'A carregar pedidos...',
      fetchingCollection: 'A carregar catálogo...',
      noRequests: 'Nenhum pedido de empréstimo encontrado',
      noBooks: 'Nenhum livro encontrado nesta pesquisa',
      saveOrder: 'Salvar Ordem',
      orderSaved: 'Ordem guardada com sucesso!',
      orderError: 'Erro ao guardar ordem.',
      select: {
        placeholder: 'Selecione uma opção...',
        noOptions: 'Sem opções'
      }
    },
    books: {
      searchPlaceholder: 'Pesquisar por título, autor ou ISBN...',
      allCategories: 'Todas as Categorias',
      id: 'ID',
      bookInfo: 'INFORMAÇÃO',
      inventory: 'INVENTÁRIO',
      featured: 'DESTAQUE',
      actions: 'AÇÕES',
      available: 'DISPONÍVEL',
      outOfStock: 'ESGOTADO',
      noCover: 'SEM CAPA',
      filterPlaceholder: 'Selecione o género...',
      toastSaved: 'Livro atualizado com sucesso!',
      toastAdded: 'Livro adicionado com sucesso!',
      toastDeleted: 'Livro apagado com sucesso.',
      toastDeleteError: 'Erro ao apagar o livro.',
      deleteTitle: 'Apagar Livro',
      deleteMsg: 'Tem a certeza que deseja apagar este livro definitivamente do catálogo?',
      deleteBtn: 'Apagar'
    },
    categories: {
      title: 'Categorias',
      subtitle: 'Gerir as categorias do catálogo de livros.',
      addPlaceholder: 'Nome da nova categoria...',
      searchPlaceholder: 'Pesquisar categorias...',
      addBtn: 'Adicionar',
      dragToReorder: 'Arraste os ícones para reordenar',
      deleteTitle: 'Eliminar Categoria',
      deleteMsg: 'Tem a certeza que deseja eliminar esta categoria? Isto pode afetar livros associados.',
      deleteBtn: 'Sim, Eliminar'
    },
    loans: {
      title: 'Gestão de Empréstimos',
      subtitle: 'Gerir e acompanhar os empréstimos dos leitores',
      searchPlaceholder: 'Pesquisar por livro, autor ou email...',
      all: 'TUDO',
      pending: 'PENDENTE',
      active: 'ATIVO',
      returned: 'DEVOLVIDO',
      rejected: 'REJEITADO',
      overdue: 'ATRASADO',
      id: 'ID',
      user: 'UTILIZADOR',
      bookDetails: 'DETALHES DO LIVRO',
      status: 'ESTADO',
      actions: 'AÇÕES',
      libMember: 'MEMBRO',
      borrowedDate: 'REQUISITADO A',
      returnedDate: 'DEVOLVIDO A',
      dueDate: 'PRAZO',
      approvedDate: 'APROVADO A'
    },
    feedback: {
      title: 'Feedback dos Utilizadores',
      subtitle: 'Sugestões e problemas reportados pela comunidade',
      user: 'UTILIZADOR',
      message: 'MENSAGEM',
      date: 'DATA',
      noFeedback: 'Ainda não recebemos nenhum feedback.'
    },
    users: {
      title: 'Utilizadores',
      subtitle: 'Gerir acesso e cargos do sistema',
      searchPlaceholder: 'Pesquisar nome ou email...',
      nameDetails: 'DETALHES',
      role: 'CARGO',
      joined: 'REGISTADO A',
      updateSuccess: 'Cargo atualizado com sucesso',
      updateError: 'Erro ao atualizar o cargo',
      noUsers: 'Nenhum utilizador encontrado'
    },
    roles: {
      admin: 'Administrador',
      professor: 'Professor',
      aluno: 'Aluno',
      student: 'Aluno',
      membro: 'Membro'
    },
    editBook: {
      newBookTitle: 'Adicionar Livro',
      editBookTitle: 'Editar Detalhes do Livro',
      newBookSubtitle: 'Adicione um novo livro ao catálogo da biblioteca',
      editBookSubtitle: 'Atualize as informações deste livro',
      fullTitle: 'TÍTULO COMPLETO',
      authorName: 'NOME DO AUTOR',
      isbnReference: 'REFERÊNCIA ISBN',
      primaryCategory: 'CATEGORIA PRINCIPAL',
      publisher: 'EDITORA',
      inventoryQuantity: 'QUANTIDADE EM ESTOQUE',
      guidelines: 'DIRETRIZES',
      guideline1: 'Imagens de alta resolução são preferidas',
      guideline2: 'Proporção recomendada: 3:4',
      guideline3: 'Tamanho máximo do ficheiro: 5MB (JPG, PNG)',
      addBookBtn: 'ADICIONAR LIVRO',
      updateBookBtn: 'ATUALIZAR LIVRO',
      uploadImage: 'Clique para enviar ou arraste e solte',
      imageFormats: 'SVG, PNG, JPG ou GIF (máx. 800x400px)',
      titlePlaceholder: 'O Grande Gatsby',
      authorPlaceholder: 'F. Scott Fitzgerald',
      isbnPlaceholder: '978-0-...',
      publisherPlaceholder: 'Charles Scribner\'s Sons'
    }
  },
  bookDetails: {
    backToCatalog: 'Voltar ao catálogo',
    backToStart: 'Voltar ao início',
    bookNotFound: 'Livro não encontrado',
    requestedSuccess: 'Requisitado com sucesso',
    requestBook: 'Requisitar Livro',
    outOfStock: 'Sem exemplares',
    availableOf: '{available} de {total} disponíveis',
    aboutBook: 'Sobre este livro',
    aiSummary: 'IA',
    generateAiSummary: 'Gerar resumo com IA',
    generatingAiSummary: 'A gerar resumo...',
    noDescription: 'Sem descrição disponível para este livro. Use o botão abaixo para gerar um resumo com inteligência artificial.',
    noDescriptionGuest: 'Sem descrição disponível para este livro. Inicie sessão para gerar um resumo com IA.',
    generateSummaryLogin: 'Iniciar sessão para gerar resumo',
    bookMetadata: 'Detalhes da Obra',
    isbn: 'ISBN',
    publisher: 'Editora',
    yearEdition: 'Ano de Edição',
    reviewsTitle: 'Avaliações e Comentários',
    writeReview: 'Escrever uma Avaliação',
    editReview: 'Editar a sua Avaliação',
    submitReview: 'Submeter Avaliação',
    cancelReview: 'Cancelar',
    noReviews: 'Ainda sem avaliações. Seja o primeiro a avaliar este livro!',
    ratingLabel: 'Classificação',
    commentLabel: 'Comentário (opcional)',
    averageRating: 'Média de Avaliações',
    reviewSuccess: 'Avaliação submetida com sucesso!',
    reviewError: 'Erro ao submeter a avaliação. Tente novamente.',
    youReviewed: 'Você avaliou este livro',
    catalog: 'Catálogo',
    availability: 'Disponibilidade',
    availableForRequest: 'Disponível para requisição',
    alreadyRequested: 'Já Requisitado',
    waitingApproval: 'Aguardando aprovação do administrador',
    review: 'avaliação',
    reviews: 'avaliações',
    deleteReviewTitle: 'Apagar Avaliação',
    deleteReviewConfirm: 'Tem a certeza que deseja apagar esta avaliação?',
    deleteReviewSuccess: 'Avaliação apagada com sucesso.',
    deleteReviewError: 'Erro ao apagar avaliação.',
    anonymousUser: 'Utilizador',
    requestError: 'Erro ao requisitar livro',
    processError: 'Erro ao processar o seu pedido.',
    featuredError: 'Erro ao actualizar destaque',
    featuredAdded: 'Livro marcado como destaque ⭐',
    featuredRemoved: 'Destaque removido',
    emailSubject: 'Reserva Registada',
    emailMessage: 'O seu pedido de reserva para o livro "{title}" foi recebido e aguarda aprovação. Terá 12 horas para levantar o livro na biblioteca antes que a reserva expire automaticamente.',
    emailButtonText: 'Ver os meus empréstimos'
  },
  docs: {
    badge: 'Documentação Oficial',
    title: 'Documentação da Biblioteca',
    subtitle: 'Tudo o que precisa de saber para utilizar a Biblioteca Digital de forma eficiente.',
    borrow: {
      title: '1. Como Requisitar um Livro',
      desc: 'Navegue pelo catálogo, escolha uma obra e clique em "Requisitar Livro". Após o pedido, terá uma janela de 12 horas para levantar o livro na biblioteca física antes de a reserva ser cancelada automaticamente.',
    },
    pin: {
      title: '2. PIN de Devolução (4 Dígitos)',
      desc: 'No momento do levantamento, será associado um código único de 4 dígitos à sua requisição. Pode consultar este PIN no menu "Meus Empréstimos". Deverá fornecê-lo ao administrador para concluir a devolução.',
    },
    duration: {
      title: '3. Duração do Empréstimo',
      desc: 'O período normal de empréstimo para qualquer livro do nosso catálogo é de 15 dias. Será avisado um dia antes do prazo limite por e-mail e notificações na plataforma.',
    },
    ai: {
      title: '4. Resumos por IA',
      desc: 'A nossa plataforma utiliza Inteligência Artificial para ler os metadados das obras e gerar descrições automáticas e resumos cativantes, ajudando-o a decidir se o livro é o que procura.',
    },
    fine: {
      title: '5. Multa por Atraso',
      desc: 'Para garantir a rotatividade do catálogo, as devoluções feitas após a data limite estão sujeitas a uma multa única de 5,00€.',
    },
    feedback: {
      title: '6. Feedback e Suporte',
      desc: 'Se encontrar algum erro no site, tiver dúvidas sobre o seu funcionamento ou quiser sugerir melhorias, utilize o botão "Enviar Feedback" nas suas Definições.',
    },
    privacy: {
      title: 'Política de Privacidade',
      content: `
        <h3>1. Responsável pelo Tratamento</h3>
        <p>O Agrupamento de Escolas Tomás Cabreira, sediado em Faro, Portugal, é o responsável pelo tratamento dos dados pessoais recolhidos através desta plataforma de biblioteca digital.</p>

        <h3>2. Dados Recolhidos</h3>
        <p>Recolhemos apenas os dados estritamente necessários para a prestação do serviço:</p>
        <ul>
          <li>Nome completo e endereço de e-mail (para identificação e comunicação);</li>
          <li>Histórico de requisições e devoluções (para gestão de empréstimos);</li>
          <li>Dados técnicos de acesso, como endereço IP e tipo de navegador (para segurança e diagnóstico).</li>
        </ul>

        <h3>3. Finalidade do Tratamento</h3>
        <p>Os dados recolhidos são utilizados exclusivamente para:</p>
        <ul>
          <li>Gestão de contas e autenticação de utilizadores;</li>
          <li>Processamento e acompanhamento de pedidos de empréstimo;</li>
          <li>Envio de notificações relacionadas com a sua conta (aprovações, prazos, devoluções);</li>
          <li>Melhoria contínua dos nossos serviços.</li>
        </ul>

        <h3>4. Partilha de Dados</h3>
        <p>Os seus dados pessoais não são vendidos, alugados ou partilhados com terceiros para fins comerciais. Poderão ser partilhados apenas com autoridades competentes quando exigido por lei ou ordem judicial.</p>

        <h3>5. Segurança</h3>
        <p>Implementamos medidas técnicas e organizacionais adequadas para proteger os seus dados contra acesso não autorizado, perda ou destruição, incluindo encriptação e controlo de acessos.</p>

        <h3>6. Os Seus Direitos</h3>
        <p>Ao abrigo do RGPD, tem direito a aceder, corrigir, eliminar ou restringir o tratamento dos seus dados. Para exercer estes direitos, contacte-nos através do botão "Enviar Feedback" nas Definições.</p>

        <h3>7. Retenção de Dados</h3>
        <p>Os dados são conservados enquanto a conta estiver ativa ou pelo tempo necessário ao cumprimento de obrigações legais. Após pedido de eliminação, os dados são removidos num prazo máximo de 30 dias.</p>

        <h3>8. Cookies</h3>
        <p>Utilizamos apenas cookies técnicos essenciais para o funcionamento da plataforma (sessão de autenticação). Não utilizamos cookies de rastreamento ou publicidade.</p>

        <p><em>Última atualização: 25/05/2026</em></p>
      `
    },
    terms: {
      title: 'Termos & Condições',
      content: `
        <h3>1. Aceitação dos Termos</h3>
        <p>Ao registar-se e utilizar a plataforma de Biblioteca Digital do Agrupamento de Escolas Tomás Cabreira, declara ter lido, compreendido e aceite os presentes Termos e Condições.</p>

        <h3>2. Elegibilidade</h3>
        <p>O serviço destina-se exclusivamente a alunos, professores e funcionários do Agrupamento de Escolas Tomás Cabreira. O registo com dados falsos ou por parte de utilizadores não autorizados será imediatamente cancelado.</p>

        <h3>3. Requisição de Livros</h3>
        <ul>
          <li>Cada utilizador pode ter até um (1) empréstimo ativo de cada vez;</li>
          <li>Após aprovação, o utilizador tem <strong>12 horas</strong> para levantar o livro na biblioteca física;</li>
          <li>O prazo máximo de empréstimo é de <strong>15 dias corridos</strong> a partir da data de levantamento;</li>
          <li>O PIN de 4 dígitos atribuído é pessoal e intransmissível, sendo necessário para efetuar a devolução.</li>
        </ul>

        <h3>4. Devoluções e Multas</h3>
        <p>A devolução fora do prazo estabelecido implica uma multa única de <strong>5,00€</strong>. O pagamento deve ser efetuado presencialmente na biblioteca. Enquanto existirem multas por liquidar, o utilizador não poderá efetuar novas requisições.</p>

        <h3>5. Responsabilidade do Utilizador</h3>
        <p>O utilizador é responsável pela conservação do livro durante o período de empréstimo. Danos, perdas ou deterioração do livro poderão implicar o pagamento do valor de reposição da obra.</p>

        <h3>6. Propriedade Intelectual</h3>
        <p>Todo o conteúdo disponível na plataforma, incluindo textos, imagens e metadados, é protegido por direitos de autor. A reprodução, distribuição ou uso comercial sem autorização expressa é estritamente proibida.</p>

        <h3>7. Suspensão de Conta</h3>
        <p>A administração reserva-se o direito de suspender ou eliminar contas em caso de uso indevido da plataforma, incumprimento dos presentes termos ou comportamento prejudicial à comunidade escolar.</p>

        <h3>8. Limitação de Responsabilidade</h3>
        <p>O Agrupamento não se responsabiliza por interrupções temporárias do serviço, perda de dados por falha técnica ou danos indiretos decorrentes do uso da plataforma.</p>

        <h3>9. Alterações aos Termos</h3>
        <p>Reservamo-nos o direito de atualizar estes termos a qualquer momento. Os utilizadores serão notificados sobre alterações significativas. A utilização continuada da plataforma após a notificação constitui aceitação dos novos termos.</p>

        <p><em>Última atualização: 25/05/2026</em></p>
      `
    },
  },
  home: {
    recommended: 'Recomendados',
    catalog: 'Catálogo',
    catalogSub: 'Explore todos os livros disponíveis na nossa biblioteca',
    errorLoad: 'Não foi possível carregar os livros.',
    errorCheckNet: 'Verifique a sua ligação à internet.',
    retryBtn: 'Tentar Novamente',
    noBooksFound: 'Não encontrámos nenhum livro que corresponda à sua pesquisa.',
    searchNoResults: 'Tente utilizar palavras-chave diferentes ou limpar os filtros.',
    paginationLabel: 'Paginação do catálogo',
    page: 'Página {page}',
    prevPage: 'Página anterior',
    nextPage: 'Página seguinte',
  },
  myLoans: {
  title: 'A Minha Biblioteca',
  subtitle: 'Empréstimos e lista de desejos',
  tabs: {
    loans: 'Empréstimos',
    wishlist: 'Lista de desejos'
  },
  emptyTitle: 'Sem empréstimos',
  emptyDesc: 'Ainda não requisitou nenhum livro do nosso catálogo.',
  exploreCatalog: 'Explorar Catálogo',
  status: {
    active: 'Ativo',
    pending: 'Pendente',
    rejected: 'Recusado',
    returned: 'Devolvido'
  },
  requestLabel: 'Requisição'
},
auth: {
    loginTitle: 'Bem-vindo de volta',
    loginSubtitle: 'Inicie sessão para aceder à biblioteca',
    emailLabel: 'E-mail',
    emailPlaceholder: 'o-seu@email.com',
    passwordLabel: 'Palavra-passe',
    passwordPlaceholder: '••••••••',
    signInBtn: 'Entrar',
    or: 'ou',
    googleBtn: 'Continuar com Google',
    noAccount: 'Sem conta?',
    registerLink: 'Registe-se',
    signupTitle: 'Criar Conta',
    signupSubtitle: 'Junte-se à nossa biblioteca',
    nameLabel: 'Nome completo',
    namePlaceholder: 'Criança Prodígio',
    signUpBtn: 'Criar conta',
    hasAccount: 'Já tem conta?',
    loginLink: 'Entrar',
    emailRateLimit:
      'Limite de emails de autenticação atingido. Aguarde cerca de 1 hora antes de tentar novamente, ou peça ao administrador para aumentar o limite no Supabase (Authentication → Rate Limits).',
    hookError:
      'O envio de email de autenticação falhou (hook). O administrador deve verificar o Send Email Hook no Supabase: token de autorização (service_role), segredo SEND_EMAIL_HOOK_SECRET e deploy de auth-send-email com --no-verify-jwt. Ver docs/AUTH_HOOK_TROUBLESHOOTING.md.'
  },
  notifications: {
    title: 'Notificações',
    subtitle: 'Fique a par das atualizações da sua biblioteca',
    emptyTitle: 'Tudo em dia!',
    emptyDesc: 'Ainda não tem notificações. Quando houver avisos sobre empréstimos ou novos livros, aparecerão aqui.',
    exploreCatalog: 'Explorar Catálogo',
    markAllAsRead: 'Marcar todas como lidas',
    templates: {
      approvedTitle: 'Empréstimo Aprovado',
      approvedMsg: 'O seu pedido de empréstimo para o livro "{book}" foi aprovado. O livro encontra-se disponível para levantamento.',
      rejectedTitle: 'Empréstimo Rejeitado',
      rejectedMsg: 'O seu pedido de empréstimo para o livro "{book}" não pôde ser aprovado neste momento.',
      returnedTitle: 'Livro Devolvido',
      returnedMsg: 'Confirmamos a devolução do livro "{book}". Obrigado pela leitura!',
      warningTitle: 'Aviso de Devolução Próxima',
      warningMsg: 'Lembramos que o livro "{book}" deve ser devolvido amanhã. Por favor, entregue-o na biblioteca.',
      registeredTitle: 'Reserva Registada',
      registeredMsg: 'O seu pedido de reserva para o livro "{book}" foi recebido e aguarda aprovação. Terá 12 horas para levantar o livro na biblioteca antes que a reserva expire automaticamente.'
    }
  },
  footer: {
    groupName: 'Agrupamento de Escolas',
    contacts: 'Contactos',
    usefulLinks: 'Links Úteis',
    platform: 'Plataforma Sdurão',
    moodle: 'Moodle Agrupamento',
    website: 'Website Oficial',
    docs: 'Documentação',
    rights: '© {year} Agrupamento de Escolas Tomás Cabreira, em Faro. Todos os direitos reservados.'
  }
}
