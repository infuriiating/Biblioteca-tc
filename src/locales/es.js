export default {
  sidebar: { discover: 'Descubrir', myLibrary: 'Mi Biblioteca', overview: 'Resumen', books: 'Libros', categories: 'Categorías', loans: 'Préstamos', users: 'Usuarios', administration: 'Administración', settings: 'Configuración', admin: 'Admin' },
  navbar: { 
    searchPlaceholder: 'Buscar libros, autores...', 
    myAccount: 'Mi Cuenta', 
    myLoans: 'Mis Préstamos', 
    manageBooks: 'Gestionar Libros', 
    manageLoans: 'Préstamos', 
    newBook: 'Nuevo Libro', 
    logout: 'Cerrar Sesión', 
    login: 'Iniciar Sesión', 
    register: 'Registrarse', 
    adminMenu: 'Administración', 
    docs: 'Documentación', 
    notifications: 'Notificaciones', 
    loading: 'Cargando...', 
    all: 'Todo',
    home: 'Inicio',
    settings: 'Ajustes'
  },
  landing: {
    badge: 'Biblioteca Digital',
    title: 'Escuela Secundaria Tomás Cabreira',
    subtitle: 'Bienvenido al portal digital de nuestra biblioteca. Explore nuestro vasto catálogo de libros, tesis y recursos educativos.',
    exploreBtn: 'Explorar Catálogo',
    aboutTitle: 'Sobre nuestra Biblioteca',
    aboutDesc: 'La Biblioteca de la Escuela Secundaria Tomás Cabreira es un espacio de aprendizaje, descubrimiento y intercambio. Ahora, con nuestra versión digital, puede consultar la disponibilidad de libros y gestionar sus préstamos desde cualquier lugar.',
    features: {
      search: 'Búsqueda Inteligente',
      searchDesc: 'Encuentre fácilmente lo que busca por título, autor o categoría.',
      manage: 'Gestión Online',
      manageDesc: 'Siga sus préstamos y recibe notificaciones de devolución.',
      access: 'Acceso Fácil',
      accessDesc: 'Disponible en cualquier dispositivo para toda la comunidad escolar.'
    }
  },
  settings: { title: 'Configuración', subtitle: 'Gestiona tu cuenta y preferencias', profile: 'Perfil', name: 'Nombre', email: 'Correo', appearance: 'Apariencia', theme: 'Tema', light: 'Claro', dark: 'Oscuro', languageSection: 'Idioma', languageDesc: 'Elige tu idioma preferido', administration: 'Administración', adminActive: 'Sesión de Admin Ativa', adminDesc: 'Estás conectado como administrador', adminLogout: 'Cerrar Sesión Admin', account: 'Cuenta', signOutTitle: 'Cerrar Sesión', signOutDesc: 'Serás redirigido a la página de inicio de sesión', logoutBtn: 'Cerrar Sesión' },
  routes: { login: '/login', signup: '/signup', adminLogin: '/console/login', book: '/book/:id', myLoans: '/my-loans', settings: '/settings', notifications: '/notifications', adminBooks: '/console/books', adminCategories: '/console/categories', adminLoans: '/console/loans', adminBooksNew: '/console/books/new', adminBooksEdit: '/console/books/edit/:id' },
  admin: {
    dashboard: { totalBooks: 'TOTAL LIBROS', activeLoans: 'PRÉSTAMOS ACTIVOS', pendingRequests: 'SOLICITUDES PENDIENTES', overdue: 'VENCIDOS', recentActivity: 'Actividad Reciente', viewAll: 'Ver Todo', quickActions: 'Acciones Rápidas', addNewBook: 'Nuevo Libro', updateCatalog: 'ACTUALIZAR', manageBooks: 'Gestionar Libros', editOrRemove: 'EDITAR O ELIMINAR', manageLoans: 'Gestionar Préstamos', approveReject: 'APROBAR / RECHAZAR' },
    login: { title: 'Consola de Administración', subtitle: 'Portal de acceso restringido', backToLibrary: 'Volver a la Biblioteca', authorize: 'Autorizar', secureDb: 'Autenticación Segura', accessDenied: 'Acceso denegado.' },
    common: { approve: 'Aprobar', reject: 'Rechazar', returnBtn: 'Devolver', loadingRequests: 'Cargando solicitudes...', fetchingCollection: 'Cargando catálogo...', noRequests: 'No hay solicitudes de préstamo', noBooks: 'No se encontraron libros', saveOrder: 'Guardar orden', orderSaved: '¡Orden guardado!', orderError: 'Error al guardar el orden.', select: { placeholder: 'Seleccione una opción...', noOptions: 'Sin opciones' } },
    books: { searchPlaceholder: 'Buscar por título, autor o ISBN...', allCategories: 'Todas las Categorías', id: 'ID', bookInfo: 'INFO', inventory: 'INVENTARIO', featured: 'DESTACADO', actions: 'ACCIONES', available: 'DISPONIBLE', outOfStock: 'AGOTADO', noCover: 'SIN PORTADA', filterPlaceholder: 'Seleccionar género...', toastSaved: '¡Libro actualizado correctamente!', toastAdded: '¡Libro añadido correctamente!', toastDeleted: 'Libro eliminado correctamente.', toastDeleteError: 'Error al eliminar el libro.', deleteTitle: 'Eliminar Libro', deleteMsg: '¿Seguro que quieres eliminar este libro permanentemente?', deleteBtn: 'Eliminar' },
    categories: { title: 'Categorías', subtitle: 'Gestiona las categorías del catálogo.', addPlaceholder: 'Nuevo nombre de categoría...', searchPlaceholder: 'Buscar categorías...', addBtn: 'Añadir', dragToReorder: 'Arrastra los iconos para reordenar', deleteTitle: 'Eliminar Categoría', deleteMsg: '¿Seguro que quieres eliminar esta categoría? Puede afectar a los libros asociados.', deleteBtn: 'Sí, Eliminar' },
    loans: { title: 'Gestión de Préstamos', subtitle: 'Gestiona y realiza un seguimiento de los préstamos', searchPlaceholder: 'Buscar por libro, autor o correo...', all: 'TODO', pending: 'PENDIENTE', active: 'ACTIVO', returned: 'DEVUELTO', rejected: 'RECHAZADO', overdue: 'VENCIDO', id: 'ID', user: 'USUARIO', bookDetails: 'DETALLES DEL LIBRO', status: 'ESTADO', actions: 'ACCIONES', libMember: 'MIEMBRO', borrowedDate: 'PRESTADO', returnedDate: 'FECHA DE DEVOLUCIÓN', dueDate: 'FECHA LÍMITE', approvedDate: 'APROBADO EL' },
    users: { title: 'Usuarios', subtitle: 'Gestiona el acceso al sistema y roles', searchPlaceholder: 'Buscar nombre o correo...', nameDetails: 'DETALLES DE USUARIO', role: 'ROL', joined: 'FECHA REGISTRO', updateSuccess: 'Rol actualizado', updateError: 'Error al actualizar', noUsers: 'No se encontraron usuarios' },
    roles: { admin: 'Administrador', professor: 'Profesor', aluno: 'Alumno', student: 'Alumno', membro: 'Miembro' },
    editBook: { newBookTitle: 'Añadir Nuevo Libro', editBookTitle: 'Editar Detalles del Libro', newBookSubtitle: 'Añade un nuevo libro al catálogo', editBookSubtitle: 'Actualiza la información', fullTitle: 'TÍTULO COMPLETO', authorName: 'NOMBRE DEL AUTOR', isbnReference: 'REFERENCIA ISBN', primaryCategory: 'CATEGORÍA PRINCIPAL', publisher: 'EDITORIAL', inventoryQuantity: 'CANTIDAD', guidelines: 'DIRECTRICES', guideline1: 'Imágenes de alta resolución preferidas', guideline2: 'Proporción recomendada: 3:4', guideline3: 'Tamaño máximo: 5 MB (JPG, PNG)', addBookBtn: 'AÑADIR LIBRO', updateBookBtn: 'ACTUALIZAR LIBRO', uploadImage: 'Haz clic para subir', imageFormats: 'SVG, PNG, JPG (máx. 800x400)', titlePlaceholder: 'El Gran Gatsby', authorPlaceholder: 'F. Scott Fitzgerald', isbnPlaceholder: '978-0-...', publisherPlaceholder: "Scribner's Sons" }
  },
  bookDetails: { backToCatalog: 'Volver al catálogo', backToStart: 'Volver al inicio', bookNotFound: 'Libro no encontrado', requestedSuccess: 'Solicitado con éxito', requestBook: 'Solicitar Libro', outOfStock: 'Agotado', availableOf: '{available} de {total} disponibles', aboutBook: 'Sobre este libro', aiSummary: 'IA', generateAiSummary: 'Generar resumen IA', generatingAiSummary: 'Generando resumen...', noDescription: 'No hay descripción disponible para este libro.', bookMetadata: 'Detalles del Libro', isbn: 'ISBN', publisher: 'Editorial',    yearEdition: 'Año de Edición',
    reviewsTitle: 'Reseñas y Comentarios',
    writeReview: 'Escribir una Reseña',
    editReview: 'Editar tu Reseña',
    submitReview: 'Enviar Reseña',
    cancelReview: 'Cancelar',
    noReviews: 'Aún no hay reseñas. ¡Sé el primero en calificar este libro!',
    ratingLabel: 'Calificación',
    commentLabel: 'Comentario (opcional)',
    averageRating: 'Calificación Media',
    reviewSuccess: '¡Reseña enviada con éxito!',
    reviewError: 'Error al enviar la reseña. Inténtalo de nuevo.',
    youReviewed: 'Calificaste este libro'
  },
  docs: {
    badge: 'Documentación', title: 'Guía de la Biblioteca', subtitle: 'Todo lo que necesitas saber.',
    roles: { title: 'Cuentas y Roles', desc: 'Tipos:', student: 'Alumno', studentDesc: 'Auto asignado.', admin: 'Administrador', adminDesc: 'Gestiona el sistema.' },
    borrow: { title: 'Préstamos', desc: 'Proceso:', step1: 'Busca.', step2: 'Solicita.', step3: 'Recoge.', note: 'Nota: Hay plazos.' },
    pin: { title: 'Sistema de PIN', desc: 'Seguridad.', step1: 'Recibe un PIN.', step2: 'Revísalo.', step3: 'Entrégalo al administrador.' },
    ai: { title: 'Funciones IA', desc: 'IA:', item1: 'Resúmenes', item1Desc: 'Automáticos.', item2: 'Búsqueda', item2Desc: 'Check Vibe.', item3: 'Chat', item3Desc: 'Librero IA.' },
    adminPortal: { title: 'Consola Admin', desc: 'Gestión.', desc2: 'Pasos:', step1: '/console.', step2: 'Menú.', step3: 'Usa herramientas.' }
  },
  home: {
    recommended: 'Recomendados',
    catalog: 'Catálogo',
    catalogSub: 'Explora todos los libros disponibles en nuestra biblioteca',
    errorLoad: 'No se pudieron cargar los libros.',
    errorCheckNet: 'Verifica tu conexión a internet.',
    retryBtn: 'Reintentar',
    noBooksFound: 'Ningún libro coincide con tu búsqueda.',
    searchNoResults: 'Intenta con diferentes palabras clave o limpiando los filtros.'
  },
  myLoans: {
    title: 'Mis Préstamos',
    subtitle: 'Historial completo de sus solicitudes',
    emptyTitle: 'Sin préstamos',
    emptyDesc: 'Aún no ha solicitado ningún libro del catálogo.',
    exploreCatalog: 'Explorar Catálogo',
    status: {
      active: 'Activo',
      pending: 'Pendiente',
      rejected: 'Rechazado',
      returned: 'Devuelto'
    },
    requestLabel: 'Solicitud'
  },
  auth: {
    loginTitle: 'Bienvenido de nuevo',
    loginSubtitle: 'Inicia sesión para acceder a la biblioteca',
    emailLabel: 'Correo electrónico',
    emailPlaceholder: 'tu@email.com',
    passwordLabel: 'Contraseña',
    passwordPlaceholder: '••••••••',
    signInBtn: 'Entrar',
    or: 'o',
    googleBtn: 'Continuar con Google',
    noAccount: '¿No tienes cuenta?',
    registerLink: 'Regístrate',
    signupTitle: 'Crear Cuenta',
    signupSubtitle: 'Únete a nuestra biblioteca',
    nameLabel: 'Nombre completo',
    namePlaceholder: 'Juan Pérez',
    signUpBtn: 'Crear cuenta',
    hasAccount: '¿Ya tienes cuenta?',
    loginLink: 'Entrar'
  },
  notifications: {
    title: 'Notificaciones',
    subtitle: 'Mantente al día con tu biblioteca',
    emptyTitle: '¡Todo al día!',
    emptyDesc: 'Aún no tienes notificaciones. Cualquier aviso sobre préstamos o libros nuevos aparecerá aquí.',
    exploreCatalog: 'Explorar Catálogo'
  }
}
