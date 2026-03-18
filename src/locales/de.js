export default {
  sidebar: { discover: 'Entdecken', myLibrary: 'Meine Bibliothek', overview: 'Übersicht', books: 'Bücher', categories: 'Kategorien', loans: 'Ausleihen', users: 'Benutzer', administration: 'Verwaltung', settings: 'Einstellungen', admin: 'Admin' },
  navbar: { searchPlaceholder: 'Bücher, Autoren suchen...', myAccount: 'Mein Konto', myLoans: 'Meine Ausleihen', manageBooks: 'Bücher verwalten', manageLoans: 'Ausleihen', newBook: 'Neues Buch', logout: 'Abmelden', login: 'Anmelden', register: 'Registrieren', adminMenu: 'Verwaltung', docs: 'Dokumentation', notifications: 'Benachrichtigungen', loading: 'Lädt...', all: 'Alle' },
  settings: { title: 'Einstellungen', subtitle: 'Verwalten Sie Ihr Konto und Ihre Einstellungen', profile: 'Profil', name: 'Name', email: 'E-Mail', appearance: 'Erscheinungsbild', theme: 'Design', light: 'Hell', dark: 'Dunkel', languageSection: 'Sprache', languageDesc: 'Wählen Sie Ihre bevorzugte Sprache', administration: 'Verwaltung', adminActive: 'Admin-Sitzung aktiv', adminDesc: 'Sie sind als Administrator angemeldet', adminLogout: 'Admin Logout', account: 'Konto', signOutTitle: 'Abmelden', signOutDesc: 'Sie werden zur Anmeldeseite weitergeleitet', logoutBtn: 'Abmelden' },
  routes: { login: '/login', signup: '/signup', adminLogin: '/console/login', book: '/book/:id', myLoans: '/my-loans', settings: '/settings', notifications: '/notifications', adminBooks: '/console/books', adminCategories: '/console/categories', adminLoans: '/console/loans', adminBooksNew: '/console/books/new', adminBooksEdit: '/console/books/edit/:id' },
  admin: {
    dashboard: { totalBooks: 'GESAMTE BÜCHER', activeLoans: 'AKTIVE AUSLEIHEN', pendingRequests: 'AUSSTEHENDE ANFRAGEN', overdue: 'ÜBERFÄLLIG', recentActivity: 'Letzte Ausleihaktivität', viewAll: 'Alle ansehen', quickActions: 'Schnelle Aktionen', addNewBook: 'Neues Buch hinzufügen', updateCatalog: 'KATALOG AKTUALISIEREN', manageBooks: 'Bücher verwalten', editOrRemove: 'BEARBEITEN ODER ENTFERNEN', manageLoans: 'Ausleihen verwalten', approveReject: 'GENEHMIGEN / ABLEHNEN' },
    login: { title: 'Admin-Konsole', subtitle: 'Portal mit eingeschränktem Zugriff', backToLibrary: 'Zurück zur Bibliothek', authorize: 'Autorisieren', secureDb: 'Sichere Datenbankauthentifizierung', accessDenied: 'Zugriff verweigert.' },
    common: { approve: 'Genehmigen', reject: 'Ablehnen', returnBtn: 'Rückgabe', loadingRequests: 'Anfragen laden...', fetchingCollection: 'Sammlung laden...', noRequests: 'Keine Ausleihanfragen', noBooks: 'Keine Bücher gefunden', saveOrder: 'Speichern', orderSaved: 'Reihenfolge gespeichert!', orderError: 'Fehler beim Speichern', select: { placeholder: 'Wählen Sie...', noOptions: 'Keine Optionen' } },
    books: { searchPlaceholder: 'Suche nach Titel, Autor...', allCategories: 'Alle Kategorien', id: 'ID', bookInfo: 'BUCHINFO', inventory: 'INVENTAR', featured: 'FEATURED', actions: 'AKTIONEN', available: 'VERFÜGBAR', outOfStock: 'NICHT AUF LAGER', noCover: 'KEIN COVER', filterPlaceholder: 'Genre auswählen...', toastSaved: 'Erfolgreich aktualisiert!', toastAdded: 'Erfolgreich hinzugefügt!', toastDeleted: 'Erfolgreich gelöscht.', toastDeleteError: 'Fehler beim Löschen.', deleteTitle: 'Buch löschen', deleteMsg: 'Möchten Sie dieses Buch wirklich löschen?', deleteBtn: 'Löschen' },
    categories: { title: 'Kategorien', subtitle: 'Kategorien verwalten.', addPlaceholder: 'Mene Kategorie...', searchPlaceholder: 'Suchen...', addBtn: 'Hinzufügen', dragToReorder: 'Zum Neuordnen ziehen', deleteTitle: 'Kategorie löschen', deleteMsg: 'Möchten Sie löschen?', deleteBtn: 'Löschen' },
    loans: { title: 'Ausleihverwaltung', subtitle: 'Ausleihen verwalten', searchPlaceholder: 'Suche...', all: 'ALLE', pending: 'AUSSTEHEND', active: 'AKTIV', returned: 'ZURÜCKGEGEBEN', rejected: 'ABGELEHNT', overdue: 'ÜBERFÄLLIG', id: 'ID', user: 'BENUTZER', bookDetails: 'DETAILS', status: 'STATUS', actions: 'AKTIONEN', libMember: 'MITGLIED', borrowedDate: 'AUSGELIEHEN', returnedDate: 'RÜCKGABE', dueDate: 'FÄLLIG AM', approvedDate: 'GENEHMIGT AM' },
    users: { title: 'Benutzer', subtitle: 'Benutzer verwalten', searchPlaceholder: 'Suchen...', nameDetails: 'DETAILS', role: 'ROLLE', joined: 'BEIGETRETEN', updateSuccess: 'Erfolgreich aktualisiert', updateError: 'Fehler', noUsers: 'Keine Benutzer' },
    roles: { admin: 'Administrator', professor: 'Professor', aluno: 'Student', student: 'Student', membro: 'Mitglied' },
    editBook: { newBookTitle: 'Buch hinzufügen', editBookTitle: 'Buch bearbeiten', newBookSubtitle: 'Buch zum Katalog hinzufügen', editBookSubtitle: 'Informationen aktualisieren', fullTitle: 'TITEL', authorName: 'AUTOR', isbnReference: 'ISBN', primaryCategory: 'HAUPTKATEGORIE', publisher: 'HERAUSGEBER', inventoryQuantity: 'MENGE', guidelines: 'RICHTLINIEN', guideline1: 'Hochauflösende Bilder', guideline2: '3:4', guideline3: 'Max 5 MB', addBookBtn: 'HINZUFÜGEN', updateBookBtn: 'AKTUALISIEREN', uploadImage: 'Klicken zum Hochladen', imageFormats: 'SVG, PNG, JPG (max. 800x400)', titlePlaceholder: 'Der große Gatsby', authorPlaceholder: 'F. Scott Fitzgerald', isbnPlaceholder: '978-0-...', publisherPlaceholder: "Charles Scribner's Sons" }
  },
  bookDetails: { backToCatalog: 'Zurück zum Katalog', backToStart: 'Zurück zum Anfang', bookNotFound: 'Buch nicht gefunden', requestedSuccess: 'Erfolgreich angefragt', requestBook: 'Buch anfragen', outOfStock: 'Nicht auf Lager', availableOf: '{available} von {total} verfügbar', aboutBook: 'Über dieses Buch', aiSummary: 'KI', generateAiSummary: 'KI-Generierung', generatingAiSummary: 'Wird generiert...', noDescription: 'Keine Beschreibung.', bookMetadata: 'Buchdetails', isbn: 'ISBN', publisher: 'Herausgeber', yearEdition: 'Erscheinungsjahr' },
  docs: {
    badge: 'Offizielle Dokumentation', title: 'Bibliotheksführer', subtitle: 'Alles, was Sie über die Plattform wissen müssen.',
    roles: { title: 'Konten und Rollen', desc: 'Kontotypen:', student: 'Schüler', studentDesc: 'Automatisch zugewiesen. Bücher ausleihen.', admin: 'Administrator', adminDesc: 'Katalog verwalten.' },
    borrow: { title: 'Ausleihen', desc: 'Prozess:', step1: 'Buchseite.', step2: 'Klicken Sie auf Anfragen.', step3: 'Holen Sie es ab.', note: 'Hinweis: Frist einhalten.' },
    pin: { title: 'PIN-System', desc: 'Sicherheit:', step1: '4-stellige PIN.', step2: 'PIN auf Ausleihen-Bildschirm prüfen.', step3: 'PIN an Administrator weitergeben.' },
    ai: { title: 'KI-Funktionen', desc: 'KI-Integration:', item1: 'Zusammenfassungen', item1Desc: 'Automatisch aus Metadaten.', item2: 'Suche (Demnächst)', item2Desc: 'Semantische Suche.', item3: 'Chat', item3Desc: 'Leseempfehlungen.' },
    adminPortal: { title: 'Administratorportal', desc: 'Unsichtbar für Schüler.', desc2: 'Schritte:', step1: '/console eingeben.', step2: 'Verwaltung öffnen.', step3: 'Seitliches Menü nutzen.' }
  },
  home: {
    recommended: 'Empfohlen',
    catalog: 'Katalog',
    catalogSub: 'Entdecken Sie alle in unserer Bibliothek verfügbaren Bücher',
    errorLoad: 'Bücher konnten nicht geladen werden.',
    errorCheckNet: 'Bitte überprüfen Sie Ihre Internetverbindung.',
    retryBtn: 'Erneut versuchen'
  },
  myLoans: {
  title: 'Meine Ausleihen',
  subtitle: 'Vollständige Historie Ihrer Anfragen',
  emptyTitle: 'Keine Ausleihen',
  emptyDesc: 'Sie haben noch keine Bücher aus dem Katalog angefragt.',
  exploreCatalog: 'Katalog durchsuchen',
  status: {
    active: 'Aktiv',
    pending: 'Ausstehend',
    rejected: 'Abgelehnt',
    returned: 'Zurückgegeben'
  },
  requestLabel: 'Anfrage'
},
notifications: {
    title: 'Benachrichtigungen',
    subtitle: 'Bleiben Sie über Ihre Bibliothek auf dem Laufenden',
    emptyTitle: 'Alles auf dem neuesten Stand!',
    emptyDesc: 'Sie haben noch keine Benachrichtigungen. Updates zu Ausleihen oder neuen Büchern erscheinen hier.',
    exploreCatalog: 'Katalog durchsuchen'
  }
}
