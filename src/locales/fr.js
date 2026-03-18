export default {
  sidebar: { discover: 'Découvrir', myLibrary: 'Ma Bibliothèque', overview: 'Aperçu', books: 'Livres', categories: 'Catégories', loans: 'Emprunts', users: 'Utilisateurs', administration: 'Administration', settings: 'Paramètres', admin: 'Admin' },
  navbar: { searchPlaceholder: 'Rechercher des livres, auteurs...', myAccount: 'Mon Compte', myLoans: 'Mes Emprunts', manageBooks: 'Gérer les Livres', manageLoans: 'Emprunts', newBook: 'Nouveau Livre', logout: 'Déconnexion', login: 'Connexion', register: 'S\'inscrire', adminMenu: 'Administration', docs: 'Documentation', notifications: 'Notifications', loading: 'Chargement...', all: 'Tout' },
  settings: { title: 'Paramètres', subtitle: 'Gérez votre compte et vos préférences', profile: 'Profil', name: 'Nom', email: 'E-mail', appearance: 'Apparence', theme: 'Thème', light: 'Clair', dark: 'Sombre', languageSection: 'Langue', languageDesc: 'Choisissez votre langue préférée', administration: 'Administration', adminActive: 'Session Admin Active', adminDesc: 'Vous êtes connecté en tant qu\'administrateur', adminLogout: 'Déconnexion Admin', account: 'Compte', signOutTitle: 'Se déconnecter', signOutDesc: 'Vous serez redirigé vers la page de connexion', logoutBtn: 'Déconnexion' },
  routes: { login: '/login', signup: '/signup', adminLogin: '/console/login', book: '/book/:id', myLoans: '/my-loans', settings: '/settings', notifications: '/notifications', adminBooks: '/console/books', adminCategories: '/console/categories', adminLoans: '/console/loans', adminBooksNew: '/console/books/new', adminBooksEdit: '/console/books/edit/:id' },
  admin: {
    dashboard: { totalBooks: 'TOTAL LIVRES', activeLoans: 'EMPRUNTS ACTIFS', pendingRequests: 'DEMANDES EN ATTENTE', overdue: 'EN RETARD', recentActivity: 'Activité Récente', viewAll: 'Tout Voir', quickActions: 'Actions Rapides', addNewBook: 'Ajouter un Livre', updateCatalog: 'METTRE À JOUR', manageBooks: 'Gérer les Livres', editOrRemove: 'MODIFIER OU SUPPRIMER', manageLoans: 'Gérer les Emprunts', approveReject: 'APPROUVER / REJETER' },
    login: { title: 'Console d\'Administration', subtitle: 'Portail d\'accès restreint', backToLibrary: 'Retour à la Bibliothèque', authorize: 'Autoriser', secureDb: 'Authentification Scurisée', accessDenied: 'Accès refusé.' },
    common: { approve: 'Approuver', reject: 'Rejeter', returnBtn: 'Retourner', loadingRequests: 'Chargement...', fetchingCollection: 'Chargement...', noRequests: 'Aucune demande', noBooks: 'Aucun livre', saveOrder: 'Sauvegarder', orderSaved: 'Sauvegardé !', orderError: 'Erreur', select: { placeholder: 'Sélectionner...', noOptions: 'Aucune option' } },
    books: { searchPlaceholder: 'Rechercher par titre, auteur...', allCategories: 'Toutes', id: 'ID', bookInfo: 'INFO', inventory: 'INVENTAIRE', featured: 'MIS EN AVANT', actions: 'ACTIONS', available: 'DISPONIBLE', outOfStock: 'RUPTURE DE STOCK', noCover: 'PAS DE COUVERTURE', filterPlaceholder: 'Genre...', toastSaved: 'Mise à jour réussie !', toastAdded: 'Ajout réussi !', toastDeleted: 'Suppression réussie.', toastDeleteError: 'Erreur.', deleteTitle: 'Supprimer le livre', deleteMsg: 'Voulez-vous vraiment supprimer ce livre ?', deleteBtn: 'Supprimer' },
    categories: { title: 'Catégories', subtitle: 'Gérer les catégories.', addPlaceholder: 'Nouvelle catégorie...', searchPlaceholder: 'Rechercher...', addBtn: 'Ajouter', dragToReorder: 'Glisser pour réorganiser', deleteTitle: 'Supprimer', deleteMsg: 'Voulez-vous supprimer ?', deleteBtn: 'Supprimer' },
    loans: { title: 'Gestion des Emprunts', subtitle: 'Gérer les emprunts.', searchPlaceholder: 'Rechercher...', all: 'TOUT', pending: 'EN ATTENTE', active: 'ACTIF', returned: 'RETOURNÉ', rejected: 'REJETÉ', overdue: 'EN RETARD', id: 'ID', user: 'UTILISATEUR', bookDetails: 'DÉTAILS', status: 'STATUT', actions: 'ACTIONS', libMember: 'MEMBRE', borrowedDate: 'EMPRUNTÉ', returnedDate: 'RETOURNÉ', dueDate: 'DATE LIMITE', approvedDate: 'APPROUVÉ LE' },
    users: { title: 'Utilisateurs', subtitle: 'Gérer les utilisateurs.', searchPlaceholder: 'Rechercher...', nameDetails: 'DÉTAILS', role: 'RÔLE', joined: 'JOINT LE', updateSuccess: 'Mise à jour réussie', updateError: 'Erreur', noUsers: 'Aucun utilisateur' },
    roles: { admin: 'Administrateur', professor: 'Professeur', aluno: 'Étudiant', student: 'Étudiant', membro: 'Membre' },
    editBook: { newBookTitle: 'Nouveau Livre', editBookTitle: 'Modifier le Livre', newBookSubtitle: 'Ajouter au catalogue', editBookSubtitle: 'Mettre à jour les informations', fullTitle: 'TITRE COMPLET', authorName: 'NOM DE L\'AUTEUR', isbnReference: 'RÉFÉRENCE ISBN', primaryCategory: 'CATÉGORIE PRINCIPAL', publisher: 'ÉDITEUR', inventoryQuantity: 'QUANTITÉ EN STOCK', guidelines: 'DIRECTIVES', guideline1: 'Images haute résolution', guideline2: 'Ratio recommandé : 3:4', guideline3: 'Taille maximale : 5 Mo', addBookBtn: 'AJOUTER LE LIVRE', updateBookBtn: 'METTRE À JOUR LE LIVRE', uploadImage: 'Cliquez pour uploader', imageFormats: 'SVG, PNG, JPG', titlePlaceholder: 'Le Magnifique Gatsby', authorPlaceholder: 'F. Scott Fitzgerald', isbnPlaceholder: '978-0-...', publisherPlaceholder: 'Éditions Scribner' }
  },
  bookDetails: { backToCatalog: 'Retour au catalogue', backToStart: 'Retour au début', bookNotFound: 'Livre introuvable', requestedSuccess: 'Demande réussie', requestBook: 'Demander le Livre', outOfStock: 'Rupture de stock', availableOf: '{available} sur {total} disponibles', aboutBook: 'À propos de ce livre', aiSummary: 'IA', generateAiSummary: 'Générer un résumé', generatingAiSummary: 'Génération en cours...', noDescription: 'Aucune description. Cliquez sur "Générer un résumé".', bookMetadata: 'Détails du Livre', isbn: 'ISBN', publisher: 'Éditeur', yearEdition: 'Année d\'Édition' },
  docs: {
    badge: 'Documentation Officielle', title: 'Guide', subtitle: 'Tout ce que vous devez savoir.',
    roles: { title: 'Comptes et Rôles', desc: 'Deux types de comptes :', student: 'Étudiant', studentDesc: 'Attribué automatiquement.', admin: 'Administrateur', adminDesc: 'Gère le catalogue.' },
    borrow: { title: 'Emprunter un livre', desc: 'Processus :', step1: 'Catalogue.', step2: 'Cliquez sur Demander.', step3: 'Récupérez à la bibliothèque.', note: 'Date limite stricte.' },
    pin: { title: 'Système PIN', desc: 'Sécurité.', step1: 'PIN généré.', step2: 'Vérifiez sur Mes Emprunts.', step3: 'Fournissez à l\'admin.' },
    ai: { title: 'Fonctionnalités IA', desc: 'IA pour améliorer.', item1: 'Résumés Intelligents', item1Desc: 'Automatisé.', item2: 'Recherche Sémantique', item2Desc: 'Check Vibe.', item3: 'Chat IA', item3Desc: 'Bientôt.' },
    adminPortal: { title: 'Console', desc: 'Pour les admins.', desc2: 'Instructions :', step1: '/console', step2: 'Gestion.', step3: 'Menus épinglés.' }
  },
  home: {
    recommended: 'Recommandés',
    catalog: 'Catalogue',
    catalogSub: 'Explorez tous les livres disponibles dans notre bibliothèque',
    errorLoad: 'Impossible de charger les livres.',
    errorCheckNet: 'Vérifiez votre connexion internet.',
    retryBtn: 'Réessayer'
  },
  myLoans: {
  title: 'Mes Emprunts',
  subtitle: 'Historique complet de vos demandes',
  emptyTitle: 'Aucun emprunt',
  emptyDesc: 'Vous n\'avez pas encore demandé de livres.',
  exploreCatalog: 'Explorer le catalogue',
  status: {
    active: 'Actif',
    pending: 'En attente',
    rejected: 'Rejeté',
    returned: 'Retourné'
  },
  requestLabel: 'Demande'
},
notifications: {
    title: 'Notifications',
    subtitle: 'Restez informé des mises à jour de votre bibliothèque',
    emptyTitle: 'Tout est à jour !',
    emptyDesc: 'Vous n\'avez pas encore de notifications. Les alertes concernant vos emprunts apparaîtront ici.',
    exploreCatalog: 'Explorer le Catalogue'
  }
}
