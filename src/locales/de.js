export default {
  sidebar: { discover: 'Entdecken', myLibrary: 'Meine Bibliothek', overview: 'Übersicht', books: 'Bücher', categories: 'Kategorien', loans: 'Ausleihen', users: 'Benutzer', administration: 'Verwaltung', settings: 'Einstellungen', admin: 'Admin' },
  navbar: { 
    searchPlaceholder: 'Bücher, Autoren suchen...', 
    myAccount: 'Mein Konto', 
    myLoans: 'Meine Ausleihen', 
    manageBooks: 'Bücher verwalten', 
    manageLoans: 'Ausleihen', 
    newBook: 'Neues Buch', 
    logout: 'Abmelden', 
    login: 'Anmelden', 
    register: 'Registrieren', 
    adminMenu: 'Verwaltung', 
    docs: 'Dokumentation', 
    notifications: 'Benachrichtigungen', 
    loading: 'Wird geladen...', 
    all: 'Alle',
    home: 'Startseite',
    settings: 'Einstellungen'
  },
  landing: {
    badge: 'Digitale Bibliothek',
    title: 'Sekundarschule Tomás Cabreira',
    subtitle: 'Willkommen im digitalen Portal unserer Bibliothek. Erkunden Sie unseren umfangreichen Katalog an Büchern, Abschlussarbeiten und Bildungsressourcen.',
    exploreBtn: 'Katalog erkunden',
    aboutTitle: 'Über unsere Bibliothek',
    aboutDesc: 'Die Bibliothek der Sekundarschule Tomás Cabreira ist ein Ort des Lernens, Entdeckens und Teilens. Mit unserer digitalen Version können Sie jetzt von überall aus die Verfügbarkeit von Büchern prüfen und Ihre Anforderungen verwalten.',
    features: {
      search: 'Intelligente Suche',
      searchDesc: 'Finden Sie ganz einfach, was Sie suchen, nach Titel, Autor oder Kategorie.',
      manage: 'Online-Verwaltung',
      manageDesc: 'Verfolgen Sie Ihre Ausleihen und erhalten Sie Rückgabebenachrichtigungen.',
      access: 'Einfacher Zugang',
      accessDesc: 'Verfügbar auf jedem Gerät für die gesamte Schulgemeinschaft.'
    }
  },
  settings: { title: 'Einstellungen', subtitle: 'Verwalten Sie Ihr Konto und Ihre Einstellungen', profile: 'Profil', name: 'Name', email: 'E-Mail', appearance: 'Erscheinungsbild', theme: 'Design', light: 'Hell', dark: 'Dunkel', languageSection: 'Sprache', languageDesc: 'Wählen Sie Ihre bevorzugte Sprache', administration: 'Verwaltung', adminActive: 'Admin-Sitzung aktiv', adminDesc: 'Sie sind als Administrator angemeldet', adminLogout: 'Admin-Abmeldung', account: 'Konto', signOutTitle: 'Abmelden', signOutDesc: 'Sie werden zur Anmeldeseite weitergeleitet', logoutBtn: 'Abmelden' },
  routes: { login: '/login', signup: '/signup', adminLogin: '/console/login', book: '/book/:id', myLoans: '/my-loans', settings: '/settings', notifications: '/notifications', adminBooks: '/console/books', adminCategories: '/console/categories', adminLoans: '/console/loans', adminBooksNew: '/console/books/new', adminBooksEdit: '/console/books/edit/:id' },
  admin: {
    dashboard: { totalBooks: 'BÜCHER INSGESAMT', activeLoans: 'AKTIVE AUSLEIHEN', pendingRequests: 'AUSSTEHENDE ANFRAGEN', overdue: 'ÜBERFÄLLIG', recentActivity: 'Letzte Aktivitäten', viewAll: 'Alle anzeigen', quickActions: 'Schnellzugriff', addNewBook: 'Neues Buch', updateCatalog: 'KATALOG AKTUALISIEREN', manageBooks: 'Bücher verwalten', editOrRemove: 'BEARBEITEN ODER ENTFERNEN', manageLoans: 'Ausleihen verwalten', approveReject: 'GENEHMIGEN / ABLEHNEN' },
    login: { title: 'Admin-Konsole', subtitle: 'Eingeschränktes Zugangsportal', backToLibrary: 'Zurück zur Bibliothek', authorize: 'Autorisieren', secureDb: 'Sichere Authentifizierung', accessDenied: 'Zugriff verweigert.' },
    common: { approve: 'Genehmigen', reject: 'Ablehnen', rejectBtn: 'Ablehnen', returnBtn: 'Zurückgeben', loadingRequests: 'Anfragen werden geladen...', fetchingCollection: 'Katalog wird geladen...', noRequests: 'Keine Leihanfragen gefunden', noBooks: 'Keine Bücher gefunden', saveOrder: 'Reihenfolge speichern', orderSaved: 'Reihenfolge gespeichert!', orderError: 'Fehler beim Speichern der Reihenfolge.', select: { placeholder: 'Option wählen...', noOptions: 'Keine Optionen' } },
    books: { searchPlaceholder: 'Suche nach Titel, Autor oder ISBN...', allCategories: 'Alle Kategorien', id: 'ID', bookInfo: 'INFO', inventory: 'BESTAND', featured: 'HIGHLIGHT', actions: 'AKTIONEN', available: 'VERFÜGBAR', outOfStock: 'AUSVERKAUFT', noCover: 'KEIN COVER', filterPlaceholder: 'GENRE WÄHLEN...', toastSaved: 'Buch erfolgreich aktualisiert!', toastAdded: 'Buch erfolgreich hinzugefügt!', toastDeleted: 'Buch erfolgreich gelöscht.', toastDeleteError: 'Fehler beim Löschen des Buches.', deleteTitle: 'Buch löschen', deleteMsg: 'Möchten Sie dieses Buch wirklich dauerhaft löschen?', deleteBtn: 'Löschen' },
    categories: { title: 'Kategorien', subtitle: 'Kategorien des Katalogs verwalten.', addPlaceholder: 'Neuer Kategoriename...', searchPlaceholder: 'Kategorien suchen...', addBtn: 'Hinzufügen', dragToReorder: 'Symbole zum Neusortieren ziehen', deleteTitle: 'Kategorie löschen', deleteMsg: 'Möchten Sie diese Kategorie wirklich löschen? Dies kann sich auf zugehörige Bücher auswirken.', deleteBtn: 'Ja, Löschen' },
    loans: { title: 'Hausleihverwaltung', subtitle: 'Ausleihen verwalten und verfolgen', searchPlaceholder: 'Nach Buch, Autor oder E-Mail suchen...', all: 'ALLE', pending: 'AUSSTEHEND', active: 'AKTIV', returned: 'ZURÜCKGEGEBEN', rejected: 'ABGELEHNT', overdue: 'ÜBERFÄLLIG', id: 'ID', user: 'BENUTZER', bookDetails: 'BUCHDETAILS', status: 'STATUS', actions: 'AKTIONEN', libMember: 'MITGLIED', borrowedDate: 'AUSGELIEHEN', returnedDate: 'RÜCKGABEDATUM', dueDate: 'FÄLLIGKEITSDATUM', approvedDate: 'GENEHMIGT AM' },
    users: { title: 'Benutzer', subtitle: 'Systemzugriff und Rollen verwalten', searchPlaceholder: 'Nach Name oder E-Mail suchen...', nameDetails: 'BENUTZERDETAILS', role: 'ROLLE', joined: 'BEIGETRETEN AM', updateSuccess: 'Rolle aktualisiert', updateError: 'Fehler bei Aktualisierung', noUsers: 'Keine Benutzer gefunden' },
    roles: { admin: 'Administrator', professor: 'Professor', aluno: 'Schüler', student: 'Schüler', membro: 'Mitglied' },
    editBook: { newBookTitle: 'Neues Buch hinzufügen', editBookTitle: 'Buchdetails bearbeiten', newBookSubtitle: 'Ein neues Buch zum Katalog hinzufügen', editBookSubtitle: 'Informationen aktualisieren', fullTitle: 'VOLLSTÄNDIGER TITEL', authorName: 'AUTOR', isbnReference: 'ISBN-REFERENZ', primaryCategory: 'HAUPTKATEGORIE', publisher: 'VERLAG', inventoryQuantity: 'ANZAHL', guidelines: 'RICHTLINIEN', guideline1: 'Hochauflösende Bilder bevorzugt', guideline2: 'Empfohlenes Verhältnis: 3:4', guideline3: 'Maximale Größe: 5 MB (JPG, PNG)', addBookBtn: 'BUCH HINZUFÜGEN', updateBookBtn: 'BUCH AKTUALISIEREN', uploadImage: 'Zum Hochladen klicken', imageFormats: 'SVG, PNG, JPG (max. 800x400)', titlePlaceholder: 'Der große Gatsby', authorPlaceholder: 'F. Scott Fitzgerald', isbnPlaceholder: '978-0-...', publisherPlaceholder: "Scribner's Sons" }
  },
  bookDetails: { backToCatalog: 'Zurück zum Katalog', backToStart: 'Zurück zum Anfang', bookNotFound: 'Buch nicht gefunden', requestedSuccess: 'Erfolgreich angefragt', requestBook: 'Buch anfragen', outOfStock: 'Nicht verfügbar', availableOf: '{available} von {total} verfügbar', aboutBook: 'Über dieses Buch', aiSummary: 'KI', generateAiSummary: 'KI-Zusammenfassung generieren', generatingAiSummary: 'Zusammenfassung wird generiert...', noDescription: 'Keine Beschreibung für dieses Buch verfügbar.', bookMetadata: 'Buchdetails', isbn: 'ISBN', publisher: 'Verlag',    yearEdition: 'Erscheinungsjahr',
    reviewsTitle: 'Rezensionen & Kommentare',
    writeReview: 'Eine Rezension schreiben',
    editReview: 'Deine Rezension bearbeiten',
    submitReview: 'Rezension absenden',
    cancelReview: 'Abbrechen',
    noReviews: 'Noch keine Rezensionen. Sei der Erste, der dieses Buch bewertet!',
    ratingLabel: 'Bewertung',
    commentLabel: 'Kommentar (optional)',
    averageRating: 'Durchschnittsbewertung',
    reviewSuccess: 'Rezension erfolgreich übermittelt!',
    reviewError: 'Fehler beim Übermitteln der Rezension. Bitte versuchen Sie es erneut.',
    youReviewed: 'Du hast dieses Buch bewertet'
  },
  docs: {
    badge: 'Dokumentation', title: 'Bibliotheksleitfaden', subtitle: 'Alles, was Sie wissen müssen.',
    roles: { title: 'Konten und Rollen', desc: 'Typen:', student: 'Schüler', studentDesc: 'Selbst zugewiesen.', admin: 'Administrator', adminDesc: 'Verwaltet das System.' },
    borrow: { title: 'Ausleihen', desc: 'Prozess:', step1: 'Suchen.', step2: 'Anfragen.', step3: 'Abholen.', note: 'Hinweis: Es gibt Fristen.' },
    pin: { title: 'PIN-System', desc: 'Sicherheit.', step1: 'PIN erhalten.', step2: 'Prüfen.', step3: 'Dem Admin geben.' },
    ai: { title: 'KI-Funktionen', desc: 'KI:', item1: 'Zusammenfassungen', item1Desc: 'Automatisch.', item2: 'Suche', item2Desc: 'Vibe-Check.', item3: 'Chat', item3Desc: 'KI-Bibliothekar.' },
    adminPortal: { title: 'Admin-Konsole', desc: 'Verwaltung.', desc2: 'Schritte:', step1: '/console.', step2: 'Menü.', step3: 'Tools nutzen.' }
  },
  home: {
    recommended: 'Empfohlen',
    catalog: 'Katalog',
    catalogSub: 'Erkunden Sie alle verfügbaren Bücher in unserer Bibliothek',
    errorLoad: 'Bücher konnten nicht geladen werden.',
    errorCheckNet: 'Prüfen Sie Ihre Internetverbindung.',
    retryBtn: 'Wiederholen',
    noBooksFound: 'Es wurden keine Bücher gefunden, die Ihrer Suche entsprechen.',
    searchNoResults: 'Versuchen Sie es mit anderen Schlagwörtern.'
  },
  myLoans: {
    title: 'Meine Ausleihen',
    subtitle: 'Vollständige Historie Ihrer Anfragen',
    emptyTitle: 'Keine Ausleihen',
    emptyDesc: 'Sie haben noch keine Bücher aus dem Katalog angefragt.',
    exploreCatalog: 'Katalog erkunden',
    status: {
      active: 'Aktiv',
      pending: 'Ausstehend',
      rejected: 'Abgelehnt',
      returned: 'Zurückgegeben'
    },
    requestLabel: 'Anfrage'
  },
  auth: {
    loginTitle: 'Willkommen zurück',
    loginSubtitle: 'Melden Sie sich an, um auf die Bibliothek zuzugreifen',
    emailLabel: 'E-Mail',
    emailPlaceholder: 'deine@email.com',
    passwordLabel: 'Passwort',
    passwordPlaceholder: '••••••••',
    signInBtn: 'Anmelden',
    or: 'oder',
    googleBtn: 'Weiter mit Google',
    noAccount: 'Kein Konto?',
    registerLink: 'Registrieren',
    signupTitle: 'Konto erstellen',
    signupSubtitle: 'Treten Sie unserer Bibliothek bei',
    nameLabel: 'Vollständiger Name',
    namePlaceholder: 'Max Mustermann',
    signUpBtn: 'Konto erstellen',
    hasAccount: 'Bereits ein Konto?',
    loginLink: 'Anmelden'
  },
  notifications: {
    title: 'Benachrichtigungen',
    subtitle: 'Bleiben Sie über Ihre Bibliothek auf dem Laufenden',
    emptyTitle: 'Alles auf dem neuesten Stand!',
    emptyDesc: 'Sie haben noch keine Benachrichtigungen. Alle Mitteilungen über Ausleihen oder neue Bücher erscheinen hier.',
    exploreCatalog: 'Katalog erkunden'
  }
}
