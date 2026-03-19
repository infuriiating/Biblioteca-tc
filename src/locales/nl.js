export default {
  sidebar: { discover: 'Ontdekken', myLibrary: 'Mijn Bibliotheek', overview: 'Overzicht', books: 'Boeken', categories: 'Categorieën', loans: 'Leningen', users: 'Gebruikers', administration: 'Administratie', settings: 'Instellingen', admin: 'Beheerder' },
  navbar: { searchPlaceholder: 'Zoek boeken, auteurs...', myAccount: 'Mijn Account', myLoans: 'Mijn Leningen', manageBooks: 'Beheer Boeken', manageLoans: 'Leningen', newBook: 'Nieuw Boek', logout: 'Uitloggen', login: 'Inloggen', register: 'Registreren', adminMenu: 'Administratie', docs: 'Documentatie', notifications: 'Meldingen', loading: 'Laden...', all: 'Alles' },
  settings: { title: 'Instellingen', subtitle: 'Beheer uw account en voorkeuren', profile: 'Profiel', name: 'Naam', email: 'E-mail', appearance: 'Uiterlijk', theme: 'Thema', light: 'Licht', dark: 'Donker', languageSection: 'Taal', languageDesc: 'Kies uw voorkeurstaal', administration: 'Administratie', adminActive: 'Beheerder Sessie Actief', adminDesc: 'U bent ingelogd als beheerder', adminLogout: 'Uitloggen Beheerder', account: 'Account', signOutTitle: 'Uitloggen', signOutDesc: 'U wordt doorgestuurd naar de inlogpagina', logoutBtn: 'Uitloggen' },
  routes: { login: '/login', signup: '/signup', adminLogin: '/console/login', book: '/book/:id', myLoans: '/my-loans', settings: '/settings', notifications: '/notifications', adminBooks: '/console/books', adminCategories: '/console/categories', adminLoans: '/console/loans', adminBooksNew: '/console/books/new', adminBooksEdit: '/console/books/edit/:id' },
  admin: {
    dashboard: { totalBooks: 'TOTAAL BOEKEN', activeLoans: 'ACTIEVE LENINGEN', pendingRequests: 'IN WACHT', overdue: 'TE LAAT', recentActivity: 'Recente Activiteit', viewAll: 'Alles Bekijken', quickActions: 'Snelle Acties', addNewBook: 'Nieuw Boek Toevoegen', updateCatalog: 'CATALOGUS BIJWERKEN', manageBooks: 'Beheer Boeken', editOrRemove: 'BEWERKEN OF VERWIJDEREN', manageLoans: 'Beheer Leningen', approveReject: 'GOEDKEUREN / AFWIJZEN' },
    login: { title: 'Beheerconsole', subtitle: 'Toegang voor bibliotheekbeheer', backToLibrary: 'Terug naar Bibliotheek', authorize: 'Autoriseren', secureDb: 'Beveiligde Database Authenticatie', accessDenied: 'Toegang geweigerd. Alleen voor beheerders.' },
    common: { approve: 'Goedkeuren', reject: 'Afwijzen', returnBtn: 'Terugbrengen', loadingRequests: 'Aanvragen laden...', fetchingCollection: 'Collectie ophalen...', noRequests: 'Geen leenaanvragen', noBooks: 'Geen boeken gevonden', saveOrder: 'Opslaan', orderSaved: 'Opgeslagen!', orderError: 'Fout bij opslaan.', select: { placeholder: 'Selecteer een optie...', noOptions: 'Geen opties' } },
    books: { searchPlaceholder: 'Zoek op titel, auteur...', allCategories: 'Alle Categorieën', id: 'ID', bookInfo: 'BOEK INFO', inventory: 'INVENTARIS', featured: 'AANBEVOLEN', actions: 'ACTIES', available: 'BESCHIKBAAR', outOfStock: 'NIET OP VOORRAAD', noCover: 'GEEN OMSLAG', filterPlaceholder: 'Genre selecteren...', toastSaved: 'Succesvol bijgewerkt!', toastAdded: 'Succesvol toegevoegd!', toastDeleted: 'Succesvol verwijderd.', toastDeleteError: 'Fout bij verwijderen.', deleteTitle: 'Boek Verwijderen', deleteMsg: 'Weet je zeker dat je dit boek wilt verwijderen?', deleteBtn: 'Verwijderen' },
    categories: { title: 'Categorieën', subtitle: 'Beheer categorieën.', addPlaceholder: 'Nieuwe categorie...', searchPlaceholder: 'Zoeken...', addBtn: 'Toevoegen', dragToReorder: 'Sleep om te herschikken', deleteTitle: 'Categorie Verwijderen', deleteMsg: 'Weet je het zeker?', deleteBtn: 'Verwijderen' },
    loans: { title: 'Leenbeheer', subtitle: 'Beheer en bekijk leningen', searchPlaceholder: 'Zoeken...', all: 'ALLES', pending: 'IN WACHT', active: 'ACTIEF', returned: 'GERETOURNEERD', rejected: 'AFGEWEZEN', overdue: 'TE LAAT', id: 'ID', user: 'GEBRUIKER', bookDetails: 'BOEK DETAILS', status: 'STATUS', actions: 'ACTIES', libMember: 'LID', borrowedDate: 'GELEEND OP', returnedDate: 'GERETOURNEERD OP', dueDate: 'INLEVERDATUM', approvedDate: 'GOEDGEKEURD OP' },
    users: { title: 'Gebruikers', subtitle: 'Beheer systeemtoegang en rollen', searchPlaceholder: 'Zoek naam of e-mail...', nameDetails: 'GEBRUIKERSDETAILS', role: 'ROL', joined: 'LID SINDS', updateSuccess: 'Rol succesvol bijgewerkt', updateError: 'Fout bij bijwerken rol', noUsers: 'Geen gebruikers gevonden' },
    roles: { admin: 'Beheerder', professor: 'Professor', aluno: 'Student', student: 'Student', membro: 'Lid' },
    editBook: { newBookTitle: 'Nieuw Boek Toevoegen', editBookTitle: 'Boekdetails Bewerken', newBookSubtitle: 'Voeg een nieuw boek toe aan de catalogus', editBookSubtitle: 'Werk boekinformatie bij', fullTitle: 'TITEL', authorName: 'AUTEUR', isbnReference: 'ISBN', primaryCategory: 'HOOFDCATEGORIE', publisher: 'UITGEVER', inventoryQuantity: 'HOEVEELHEID', guidelines: 'RICHTLIJNEN', guideline1: 'Afbeeldingen met hoge resolutie de voorkeur', guideline2: 'Aanbevolen verhouding: 3:4', guideline3: 'Max 5MB', addBookBtn: 'BOEK TOEVOEGEN', updateBookBtn: 'BOEK BIJWERKEN', uploadImage: 'Klik om te uploaden', imageFormats: 'SVG, PNG, JPG', titlePlaceholder: 'The Great Gatsby', authorPlaceholder: 'F. Scott Fitzgerald', isbnPlaceholder: '978-0-...', publisherPlaceholder: "Scribner's Sons" }
  },
  bookDetails: { backToCatalog: 'Terug naar catalogus', backToStart: 'Terug naar start', bookNotFound: 'Boek niet gevonden', requestedSuccess: 'Succesvol aangevraagd', requestBook: 'Boek Aanvragen', outOfStock: 'Niet op voorraad', availableOf: '{available} van {total} beschikbaar', aboutBook: 'Over dit boek', aiSummary: 'AI', generateAiSummary: 'Genereer AI-samenvatting', generatingAiSummary: 'Bezig met genereren...', noDescription: 'Geen beschrijving beschikbaar.', bookMetadata: 'Boekdetails', isbn: 'ISBN', publisher: 'Uitgever', yearEdition: 'Jaar van uitgave' },
  docs: {
    badge: 'Officiële Documentatie', title: 'Gids', subtitle: 'Alles wat u moet weten over het platform.',
    roles: { title: 'Accounts en Rollen', desc: 'Soorten:', student: 'Student', studentDesc: 'Auto toegewezen.', admin: 'Beheerder', adminDesc: 'Systeembeheer.' },
    borrow: { title: 'Lenen', desc: 'Proces:', step1: 'Verken.', step2: 'Vraag aan.', step3: 'Haal op.', note: 'Deadlines van toepassing.' },
    pin: { title: 'PIN-Systeem', desc: 'Beveiliging.', step1: 'Unieke PIN.', step2: 'Controleer.', step3: 'Geef af.' },
    ai: { title: 'AI-Functies', desc: 'AI integratie:', item1: 'Samenvattingen', item1Desc: 'Automatisch.', item2: 'Zoeken', item2Desc: 'Vibe.', item3: 'Chat', item3Desc: 'Binnenkort.' },
    adminPortal: { title: 'Beheerderspaneel', desc: 'Beheer.', desc2: 'Stappen:', step1: '/console.', step2: 'Menu.', step3: 'Beheer gereedschap.' }
  },
  home: {
    recommended: 'Aanbevolen',
    catalog: 'Catalogus',
    catalogSub: 'Ontdek alle beschikbare boeken in onze bibliotheek',
    errorLoad: 'Kan boeken niet laden.',
    errorCheckNet: 'Controleer uw internetverbinding.',
    retryBtn: 'Opnieuw proberen'
  },
  myLoans: {
  title: 'Mijn Leningen',
  subtitle: 'Volledig overzicht van uw aanvragen',
  emptyTitle: 'Geen leningen',
  emptyDesc: 'U heeft nog geen boeken aangevraagd.',
  exploreCatalog: 'Catalogus verkennen',
  status: {
    active: 'Actief',
    pending: 'In behandeling',
    rejected: 'Afgewezen',
    returned: 'Geretourneerd'
  },
  requestLabel: 'Aanvraag'
},
auth: {
    loginTitle: 'Welkom terug',
    loginSubtitle: 'Log in om toegang te krijgen tot de bibliotheek',
    emailLabel: 'E-mail',
    emailPlaceholder: 'jouw@email.com',
    passwordLabel: 'Wachtwoord',
    passwordPlaceholder: '••••••••',
    signInBtn: 'Inloggen',
    or: 'of',
    googleBtn: 'Doorgaan met Google',
    noAccount: 'Geen account?',
    registerLink: 'Registreren',
    signupTitle: 'Account Aanmaken',
    signupSubtitle: 'Word lid van onze bibliotheek',
    nameLabel: 'Volledige naam',
    namePlaceholder: 'Jan Jansen',
    signUpBtn: 'Account aanmaken',
    hasAccount: 'Heb je al een account?',
    loginLink: 'Inloggen'
  },
  notifications: {
    title: 'Meldingen',
    subtitle: 'Blijf op de hoogte van uw bibliotheek',
    emptyTitle: 'Helemaal bij!',
    emptyDesc: 'U heeft nog geen meldingen. Updates over leningen of nieuwe boeken verschijnen hier.',
    exploreCatalog: 'Catalogus Verkennen'
  }
}
