export default {
  sidebar: { discover: 'Découvrir', myLibrary: 'Ma Bibliothèque', overview: 'Aperçu', books: 'Livres', categories: 'Catégories', loans: 'Emprunts', users: 'Utilisateurs', administration: 'Administration', settings: 'Paramètres', admin: 'Admin' },
  navbar: { 
    searchPlaceholder: 'Rechercher des livres, auteurs...', 
    myAccount: 'Mon Compte', 
    myLoans: 'Mes Emprunts', 
    manageBooks: 'Gérer les Livres', 
    manageLoans: 'Emprunts', 
    newBook: 'Nouveau Livre', 
    logout: 'Déconnexion', 
    login: 'Connexion', 
    register: 'S\'inscrire', 
    adminMenu: 'Administration', 
    docs: 'Documentation', 
    notifications: 'Notifications', 
    loading: 'Chargement...', 
    all: 'Tout',
    home: 'Accueil',
    settings: 'Paramètres'
  },
  landing: {
    badge: 'Bibliothèque Numérique',
    title: 'École Secondaire Tomás Cabreira',
    subtitle: 'Bienvenue sur le portail numérique de notre bibliothèque. Explorez notre vaste catalogue de livres, thèses et ressources éducatives.',
    exploreBtn: 'Explorer le Catalogue',
    aboutTitle: 'À propos de notre Bibliothèque',
    aboutDesc: 'La bibliothèque de l\'école secondaire Tomás Cabreira est un espace d\'apprentissage, de découverte et de partage. Désormais, avec notre version numérique, vous pouvez vérifier la disponibilité des livres et gérer vos demandes de n\'importe où.',
    features: {
      search: 'Recherche Intelligente',
      searchDesc: 'Trouvez facilement ce que vous cherchez par titre, auteur ou catégorie.',
      manage: 'Gestion en Ligne',
      manageDesc: 'Suivez vos emprunts et recevez des notifications de retour.',
      access: 'Accès Facile',
      accessDesc: 'Disponible sur n\'importe quel appareil pour toute la communauté scolaire.'
    }
  },
  settings: { title: 'Paramètres', subtitle: 'Gérez votre compte et vos préférences', profile: 'Profil', name: 'Nom', email: 'E-mail', appearance: 'Apparence', theme: 'Thème', light: 'Clair', dark: 'Sombre', languageSection: 'Langue', languageDesc: 'Choisissez votre langue préférée', administration: 'Administration', adminActive: 'Session Admin Active', adminDesc: 'Vous êtes connecté en tant qu\'administrateur', adminLogout: 'Déconnexion Admin', account: 'Compte', signOutTitle: 'Déconnexion', signOutDesc: 'Vous serez redirigé vers la page de connexion', logoutBtn: 'Déconnexion' },
  routes: { login: '/login', signup: '/signup', adminLogin: '/console/login', book: '/book/:id', myLoans: '/my-loans', settings: '/settings', notifications: '/notifications', adminBooks: '/console/books', adminCategories: '/console/categories', adminLoans: '/console/loans', adminBooksNew: '/console/books/new', adminBooksEdit: '/console/books/edit/:id' },
  admin: {
    dashboard: { totalBooks: 'TOTAL LIVRES', activeLoans: 'EMPRUNTS ACTIFS', pendingRequests: 'DEMANDES EN ATTENTE', overdue: 'EN RETARD', recentActivity: 'Activité Récente', viewAll: 'Voir Tout', quickActions: 'Actions Rapides', addNewBook: 'Nouveau Livre', updateCatalog: 'METTRE À JOUR', manageBooks: 'Gérer les Livres', editOrRemove: 'MODIFIER OU SUPPRIMER', manageLoans: 'Gérer les Emprunts', approveReject: 'APPROUVER / REJETER' },
    login: { title: 'Console d\'Administration', subtitle: 'Portail d\'accès restreint', backToLibrary: 'Retour à la Bibliothèque', authorize: 'Autoriser', secureDb: 'Authentification Sécurisée', accessDenied: 'Accès refusé.' },
    common: { approve: 'Approuver', reject: 'Rejeter', rejectBtn: 'Rejeter', returnBtn: 'Rendre', loadingRequests: 'Chargement des demandes...', fetchingCollection: 'Chargement du catalogue...', noRequests: 'Aucune demande d\'emprunt trouvée', noBooks: 'Aucun livre trouvé', saveOrder: 'Enregistrer l\'ordre', orderSaved: 'Ordre enregistré !', orderError: 'Erreur lors de l\'enregistrement de l\'ordre.', select: { placeholder: 'Sélectionnez une option...', noOptions: 'Aucune option' } },
    books: { searchPlaceholder: 'Rechercher par titre, auteur ou ISBN...', allCategories: 'Toutes les Catégories', id: 'ID', bookInfo: 'INFO', inventory: 'INVENTAIRE', featured: 'VEDETTE', actions: 'ACTIONS', available: 'DISPONIBLE', outOfStock: 'EN RUPTURE', noCover: 'SANS COUVERTURE', filterPlaceholder: 'SÉLECTIONNER GENRE...', toastSaved: 'Livre mis à jour avec succès !', toastAdded: 'Livre ajouté avec succès !', toastDeleted: 'Livre supprimé avec succès.', toastDeleteError: 'Erreur lors de la suppression du livre.', deleteTitle: 'Supprimer le Livre', deleteMsg: 'Voulez-vous vraiment supprimer ce livre de façon permanente ?', deleteBtn: 'Supprimer' },
    categories: { title: 'Catégories', subtitle: 'Gérer les catégories du catalogue.', addPlaceholder: 'Nouveau nom de catégorie...', searchPlaceholder: 'Rechercher des catégories...', addBtn: 'Ajouter', dragToReorder: 'Faites glisser les icônes pour réorganiser', deleteTitle: 'Supprimer la Catégorie', deleteMsg: 'Voulez-vous vraiment supprimer cette catégorie ? Cela peut affecter les livres associés.', deleteBtn: 'Oui, Supprimer' },
    loans: { title: 'Gestion des Emprunts', subtitle: 'Gérer et suivre les emprunts', searchPlaceholder: 'Rechercher par livre, auteur ou email...', all: 'TOUT', pending: 'EN ATTENTE', active: 'ACTIF', returned: 'RENDU', rejected: 'REJETÉ', overdue: 'EN RETARD', id: 'ID', user: 'UTILISATEUR', bookDetails: 'DÉTAILS DU LIVRE', status: 'STATUT', actions: 'ACTIONS', libMember: 'MEMBRE', borrowedDate: 'EMPRUNTÉ', returnedDate: 'DATE DE RETOUR', dueDate: 'DATE LIMITE', approvedDate: 'APPROUVÉ LE' },
    users: { title: 'Utilisateurs', subtitle: 'Gérer l\'accès au système et les rôles', searchPlaceholder: 'Rechercher un nom ou un email...', nameDetails: 'DÉTAILS DE L\'UTILISATEUR', role: 'RÔLE', joined: 'DATE D\'INSCRIPTION', updateSuccess: 'Rôle mis à jour', updateError: 'Erreur lors de la mise à jour', noUsers: 'Aucun utilisateur trouvé' },
    roles: { admin: 'Administrateur', professor: 'Professeur', aluno: 'Élève', student: 'Élève', membro: 'Membre' },
    editBook: { newBookTitle: 'Ajouter un Nouveau Livre', editBookTitle: 'Modifier les Détails du Livre', newBookSubtitle: 'Ajoutez un nouveau livre au catalogue', editBookSubtitle: 'Mettre à jour les informations', fullTitle: 'TITRE COMPLET', authorName: 'NOM DE L\'AUTEUR', isbnReference: 'RÉFÉRENCE ISBN', primaryCategory: 'CATÉGORIE PRINCIPALE', publisher: 'ÉDITEUR', inventoryQuantity: 'QUANTITÉ', guidelines: 'DIRECTIVES', guideline1: 'Images haute résolution préférées', guideline2: 'Ratio recommandé : 3:4', guideline3: 'Taille maximale : 5 Mo (JPG, PNG)', addBookBtn: 'AJOUTER LE LIVRE', updateBookBtn: 'METTRE À JOUR LE LIVRE', uploadImage: 'Cliquez pour télécharger', imageFormats: 'SVG, PNG, JPG (max. 800x400)', titlePlaceholder: 'Gatsby le Magnifique', authorPlaceholder: 'F. Scott Fitzgerald', isbnPlaceholder: '978-0-...', publisherPlaceholder: "Scribner's Sons" }
  },
  bookDetails: { backToCatalog: 'Retour au catalogue', backToStart: 'Retour au début', bookNotFound: 'Livre non trouvé', requestedSuccess: 'Demandé avec succès', requestBook: 'Demander le Livre', outOfStock: 'Épuisé', availableOf: '{available} sur {total} disponibles', aboutBook: 'À propos de ce livre', aiSummary: 'IA', generateAiSummary: 'Générer résumé IA', generatingAiSummary: 'Génération du résumé...', noDescription: 'Aucune description disponible pour ce livre.', bookMetadata: 'Détails du Livre', isbn: 'ISBN', publisher: 'Éditeur',    yearEdition: 'Année d\'Édition',
    reviewsTitle: 'Avis & Commentaires',
    writeReview: 'Rédiger un Avis',
    editReview: 'Modifier votre Avis',
    submitReview: 'Soumettre l\'Avis',
    cancelReview: 'Annuler',
    noReviews: 'Aucun avis pour l\'instant. Soyez le premier à évaluer ce livre!',
    ratingLabel: 'Évaluation',
    commentLabel: 'Commentaire (facultatif)',
    averageRating: 'Évaluation Moyenne',
    reviewSuccess: 'Avis soumis avec succès!',
    reviewError: 'Échec de la soumission de l\'avis. Veuillez réessayer.',
    youReviewed: 'Vous avez évalué ce livre'
  },
  docs: {
    badge: 'Documentation', title: 'Guide de la Bibliothèque', subtitle: 'Tout ce que vous devez savoir.',
    roles: { title: 'Comptes et Rôles', desc: 'Types :', student: 'Élève', studentDesc: 'Auto-assigné.', admin: 'Administrateur', adminDesc: 'Gère le système.' },
    borrow: { title: 'Emprunts', desc: 'Processus :', step1: 'Cherchez.', step2: 'Demandez.', step3: 'Récupérez.', note: 'Note : Il y a des délais.' },
    pin: { title: 'Système de PIN', desc: 'Sécurité.', step1: 'Recevez un PIN.', step2: 'Vérifiez-le.', step3: 'Donnez-le à l\'administrateur.' },
    ai: { title: 'Fonctions IA', desc: 'IA :', item1: 'Résumés', item1Desc: 'Automatiques.', item2: 'Recherche', item2Desc: 'Check Vibe.', item3: 'Chat', item3Desc: 'Bibliothécaire IA.' },
    adminPortal: { title: 'Console Admin', desc: 'Gestion.', desc2: 'Étapes :', step1: '/console.', step2: 'Menu.', step3: 'Utilisez les outils.' }
  },
  home: {
    recommended: 'Recommandés',
    catalog: 'Catalogue',
    catalogSub: 'Explorez tous les livres disponibles dans notre bibliothèque',
    errorLoad: 'Impossible de charger les livres.',
    errorCheckNet: 'Vérifiez votre connexion internet.',
    retryBtn: 'Réessayer',
    noBooksFound: 'Aucun livre ne correspond à votre recherche.',
    searchNoResults: 'Essayez différents mots-clés ou effacez vos filtres.'
  },
  myLoans: {
    title: 'Mes Emprunts',
    subtitle: 'Historique complet de vos demandes',
    emptyTitle: 'Aucun emprunt',
    emptyDesc: 'Vous n\'avez pas encore demandé de livre du catalogue.',
    exploreCatalog: 'Explorer le Catalogue',
    status: {
      active: 'Actif',
      pending: 'En attente',
      rejected: 'Rejeté',
      returned: 'Rendu'
    },
    requestLabel: 'Demande'
  },
  auth: {
    loginTitle: 'Content de vous revoir',
    loginSubtitle: 'Connectez-vous pour accéder à la bibliothèque',
    emailLabel: 'Adresse e-mail',
    emailPlaceholder: 'votre@email.com',
    passwordLabel: 'Mot de passe',
    passwordPlaceholder: '••••••••',
    signInBtn: 'Se connecter',
    or: 'ou',
    googleBtn: 'Continuer avec Google',
    noAccount: 'Pas de compte ?',
    registerLink: 'S\'inscrire',
    signupTitle: 'Créer un Compte',
    signupSubtitle: 'Rejoignez notre bibliothèque',
    nameLabel: 'Nom complet',
    namePlaceholder: 'Jean Dupont',
    signUpBtn: 'Créer le compte',
    hasAccount: 'Vous avez déjà un compte ?',
    loginLink: 'Se connecter'
  },
  notifications: {
    title: 'Notifications',
    subtitle: 'Restez informé des mises à jour de votre bibliothèque',
    emptyTitle: 'Tout est à jour !',
    emptyDesc: 'Vous n\'avez pas encore de notifications. Tous les avis sur les emprunts ou les nouveaux livres apparaîtront ici.',
    exploreCatalog: 'Explorer le Catalogue'
  }
}
