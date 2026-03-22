export default {
  sidebar: { discover: 'Ontdekken', myLibrary: 'Mijn Bibliotheek', overview: 'Overzicht', books: 'Boeken', categories: 'Categorieën', loans: 'Leningen', users: 'Gebruikers', administration: 'Administratie', settings: 'Instellingen', admin: 'Admin' },
  navbar: { 
    searchPlaceholder: 'Zoek boeken, auteurs...', 
    myAccount: 'Mijn Account', 
    myLoans: 'Mijn Leningen', 
    manageBooks: 'Boeken Beheren', 
    manageLoans: 'Leningen', 
    newBook: 'Nieuw Boek', 
    logout: 'Uitloggen', 
    login: 'Inloggen', 
    register: 'Registreren', 
    adminMenu: 'Administratie', 
    docs: 'Documentatie', 
    notifications: 'Meldingen', 
    loading: 'Laden...', 
    all: 'Alle',
    home: 'Home',
    settings: 'Instellingen'
  },
  landing: {
    badge: 'Digitale Bibliotheek',
    title: 'Middelbare School Tomás Cabreira',
    subtitle: 'Welkom bij het digitale portaal van onze bibliotheek. Verken onze uitgebreide catalogus met boeken, scripties en educatieve bronnen.',
    exploreBtn: 'Catalogus verkennen',
    aboutTitle: 'Over onze Bibliotheek',
    aboutDesc: 'De bibliotheek van de middelbare school Tomás Cabreira is een plek voor leren, ontdekken en delen. Nu kunt u met onze digitale versie overal de beschikbaarheid van boeken controleren en uw aanvragen beheren.',
    features: {
      search: 'Slim Zoeken',
      searchDesc: 'Vind eenvoudig wat u zoekt op titel, auteur of categorie.',
      manage: 'Online Beheer',
      manageDesc: 'Volg uw leningen en ontvang retourmeldingen.',
      access: 'Eenvoudige Toegang',
      accessDesc: 'Beschikbaar op elk apparaat voor de hele schoolgemeenschap.'
    }
  },
  settings: { title: 'Instellingen', subtitle: 'Beheer uw account en voorkeuren', profile: 'Profiel', name: 'Naam', email: 'E-mail', appearance: 'Uiterlijk', theme: 'Thema', light: 'Licht', dark: 'Donker', languageSection: 'Taal', languageDesc: 'Kies uw voorkeurstaal', administration: 'Administratie', adminActive: 'Admin Sessie Actief', adminDesc: 'U bent ingelogd als administrator', adminLogout: 'Admin Uitloggen', account: 'Account', signOutTitle: 'Uitloggen', signOutDesc: 'U wordt doorgestuurd naar de inlogpagina', logoutBtn: 'Uitloggen' },
  routes: { login: '/login', signup: '/signup', adminLogin: '/console/login', book: '/book/:id', myLoans: '/my-loans', settings: '/settings', notifications: '/notifications', adminBooks: '/console/books', adminCategories: '/console/categories', adminLoans: '/console/loans', adminBooksNew: '/console/books/new', adminBooksEdit: '/console/books/edit/:id' },
  admin: {
    dashboard: { totalBooks: 'TOTAAL BOEKEN', activeLoans: 'ACTIEVE LENINGEN', pendingRequests: 'PENDELENDE AANVRAGEN', overdue: 'TE LAAT', recentActivity: 'Recente Activiteit', viewAll: 'Alles Weergeven', quickActions: 'Snelle Acties', addNewBook: 'Nieuw Boek', updateCatalog: 'CATALOGUS BIJWERKEN', manageBooks: 'Boeken Beheren', editOrRemove: 'BEWERKEN OF VERWIJDEREN', manageLoans: 'Leningen Beheren', approveReject: 'GOEDKEUREN / AFWIJZEN' },
    login: { title: 'Admin Console', subtitle: 'Beperkt toegangsportaal', backToLibrary: 'Terug naar de Bibliotheek', authorize: 'Autoriseren', secureDb: 'Veilige Authenticatie', accessDenied: 'Toegang geweigerd.' },
    common: { approve: 'Goedkeuren', reject: 'Afwijzen', rejectBtn: 'Afwijzen', returnBtn: 'Inleveren', loadingRequests: 'Aanvragen laden...', fetchingCollection: 'Catalogus laden...', noRequests: 'Geen leningaanvragen gevonden', noBooks: 'Geen boeken gevonden', saveOrder: 'Volgorde opslaan', orderSaved: 'Volgorde succesvol opgeslagen!', orderError: 'Fout bij opslaan volgorde.', select: { placeholder: 'Selecteer een optie...', noOptions: 'Geen opties' } },
    books: { searchPlaceholder: 'Zoek op titel, auteur of ISBN...', allCategories: 'Alle Categorieën', id: 'ID', bookInfo: 'INFO', inventory: 'VOORRAAD', featured: 'UITGELICHT', actions: 'ACTIES', available: 'BESCHIKBAAR', outOfStock: 'UITVERKOCHT', noCover: 'GEEN OMSLAG', filterPlaceholder: 'SELECTEER GENRE...', toastSaved: 'Boek succesvol bijgewerkt!', toastAdded: 'Boek succesvol toegevoegd!', toastDeleted: 'Boek succesvol verwijderd.', toastDeleteError: 'Fout bij verwijderen boek.', deleteTitle: 'Boek Verwijderen', deleteMsg: 'Weet u zeker dat u dit boek permanent wilt verwijderen?', deleteBtn: 'Verwijderen' },
    categories: { title: 'Categorieën', subtitle: 'Beheer de categorieën van de catalogus.', addPlaceholder: 'Nieuwe categorienaam...', searchPlaceholder: 'Zoek categorieën...', addBtn: 'Toevoegen', dragToReorder: 'Sleep iconen om te herordenen', deleteTitle: 'Categorie Verwijderen', deleteMsg: 'Weet u zeker dat u deze categorie wilt verwijderen? Dit kan invloed hebben op gekoppelde boeken.', deleteBtn: 'Ja, Verwijderen' },
    loans: { title: 'Leningbeheer', subtitle: 'Leningen beheren en volgen', searchPlaceholder: 'Zoek op boek, auteur of e-mail...', all: 'ALLE', pending: 'IN AFWACHTING', active: 'ACTIEF', returned: 'INGELEVERD', rejected: 'AFGEWEZEN', overdue: 'TE LAAT', id: 'ID', user: 'GEBRUIKER', bookDetails: 'BOEKDETAILS', status: 'STATUS', actions: 'ACTIES', libMember: 'LID', borrowedDate: 'GELEEND', returnedDate: 'INGELEVERD OP', dueDate: 'VERVALDATUM', approvedDate: 'GOEDGEKEURD OP' },
    users: { title: 'Gebruikers', subtitle: 'Beheer systeemtoegang en rollen', searchPlaceholder: 'Zoek naam of e-mail...', nameDetails: 'GEBRUIKERSDETAILS', role: 'ROL', joined: 'LID SINDS', updateSuccess: 'Rol bijgewerkt', updateError: 'Fout bij bijwerken', noUsers: 'Geen gebruikers gevonden' },
    roles: { admin: 'Administrator', professor: 'Professor', aluno: 'Leerling', student: 'Leerling', membro: 'Lid' },
    editBook: { newBookTitle: 'Nieuw Boek Toevoegen', editBookTitle: 'Boekdetails Bewerken', newBookSubtitle: 'Voeg een nieuw boek toe aan de catalogus', editBookSubtitle: 'Informatie bijwerken', fullTitle: 'VOLLEDIGE TITEL', authorName: 'AUTEUR', isbnReference: 'ISBN REFERENTIE', primaryCategory: 'HOOFDCATEGORIE', publisher: 'UITGEVER', inventoryQuantity: 'AANTAL', guidelines: 'RICHTLIJNEN', guideline1: 'Hoge resolutie afbeeldingen hebben de voorkeur', guideline2: 'Aanbevolen verhouding: 3:4', guideline3: 'Maximale grootte: 5 MB (JPG, PNG)', addBookBtn: 'BOEK TOEVOEGEN', updateBookBtn: 'BOEK BIJWERKEN', uploadImage: 'Klik om te uploaden', imageFormats: 'SVG, PNG, JPG (max. 800x400)', titlePlaceholder: 'The Great Gatsby', authorPlaceholder: 'F. Scott Fitzgerald', isbnPlaceholder: '978-0-...', publisherPlaceholder: "Scribner's Sons" }
  },
  bookDetails: { backToCatalog: 'Terug naar catalogus', backToStart: 'Terug naar start', bookNotFound: 'Boek niet gevonden', requestedSuccess: 'Succesvol aangevraagd', requestBook: 'Boek Aanvragen', outOfStock: 'Niet op voorraad', availableOf: '{available} van {total} beschikbaar', aboutBook: 'Over dit boek', aiSummary: 'AI', generateAiSummary: 'Genereer AI samenvatting', generatingAiSummary: 'Samenvatting genereren...', noDescription: 'Geen beschrijving beschikbaar voor dit boek.', bookMetadata: 'Boekdetails', isbn: 'ISBN', publisher: 'Uitgever',    yearEdition: 'Jaar van uitgave',
    reviewsTitle: 'Recensies & Reacties',
    writeReview: 'Schrijf een Recensie',
    editReview: 'Bewerk je Recensie',
    submitReview: 'Recensie Versturen',
    cancelReview: 'Annuleren',
    noReviews: 'Nog geen recensies. Wees de eerste om dit boek te beoordelen!',
    ratingLabel: 'Beoordeling',
    commentLabel: 'Reactie (optioneel)',
    averageRating: 'Gemiddelde Beoordeling',
    reviewSuccess: 'Recensie succesvol verzonden!',
    reviewError: 'Verzenden van recensie mislukt. Probeer het opnieuw.',
    youReviewed: 'Je hebt dit boek beoordeeld'
  },
  docs: {
    badge: 'Documentatie', title: 'Bibliotheekgids', subtitle: 'Alles wat u moet weten.',
    roles: { title: 'Accounts en Rollen', desc: 'Types:', student: 'Leerling', studentDesc: 'Zelf toegewezen.', admin: 'Administrator', adminDesc: 'Beheert het systeem.' },
    borrow: { title: 'Leningen', desc: 'Proces:', step1: 'Zoek.', step2: 'Vraag aan.', step3: 'Haal op.', note: 'Let op: Er zijn termijnen.' },
    pin: { title: 'PIN Systeem', desc: 'Beveiliging.', step1: 'Ontvang een PIN.', step2: 'Controleer.', step3: 'Geef aan de admin.' },
    ai: { title: 'AI Functies', desc: 'AI:', item1: 'Samenvattingen', item1Desc: 'Automatisch.', item2: 'Zoeken', item2Desc: 'Vibe check.', item3: 'Chat', item3Desc: 'AI Bibliothecaris.' },
    adminPortal: { title: 'Admin Console', desc: 'Beheer.', desc2: 'Stappen:', step1: '/console.', step2: 'Menu.', step3: 'Gebruik tools.' }
  },
  home: {
    recommended: 'Aanbevolen',
    catalog: 'Catalogus',
    catalogSub: 'Exploreer alle beschikbare boeken in onze bibliotheek',
    errorLoad: 'Boeken konden niet worden geladen.',
    errorCheckNet: 'Controleer uw internetverbinding.',
    retryBtn: 'Opnieuw Proberen',
    noBooksFound: 'Geen boeken gevonden voor uw zoekopdracht.',
    searchNoResults: 'Probeer andere trefwoorden te gebruiken.'
  },
  myLoans: {
    title: 'Mijn Leningen',
    subtitle: 'Volledige geschiedenis van uw aanvragen',
    emptyTitle: 'Geen leningen',
    emptyDesc: 'U heeft nog geen boeken uit de catalogus aangevraagd.',
    exploreCatalog: 'Catalogus verkennen',
    status: {
      active: 'Actief',
      pending: 'In afwachting',
      rejected: 'Afgewezen',
      returned: 'Ingeleverd'
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
    emptyDesc: 'U heeft nog geen meldingen. Eventuele berichten over leningen of nieuwe boeken verschijnen hier.',
    exploreCatalog: 'Catalogus verkennen'
  }
}
